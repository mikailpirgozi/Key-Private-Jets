import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
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
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Save to database
    const { data: savedContact, error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: 'new',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save contact submission. Please try again.' },
        { status: 500 }
      )
    }

    // Send email notification to admin
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background: white; border-radius: 6px; }
    .label { font-weight: bold; color: #0A2540; display: inline-block; min-width: 120px; }
    .value { color: #333; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Contact Information</h2>
        <p><span class="label">Name:</span> <span class="value">${data.name}</span></p>
        <p><span class="label">Email:</span> <span class="value"><a href="mailto:${data.email}">${data.email}</a></span></p>
        ${data.phone ? `<p><span class="label">Phone:</span> <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span></p>` : ''}
      </div>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Subject</h2>
        <p><strong>${data.subject}</strong></p>
      </div>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Message</h2>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div class="section">
        <p><span class="label">Submission ID:</span> <span class="value">${savedContact.id}</span></p>
        <p><span class="label">Date:</span> <span class="value">${new Date().toLocaleString('en-US', { timeZone: 'Europe/Bratislava' })}</span></p>
      </div>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
    </div>
  </div>
</body>
</html>
    `

    // Send confirmation email to customer
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting Us</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .highlight { background: #FDF3D5; padding: 15px; border-radius: 6px; margin: 15px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>We've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #0A2540;">Your Message</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <p>If you need immediate assistance, please call us at <strong><a href="tel:${process.env.NEXT_PUBLIC_PHONE}" style="color: #0A2540;">${process.env.NEXT_PUBLIC_PHONE_DISPLAY}</a></strong></p>
      
      <p>Best regards,<br>
      <strong>The KeyPrivateJet Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
    </div>
  </div>
</body>
</html>
    `

    // Send emails in parallel
    const emailPromises = [
      // Admin notification
      sendEmail({
        to: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
        subject: `New Contact Form: ${data.subject}`,
        html: adminEmailHtml,
        replyTo: data.email,
      }),

      // Customer confirmation
      sendEmail({
        to: data.email,
        subject: 'Thank You for Contacting KeyPrivateJet',
        html: customerEmailHtml,
        replyTo: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
      }),
    ]

    // Wait for all emails
    const emailResults = await Promise.allSettled(emailPromises)

    // Log email failures
    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Email ${index + 1} failed:`, result.reason)
      }
    })

    // Return success
    return NextResponse.json(
      {
        success: true,
        submissionId: savedContact.id,
        message: 'Contact form submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

