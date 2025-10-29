/**
 * Application-wide constants
 */

/**
 * Aircraft categories
 */
export const AIRCRAFT_CATEGORIES = [
  'light-jets',
  'midsize-jets',
  'super-midsize-jets',
  'heavy-jets',
] as const

export type AircraftCategory = (typeof AIRCRAFT_CATEGORIES)[number]

/**
 * Lead status types
 */
export const LEAD_STATUSES = ['new', 'contacted', 'quoted', 'converted', 'lost'] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

/**
 * Lead quality levels
 */
export const LEAD_QUALITIES = ['hot', 'warm', 'cold'] as const

export type LeadQuality = (typeof LEAD_QUALITIES)[number]

/**
 * Commission status types
 */
export const COMMISSION_STATUSES = ['pending', 'confirmed', 'paid', 'cancelled'] as const

export type CommissionStatus = (typeof COMMISSION_STATUSES)[number]

/**
 * Device types
 */
export const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const

export type DeviceType = (typeof DEVICE_TYPES)[number]

/**
 * Contact form subjects
 */
export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Quote Request',
  'Partnership',
  'Support',
  'Media Inquiry',
] as const

/**
 * Passenger capacity limits
 */
export const PASSENGER_LIMITS = {
  min: 1,
  max: 20,
} as const

/**
 * Lead scoring thresholds
 */
export const LEAD_SCORE = {
  min: 1,
  max: 10,
  hot: 8, // Score >= 8 is HOT
  warm: 5, // Score >= 5 is WARM
  cold: 0, // Score < 5 is COLD
} as const

/**
 * Rate limiting configuration
 */
export const RATE_LIMITS = {
  lead: {
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
  },
  contact: {
    maxRequests: 5,
    windowMs: 60000, // 1 minute
  },
  newsletter: {
    maxRequests: 3,
    windowMs: 60000, // 1 minute
  },
} as const

/**
 * Data retention
 */
export const DATA_RETENTION = {
  days: parseInt(process.env.DATA_RETENTION_DAYS || '730', 10), // 2 years
  milliseconds: parseInt(process.env.DATA_RETENTION_DAYS || '730', 10) * 24 * 60 * 60 * 1000,
} as const

/**
 * Price ranges (for lead scoring)
 */
export const PRICE_RANGES = {
  light: { min: 3000, max: 8000 }, // per hour
  midsize: { min: 5000, max: 12000 },
  superMidsize: { min: 8000, max: 15000 },
  heavy: { min: 10000, max: 20000 },
} as const

/**
 * Distance categories (nautical miles)
 */
export const DISTANCE_CATEGORIES = {
  short: { max: 500 }, // e.g., NYC to DC
  medium: { min: 500, max: 1500 }, // e.g., NYC to Miami
  long: { min: 1500, max: 3500 }, // e.g., LA to NYC
  ultraLong: { min: 3500 }, // e.g., NYC to London
} as const

/**
 * Email templates
 */
export const EMAIL_TEMPLATES = {
  leadNotification: 'lead-notification',
  affiliateNotification: 'affiliate-notification',
  customerConfirmation: 'customer-confirmation',
} as const

/**
 * Analytics events
 */
export const ANALYTICS_EVENTS = {
  leadSubmit: 'lead_submit',
  leadSuccess: 'lead_success',
  leadError: 'lead_error',
  phoneClick: 'phone_click',
  emailClick: 'email_click',
  quoteFormStart: 'quote_form_start',
  quoteFormComplete: 'quote_form_complete',
  routeView: 'route_view',
  aircraftView: 'aircraft_view',
  cityView: 'city_view',
  emptyLegView: 'empty_leg_view',
  newsletterSignup: 'newsletter_signup',
  contactFormSubmit: 'contact_form_submit',
} as const

/**
 * SEO metadata
 */
export const SEO_DEFAULTS = {
  titleTemplate: '%s | KeyPrivateJet',
  defaultTitle: 'KeyPrivateJet - Luxury Private Jet Charter',
  defaultDescription:
    'Book private jet charters with the world\'s leading operators. Compare quotes, find empty legs, and fly in luxury.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'KeyPrivateJet',
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@keyprivatejet',
  },
} as const

/**
 * Responsive breakpoints (matching Tailwind)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * Performance thresholds (Web Vitals)
 */
export const WEB_VITALS = {
  fcp: { good: 1800, needsImprovement: 3000 },
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  ttfb: { good: 800, needsImprovement: 1800 },
} as const

/**
 * Cookie names
 */
export const COOKIES = {
  consent: 'kpj_cookie_consent',
  analytics: 'kpj_analytics_consent',
  marketing: 'kpj_marketing_consent',
  preferences: 'kpj_preferences',
} as const

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  lastQuote: 'kpj_last_quote',
  recentSearches: 'kpj_recent_searches',
  userPreferences: 'kpj_user_preferences',
} as const

