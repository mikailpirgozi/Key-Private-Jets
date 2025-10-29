// Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export function pageview(url: string): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
  }
}

export function event({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    })
  }
}

// Lead form submission tracking
export function trackLeadSubmission(data: {
  from: string
  to: string
  passengers: number
  aircraft?: string
}): void {
  event({
    action: 'lead_submission',
    category: 'Lead Generation',
    label: `${data.from} to ${data.to}`,
    value: data.passengers,
  })
}

// Quote request tracking
export function trackQuoteRequest(route: string, aircraft: string): void {
  event({
    action: 'quote_request',
    category: 'Engagement',
    label: `${route} - ${aircraft}`,
  })
}

// Phone click tracking
export function trackPhoneClick(): void {
  event({
    action: 'phone_click',
    category: 'Contact',
    label: 'Phone Number',
  })
}

// Email click tracking
export function trackEmailClick(): void {
  event({
    action: 'email_click',
    category: 'Contact',
    label: 'Email Address',
  })
}

