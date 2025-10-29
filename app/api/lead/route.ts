import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validations'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { generateLeadNotificationEmail } from '@/lib/email/templates/lead-notification'
import { generateAffiliateNotificationEmail } from '@/lib/email/templates/affiliate-notification'
import { generateCustomerConfirmationEmail } from '@/lib/email/templates/customer-confirmation'
import { calculateLeadScore, getLeadQuality, getDeviceType } from '@/lib/utils'
import { rateLimit } from '@/lib/rate-limit'
import { Lead } from '@/types'

export const dynamic = 'force-dynamic'

// Affiliate partner configuration
const AFFILIATE_CONFIG = {
  villiers: {
    email: process.env.VILLIERS_EMAIL || 'leads@villiersjets.com',
    referralCode: process.env.VILLIERS_REFERRAL_CODE || 'KPJ-VILLIERS-2025',
  },
  jettly: {
    email: process.env.JETTLY_EMAIL || 'affiliates@jettly.com',
    referralCode: process.env.JETTLY_REFERRAL_CODE || 'KPJ-JETTLY-2025',
  },
  nuco: {
    email: process.env.NUCO_EMAIL || 'charter@nucojets.com',
    referralCode: process.env.NUCO_REFERRAL_CODE || 'KPJ-NUCO-2025',
  },
}

// Round-robin affiliate selection
let lastAffiliateIndex = 0
function selectAffiliate(): 'villiers' | 'jettly' | 'nuco' {
  const affiliates: Array<'villiers' | 'jettly' | 'nuco'> = ['villiers', 'jettly', 'nuco']
  const selected = affiliates[lastAffiliateIndex]
  lastAffiliateIndex = (lastAffiliateIndex + 1) % affiliates.length
  return selected
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(req)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await req.json()

    // Validate input
    const validationResult = leadFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Calculate lead score and quality
    const leadScore = calculateLeadScore({
      passengers: data.passengers,
      aircraft_preference: data.aircraft_preference,
      message: data.message,
    })
    const leadQuality = getLeadQuality(leadScore)

    // Select affiliate partner (round-robin)
    const affiliatePartner = selectAffiliate()
    const affiliateConfig = AFFILIATE_CONFIG[affiliatePartner]

    // Get tracking data
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const deviceType = getDeviceType(userAgent)

    // Get UTM parameters from headers or query
    const url = new URL(req.url)
    const utmSource = url.searchParams.get('utm_source') || undefined
    const utmMedium = url.searchParams.get('utm_medium') || undefined
    const utmCampaign = url.searchParams.get('utm_campaign') || undefined
    const utmContent = url.searchParams.get('utm_content') || undefined
    const utmTerm = url.searchParams.get('utm_term') || undefined

    // Prepare lead data
    const leadData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      from_city: data.from_city,
      to_city: data.to_city,
      departure_date: data.date.toISOString().split('T')[0],
      passengers: data.passengers,
      aircraft_preference: data.aircraft_preference,
      message: data.message,
      lead_score: leadScore,
      lead_quality: leadQuality,
      affiliate_partner: affiliatePartner,
      referral_code: affiliateConfig.referralCode,
      commission_status: 'pending' as const,
      status: 'new' as const,
      ip_address: ip,
      user_agent: userAgent,
      device_type: deviceType,
      gdpr_consent: data.gdpr_consent,
      marketing_consent: data.marketing_consent || false,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      source: utmSource || 'direct',
      landing_page: req.headers.get('referer') || undefined,
      data_retention_expires_at: new Date(
        Date.now() + (parseInt(process.env.DATA_RETENTION_DAYS || '730') * 24 * 60 * 60 * 1000)
      ).toISOString(),
    }

    // Save to database
    const { data: savedLead, error: dbError } = await supabaseAdmin
      .from('leads')
      .insert(leadData)
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save lead. Please try again.' },
        { status: 500 }
      )
    }

    // Prepare lead object for emails
    const lead: Lead = {
      ...savedLead,
      departure_date: savedLead.departure_date,
    }

    // Send emails in parallel
    const emailPromises = [
      // 1. Admin notification
      sendEmail({
        to: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
        subject: `🎯 New Lead: ${lead.from_city} → ${lead.to_city} (Score: ${lead.lead_score}/10)`,
        html: generateLeadNotificationEmail(lead),
        replyTo: lead.email,
      }),

      // 2. Affiliate notification
      sendEmail({
        to: affiliateConfig.email,
        subject: `New Charter Quote Request - ${lead.from_city} to ${lead.to_city} (Ref: ${affiliateConfig.referralCode})`,
        html: generateAffiliateNotificationEmail(lead),
        replyTo: lead.email,
      }),

      // 3. Customer confirmation
      sendEmail({
        to: lead.email,
        subject: 'Your Private Jet Quote Request - KeyPrivateJet',
        html: generateCustomerConfirmationEmail(lead),
        replyTo: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
      }),
    ]

    // Wait for all emails to send
    const emailResults = await Promise.allSettled(emailPromises)

    // Log email failures but don't fail the request
    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Email ${index + 1} failed:`, result.reason)
      }
    })

    // Return success
    return NextResponse.json(
      {
        success: true,
        leadId: savedLead.id,
        message: 'Quote request submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

