import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Erişim: /admin?token=<ADMIN_TOKEN>
// .env.local → ADMIN_TOKEN=güçlü-bir-şifre

type TrialRequest = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  phone: string
  email: string
  instrument: string
  student_age_range: string
  note: string | null
  status: 'pending' | 'contacted' | 'enrolled' | 'cancelled'
}

type NewsletterSubscriber = {
  id: string
  created_at: string
  email: string
}

const STATUS_LABELS: Record<TrialRequest['status'], string> = {
  pending:   'Bekliyor',
  contacted: 'Ulaşıldı',
  enrolled:  'Kayıt Oldu',
  cancelled: 'İptal',
}

const STATUS_COLORS: Record<TrialRequest['status'], string> = {
  pending:   'rgba(201,168,76,0.15)',
  contacted: 'rgba(59,130,246,0.15)',
  enrolled:  'rgba(34,197,94,0.15)',
  cancelled: 'rgba(239,68,68,0.12)',
}

const STATUS_TEXT: Record<TrialRequest['status'], string> = {
  pending:   '#C9A84C',
  contacted: '#60a5fa',
  enrolled:  '#4ade80',
  cancelled: '#f87171',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const adminToken = process.env.ADMIN_TOKEN

  /* ── Erişim kontrolü ── */
  if (!adminToken) {
    return <ErrorPage message="ADMIN_TOKEN ortam değişkeni tanımlı değil. .env.local dosyasına ekleyin." />
  }
  if (params.token !== adminToken) {
    return <ErrorPage message="Erişim reddedildi. Geçersiz token." />
  }

  /* ── Service role key kontrolü ── */
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return <ErrorPage message="SUPABASE_SERVICE_ROLE_KEY ortam değişkeni tanımlı değil. Supabase Dashboard > Settings > API > service_role anahtarını .env.local dosyasına ekleyin." />
  }

  /* ── Veri çekme ── */
  const admin = getSupabaseAdmin()
  const [{ data: trials }, { data: subscribers }] = await Promise.all([
    admin
      .from('trial_requests')
      .select('*')
      .order('created_at', { ascending: false }),
    admin
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false }),
  ])

  const trialList      = (trials      ?? []) as TrialRequest[]
  const subscriberList = (subscribers ?? []) as NewsletterSubscriber[]

  const pendingCount  = trialList.filter(t => t.status === 'pending').length
  const enrolledCount = trialList.filter(t => t.status === 'enrolled').length

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f0ead8', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '24px 40px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 300, color: '#C9A84C', margin: 0 }}>
          Lirik Sanat Evi <em style={{ fontStyle: 'italic' }}>Admin</em>
        </h1>
        <p style={{ fontSize: 12, color: 'rgba(240,234,216,0.4)', marginTop: 4, letterSpacing: 2, textTransform: 'uppercase' }}>
          Yönetim Paneli
        </p>
      </div>

      <div style={{ padding: '32px 40px', maxWidth: 1200 }}>

        {/* Özet kartları */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
          <StatCard label="Toplam Deneme Talebi" value={trialList.length} />
          <StatCard label="Bekleyen Talepler"    value={pendingCount}     color="#C9A84C" />
          <StatCard label="Kayıt Olan"           value={enrolledCount}    color="#4ade80" />
          <StatCard label="Bülten Abonesi"        value={subscriberList.length} />
        </div>

        {/* Deneme Talepleri */}
        <section style={{ marginBottom: 48 }}>
          <SectionTitle>Deneme Dersi Talepleri</SectionTitle>
          {trialList.length === 0 ? (
            <EmptyState text="Henüz deneme talebi yok." />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                    {['Tarih', 'Ad Soyad', 'Telefon', 'E-posta', 'Enstrüman', 'Yaş', 'Not', 'Durum'].map(h => (
                      <Th key={h}>{h}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trialList.map((row, i) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: '1px solid rgba(240,234,216,0.06)',
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                      }}
                    >
                      <Td>{formatDate(row.created_at)}</Td>
                      <Td>{row.first_name} {row.last_name}</Td>
                      <Td>
                        <a href={`tel:${row.phone}`} style={{ color: '#C9A84C', textDecoration: 'none' }}>
                          {row.phone}
                        </a>
                      </Td>
                      <Td>
                        <a href={`mailto:${row.email}`} style={{ color: '#C9A84C', textDecoration: 'none' }}>
                          {row.email}
                        </a>
                      </Td>
                      <Td>{row.instrument}</Td>
                      <Td>{row.student_age_range}</Td>
                      <Td style={{ maxWidth: 180, color: 'rgba(240,234,216,0.5)' }}>
                        {row.note || '—'}
                      </Td>
                      <Td>
                        <span style={{
                          display: 'inline-block',
                          padding: '2px 10px',
                          fontSize: 11,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                          background: STATUS_COLORS[row.status],
                          color: STATUS_TEXT[row.status],
                        }}>
                          {STATUS_LABELS[row.status]}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Bülten Aboneleri */}
        <section>
          <SectionTitle>Bülten Aboneleri</SectionTitle>
          {subscriberList.length === 0 ? (
            <EmptyState text="Henüz bülten abonesi yok." />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                    {['Kayıt Tarihi', 'E-posta'].map(h => (
                      <Th key={h}>{h}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscriberList.map((row, i) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: '1px solid rgba(240,234,216,0.06)',
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                      }}
                    >
                      <Td>{formatDate(row.created_at)}</Td>
                      <Td>
                        <a href={`mailto:${row.email}`} style={{ color: '#C9A84C', textDecoration: 'none' }}>
                          {row.email}
                        </a>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 16, borderTop: '1px solid rgba(201,168,76,0.1)', fontSize: 11, color: 'rgba(240,234,216,0.25)', letterSpacing: 1 }}>
          {trialList.length} talep · {subscriberList.length} abone · Lirik Sanat Evi Admin Panel
        </div>
      </div>
    </div>
  )
}

/* ── Yardımcı bileşenler ── */
function ErrorPage({ message }: { message: string }) {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <div style={{ border: '1px solid rgba(239,68,68,0.3)', padding: '32px 40px', maxWidth: 480 }}>
        <p style={{ color: '#f87171', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{message}</p>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.12)', padding: '20px 24px', background: 'rgba(201,168,76,0.02)' }}>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 300, color: color ?? '#f0ead8', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(240,234,216,0.4)', marginTop: 6, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 300, color: '#C9A84C', marginBottom: 16, letterSpacing: 1 }}>
      {children}
    </h2>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.08)', padding: '24px', fontSize: 13, color: 'rgba(240,234,216,0.35)', textAlign: 'center' }}>
      {text}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(240,234,216,0.4)', fontWeight: 400, whiteSpace: 'nowrap' }}>
      {children}
    </th>
  )
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: '10px 14px', color: 'rgba(240,234,216,0.75)', verticalAlign: 'top', ...style }}>
      {children}
    </td>
  )
}
