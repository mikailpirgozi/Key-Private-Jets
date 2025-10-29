import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validations'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

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
    const validationResult = newsletterSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid email address', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    // Check if email already exists
    const { data: existingSubscriber } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 400 }
        )
      }

      // Reactivate if previously unsubscribed
      const { error: updateError } = await supabaseAdmin
        .from('newsletter_subscribers')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        })
        .eq('id', existingSubscriber.id)

      if (updateError) {
        console.error('Database error:', updateError)
        return NextResponse.json(
          { error: 'Failed to reactivate subscription. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      // Create new subscriber
      const { error: insertError } = await supabaseAdmin
        .from('newsletter_subscribers')
        .insert({
          email,
          status: 'active',
          gdpr_consent: true,
          source: 'website',
        })

      if (insertError) {
        console.error('Database error:', insertError)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    }

    // Send welcome email
    const welcomeEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to KeyPrivateJet Newsletter</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .highlight { background: #FDF3D5; padding: 15px; border-radius: 6px; margin: 15px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
    .button { background: #D4AF37; color: #0A2540; padding: 12px 30px; text-decoration: none; display: inline-block; border-radius: 6px; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ Welcome to KeyPrivateJet!</h1>
    </div>
    
    <div class="content">
      <p>Thank you for subscribing to our newsletter!</p>
      
      <p>You'll now receive:</p>
      <ul>
        <li>🎯 <strong>Exclusive Empty Leg Deals</strong> - Save up to 75% on private flights</li>
        <li>✈️ <strong>Industry Insights</strong> - Latest trends in private aviation</li>
        <li>💎 <strong>Special Offers</strong> - Members-only promotions</li>
        <li>📍 <strong>New Routes</strong> - Expanded service areas and destinations</li>
      </ul>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #0A2540;">Ready to Fly?</h3>
        <p>Get an instant quote for your next private jet charter.</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}" class="button">Get Free Quote</a>
      </div>
      
      <p>Questions? Reply to this email or call us at <strong>${process.env.NEXT_PUBLIC_PHONE_DISPLAY}</strong></p>
      
      <p>Best regards,<br>
      <strong>The KeyPrivateJet Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
      <p style="font-size: 11px; color: #999; margin-top: 10px;">
        You received this email because you subscribed to our newsletter at keyprivatejet.com<br>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
    `

    // Send welcome email
    const emailResult = await sendEmail({
      to: email,
      subject: 'Welcome to KeyPrivateJet Newsletter! ✈️',
      html: welcomeEmailHtml,
      replyTo: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
    })

    if (!emailResult.success) {
      console.error('Welcome email failed:', emailResult.error)
      // Don't fail the request if email fails
    }

    // Notify admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
      subject: 'New Newsletter Subscriber',
      html: `<p>New subscriber: <strong>${email}</strong></p><p>Date: ${new Date().toLocaleString()}</p>`,
    })

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

