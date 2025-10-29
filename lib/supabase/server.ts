import { createClient } from '@supabase/supabase-js'

let cachedClient: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase credentials (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)',
    )
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return cachedClient
}

// Alias for backward compatibility
export const supabaseAdmin = {
  get from() {
    return getSupabaseAdmin().from.bind(getSupabaseAdmin())
  },
  get rpc() {
    return getSupabaseAdmin().rpc.bind(getSupabaseAdmin())
  },
} as any

