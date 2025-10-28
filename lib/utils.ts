import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

export function calculateLeadScore(data: {
  passengers: number
  aircraft_preference?: string
  message?: string
}): number {
  let score = 5 // Base score

  // More passengers = higher score
  if (data.passengers >= 8) score += 2
  else if (data.passengers >= 4) score += 1

  // Aircraft preference shows serious intent
  if (data.aircraft_preference) score += 1

  // Detailed message shows engagement
  if (data.message && data.message.length > 100) score += 1

  return Math.min(score, 10)
}

export function getLeadQuality(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 8) return 'hot'
  if (score >= 5) return 'warm'
  return 'cold'
}

export function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet|ipad/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

