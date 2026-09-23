import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Deneme dersi talebi → pre_registrations (masaüstünün ön kayıt ekranı)
// Sözleşme: shared/contracts/bridge-architecture.md §4 — yazım yalnızca sunucu route'undan.
// Gerekli env: SUPABASE_SERVICE_ROLE_KEY, LIRIK_TENANT_ID

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s()+-]{7,30}$/

type TrialInput = {
  firstName: string
  lastName: string
  phone: string
  email: string
  instrument: string
  ageRange: string
  note: string | null
}
type ParseResult = { data: TrialInput } | { error: string } | { spam: true }

// Saf fonksiyon: ham gövde → doğrulanmış veri | hata | spam
function parseTrial(body: unknown): ParseResult {
  if (typeof body !== 'object' || body === null) return { error: 'Geçersiz istek' }
  const b = body as Record<string, unknown>
  if (b.website) return { spam: true } // honeypot: gerçek kullanıcı bu gizli alanı görmez

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const data: TrialInput = {
    firstName: str(b.first_name),
    lastName: str(b.last_name),
    phone: str(b.phone),
    email: str(b.email).toLowerCase(),
    instrument: str(b.instrument),
    ageRange: str(b.student_age_range),
    note: str(b.note) || null,
  }

  const required = [data.firstName, data.lastName, data.phone, data.email, data.instrument, data.ageRange]
  if (required.some(v => !v)) return { error: 'Eksik alanlar' }
  if (required.some(v => v.length > 200) || (data.note?.length ?? 0) > 1000) return { error: 'Alan çok uzun' }
  if (!EMAIL_RE.test(data.email)) return { error: 'Geçersiz e-posta' }
  if (!PHONE_RE.test(data.phone)) return { error: 'Geçersiz telefon' }
  return { data }
}

const serverError = () =>
  NextResponse.json({ error: 'Talep kaydedilemedi, lütfen tekrar deneyin' }, { status: 500 })

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) // bozuk JSON → 400
  const parsed = parseTrial(body)
  if ('spam' in parsed) return NextResponse.json({ success: true }) // bota ipucu verme
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 })

  const tenantId = process.env.LIRIK_TENANT_ID
  if (!tenantId) {
    console.error('[trial] LIRIK_TENANT_ID tanımlı değil')
    return serverError()
  }

  const d = parsed.data
  try {
    const { error } = await getSupabaseAdmin().from('pre_registrations').insert({
      tenant_id: tenantId,
      first_name: d.firstName,
      last_name: d.lastName,
      phone: d.phone,
      email: d.email,
      instrument_interest: d.instrument,
      how_heard: 'web', // masaüstü ön kayıt formundaki 'Web Sitesi' seçeneğinin değeri
      notes: [`Yaş aralığı: ${d.ageRange}`, d.note].filter(Boolean).join('\n'),
    })
    if (error) {
      console.error('[trial] insert', error) // detay yalnızca sunucu logunda
      return serverError()
    }
  } catch (e) {
    console.error('[trial] admin client', e) // service_role anahtarı yoksa buraya düşer
    return serverError()
  }

  return NextResponse.json({ success: true })
}
