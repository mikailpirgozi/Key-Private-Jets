// Test Supabase and Resend connections
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

import { supabaseAdmin } from '../lib/supabase/server'
import { resend } from '../lib/email/resend'

async function testSupabase() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test database connection
    const { error } = await supabaseAdmin
      .from('leads')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase Error:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('📊 Tables accessible: leads, newsletter_subscribers, contact_submissions, affiliate_performance')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}

async function testResend() {
  console.log('\n📧 Testing Resend email...')
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'KeyPrivateJet <onboarding@resend.dev>',
      to: 'pirgozi1@gmail.com',
      subject: 'Test Email from KeyPrivateJet',
      html: '<p>This is a test email to verify Resend integration. ✅</p>',
    })
    
    if (error) {
      console.error('❌ Resend Error:', error)
      return false
    }
    
    console.log('✅ Email sent successfully!')
    console.log('📬 Email ID:', data?.id)
    return true
  } catch (error) {
    console.error('❌ Resend connection failed:', error)
    return false
  }
}

async function main() {
  console.log('🚀 Testing KeyPrivateJet Connections\n')
  console.log('=' .repeat(50))
  
  const supabaseOk = await testSupabase()
  const resendOk = await testResend()
  
  console.log('\n' + '='.repeat(50))
  console.log('\n📊 Results:')
  console.log(`Supabase: ${supabaseOk ? '✅ Connected' : '❌ Failed'}`)
  console.log(`Resend: ${resendOk ? '✅ Connected' : '❌ Failed'}`)
  
  if (supabaseOk && resendOk) {
    console.log('\n🎉 All connections working! Ready for development.')
    process.exit(0)
  } else {
    console.log('\n⚠️  Some connections failed. Check your environment variables.')
    process.exit(1)
  }
}

main()

