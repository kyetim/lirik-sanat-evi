import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'E-posta gerekli' }, { status: 400 })
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ message: 'Zaten kayıtlısınız' })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // n8n webhook — bülten bildirimi
  try {
    await fetch('https://kyetim.app.n8n.cloud/webhook/bulten-kayit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  } catch (webhookError) {
    console.error('n8n newsletter webhook hatası:', webhookError)
  }

  return NextResponse.json({ success: true })
}
