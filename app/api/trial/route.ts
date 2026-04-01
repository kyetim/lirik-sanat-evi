import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { first_name, last_name, phone, email, instrument, student_age_range, note } = body

  if (!first_name || !last_name || !phone || !email || !instrument || !student_age_range) {
    return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 })
  }

  const { error } = await supabase
    .from('trial_requests')
    .insert({ first_name, last_name, phone, email, instrument, student_age_range, note })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // n8n webhook - email bildirimi gönder
  try {
    await fetch('https://kyetim.app.n8n.cloud/webhook/deneme-dersi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${first_name} ${last_name}`,
        email,
        phone,
        instrument,
        student_age_range,
        note: note || '',
      }),
    })
  } catch (webhookError) {
    // Webhook hatası kullanıcıyı etkilemesin, sadece logla
    console.error('n8n webhook hatası:', webhookError)
  }

  return NextResponse.json({ success: true })
}
