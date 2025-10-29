import { Lead } from '@/types'
import { formatDate } from '@/lib/utils'

export function generateCustomerConfirmationEmail(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote Request Received</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background: white; border-radius: 6px; }
    .label { font-weight: bold; color: #0A2540; display: inline-block; min-width: 120px; }
    .value { color: #333; }
    .steps { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #D4AF37; border-radius: 6px; }
    .step { margin: 15px 0; }
    .step-number { display: inline-block; background: #D4AF37; color: #0A2540; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
    .highlight { background: #FDF3D5; padding: 15px; border-radius: 6px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ Thank You for Your Quote Request!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${lead.name},</p>
      
      <p>We've received your private jet charter request and are connecting you with our premium partners to get you the best quotes.</p>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Your Request Details</h2>
        <p><span class="label">Route:</span> <span class="value"><strong>${lead.from_city} → ${lead.to_city}</strong></span></p>
        <p><span class="label">Date:</span> <span class="value">${formatDate(lead.departure_date)}</span></p>
        <p><span class="label">Passengers:</span> <span class="value">${lead.passengers}</span></p>
        ${lead.aircraft_preference ? `<p><span class="label">Aircraft:</span> <span class="value">${lead.aircraft_preference}</span></p>` : ''}
      </div>
      
      <h2 style="color: #0A2540;">What Happens Next?</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <strong>Partner Review (30 minutes)</strong><br>
          <span style="margin-left: 40px; color: #666;">Our partner charter operators will review your request</span>
        </div>
        
        <div class="step">
          <span class="step-number">2</span>
          <strong>Receive Quotes (2-4 hours)</strong><br>
          <span style="margin-left: 40px; color: #666;">You'll receive competitive quotes directly from operators</span>
        </div>
        
        <div class="step">
          <span class="step-number">3</span>
          <strong>Choose & Confirm (Your timeline)</strong><br>
          <span style="margin-left: 40px; color: #666;">Select your preferred option and confirm your booking</span>
        </div>
      </div>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #0A2540;">Need Immediate Assistance?</h3>
        <p style="margin-bottom: 0;">Call us anytime at <strong><a href="tel:${process.env.NEXT_PUBLIC_PHONE}" style="color: #0A2540;">${process.env.NEXT_PUBLIC_PHONE_DISPLAY}</a></strong></p>
        <p style="margin-top: 5px;">Or reply directly to this email.</p>
      </div>
      
      <p style="margin-top: 30px;">We're excited to make your journey exceptional!</p>
      
      <p>Best regards,<br>
      <strong>The KeyPrivateJet Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
      <p>You received this email because you requested a quote at keyprivatejet.com</p>
    </div>
  </div>
</body>
</html>
  `
}

