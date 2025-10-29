import { Lead } from '@/types'
import { formatDate } from '@/lib/utils'

export function generateLeadNotificationEmail(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead Received</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background: white; border-radius: 6px; }
    .label { font-weight: bold; color: #0A2540; display: inline-block; min-width: 150px; }
    .value { color: #333; }
    .score { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
    .score-hot { background: #22c55e; color: white; }
    .score-warm { background: #f59e0b; color: white; }
    .score-cold { background: #94a3b8; color: white; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Lead Received!</h1>
      <p style="margin: 10px 0 0 0;">Lead Score: ${lead.lead_score}/10 
        <span class="score score-${lead.lead_quality}">${lead.lead_quality?.toUpperCase()}</span>
      </p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">✈️ Flight Details</h2>
        <p><span class="label">Route:</span> <span class="value"><strong>${lead.from_city} → ${lead.to_city}</strong></span></p>
        <p><span class="label">Date:</span> <span class="value">${formatDate(lead.departure_date)}</span></p>
        <p><span class="label">Passengers:</span> <span class="value">${lead.passengers}</span></p>
        ${lead.aircraft_preference ? `<p><span class="label">Aircraft:</span> <span class="value">${lead.aircraft_preference}</span></p>` : ''}
      </div>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">👤 Contact Information</h2>
        <p><span class="label">Name:</span> <span class="value">${lead.name}</span></p>
        <p><span class="label">Email:</span> <span class="value"><a href="mailto:${lead.email}">${lead.email}</a></span></p>
        <p><span class="label">Phone:</span> <span class="value"><a href="tel:${lead.phone}">${lead.phone}</a></span></p>
      </div>
      
      ${lead.message ? `
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">💬 Message</h2>
        <p style="white-space: pre-wrap;">${lead.message}</p>
      </div>
      ` : ''}
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">📊 Tracking Info</h2>
        <p><span class="label">Source:</span> <span class="value">${lead.source || 'Direct'}</span></p>
        <p><span class="label">Device:</span> <span class="value">${lead.device_type || 'Unknown'}</span></p>
        <p><span class="label">Lead ID:</span> <span class="value">${lead.id}</span></p>
        <p><span class="label">Sent to:</span> <span class="value"><strong>${lead.affiliate_partner.toUpperCase()}</strong></span></p>
      </div>
    </div>
    
    <div class="footer">
      <p>This lead was automatically sent to your affiliate partner.</p>
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
    </div>
  </div>
</body>
</html>
  `
}

