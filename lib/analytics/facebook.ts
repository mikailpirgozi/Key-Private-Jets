// Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

declare global {
  interface Window {
    fbq: (
      command: string,
      eventName: string,
      options?: Record<string, unknown>
    ) => void
  }
}

export function pageview(): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

export function event(name: string, options: Record<string, unknown> = {}): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options)
  }
}

// Lead tracking
export function trackLead(value: number): void {
  event('Lead', { value, currency: 'USD' })
}

// Contact tracking
export function trackContact(): void {
  event('Contact')
}

