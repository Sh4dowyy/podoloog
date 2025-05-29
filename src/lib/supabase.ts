import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Client-side Supabase client (with fallback for missing env vars)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Browser client for client components
export const createSupabaseBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set. Client will not function properly.')
    return null
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Type definitions for your database tables
// You can generate these using: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
export type Database = {
  // Add your database types here
} 