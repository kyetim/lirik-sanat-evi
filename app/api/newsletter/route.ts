import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Bülten kaydı — yazım yalnızca sunucudan (anon insert politikası kaldırıldı).
// Gerekli env: SUPABASE_SERVICE_ROLE_KEY

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Saf fonksiyon: ham gövde → normalize e-posta | hata | spam
function parseEmail(body: unknown): { email: string } | { error: string } | { spam: true } {
  if (typeof body !== 'object' || body === null) return { error: 'Geçersiz istek' }
  const b = body as Record<string, unknown>
  if (b.website) return { spam: true } // honeypot
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : ''
  if (!email) return { error: 'E-posta gerekli' }
  if (email.length > 200 || !EMAIL_RE.test(email)) return { error: 'Geçersiz e-posta' }
  return { email }
}

const serverError = () =>
  NextResponse.json({ error: 'Kayıt yapılamadı, lütfen tekrar deneyin' }, { status: 500 })

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = parseEmail(body)
  if ('spam' in parsed) return NextResponse.json({ success: true })
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 })

  try {
    const { error } = await getSupabaseAdmin()
      .from('newsletter_subscribers')
      .insert({ email: parsed.email })

    if (error) {
      if (error.code === '23505') return NextResponse.json({ message: 'Zaten kayıtlısınız' })
      console.error('[newsletter] insert', error)
      return serverError()
    }
  } catch (e) {
    console.error('[newsletter] admin client', e)
    return serverError()
  }

  return NextResponse.json({ success: true })
}
