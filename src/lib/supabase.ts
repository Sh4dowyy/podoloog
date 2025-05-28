import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Browser client for client components
export const createSupabaseBrowserClient = () => 
  createBrowserClient(supabaseUrl, supabaseAnonKey)

// Type definitions for your database tables
// You can generate these using: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
export type Database = {
  // Add your database types here
} 