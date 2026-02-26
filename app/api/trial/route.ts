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

  return NextResponse.json({ success: true })
}
