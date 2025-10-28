export interface City {
  code: string
  name: string
  state: string
  region: string
  airports: string[]
  description: string
  slug: string
}

export interface Route {
  id: string
  from: string // city code
  to: string // city code
  distance: number // in miles
  flightTime: string // e.g., "2h 30m"
  slug: string // e.g., "new-york-to-miami"
  pricing: {
    lightJet: { from: number; to: number }
    midsizeJet: { from: number; to: number }
    superMidsize: { from: number; to: number }
    heavyJet: { from: number; to: number }
  }
  popular: boolean
}

export interface Aircraft {
  category: 'light-jets' | 'midsize-jets' | 'super-midsize-jets' | 'heavy-jets'
  name: string
  models: string[]
  capacity: string // e.g., "4-7 passengers"
  range: string // e.g., "1,500 miles"
  speed: string // e.g., "450 mph"
  hourlyRate: { from: number; to: number }
  features: string[]
  idealFor: string[]
  description: string
  slug: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  from_city: string
  to_city: string
  date: Date
  passengers: number
  aircraft_preference?: string
  message?: string
  gdpr_consent?: boolean
  marketing_consent?: boolean
}

export interface Lead extends LeadFormData {
  id: string
  created_at: string
  updated_at: string
  source?: string
  utm_campaign?: string
  utm_medium?: string
  utm_source?: string
  utm_content?: string
  utm_term?: string
  landing_page?: string
  affiliate_partner: 'villiers' | 'jettly' | 'nuco'
  referral_code?: string
  commission_status: 'pending' | 'confirmed' | 'paid' | 'cancelled'
  commission_amount?: number
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'lost'
  lead_score?: number
  lead_quality?: 'hot' | 'warm' | 'cold'
  ip_address?: string
  user_agent?: string
  device_type?: 'mobile' | 'tablet' | 'desktop'
  departure_date: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterFormData {
  email: string
}

