// Test script to check if services table exists
// Run with: node test_services_table.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testServicesTable() {
  console.log('Testing services table...')
  
  try {
    // Try to select from services table
    const { data, error } = await supabase
      .from('services')
      .select('count(*)')
      .limit(1)
    
    if (error) {
      console.error('❌ Error accessing services table:', error.message)
      if (error.message.includes('relation "services" does not exist')) {
        console.log('\n📋 To fix this, run the following SQL in Supabase Dashboard:')
        console.log('1. Go to https://supabase.com/dashboard/project/[your-project]/sql')
        console.log('2. Copy and run the SQL from services_schema.sql')
      }
      return false
    }
    
    console.log('✅ Services table exists and is accessible')
    console.log('Data:', data)
    return true
    
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    return false
  }
}

testServicesTable() 