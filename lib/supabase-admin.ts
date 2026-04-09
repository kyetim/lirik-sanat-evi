import { createClient } from '@supabase/supabase-js'

// SUPABASE_SERVICE_ROLE_KEY → Supabase Dashboard > Settings > API > service_role
// .env.local ve Vercel Environment Variables'a ekleyin (NEXT_PUBLIC olmadan)
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY tanımlı değil')
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
