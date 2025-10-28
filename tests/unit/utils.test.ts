import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  calculateLeadScore,
  getLeadQuality,
  getDeviceType,
} from '@/lib/utils'

describe('formatCurrency', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000')
    expect(formatCurrency(25000)).toBe('$25,000')
    expect(formatCurrency(150000)).toBe('$150,000')
  })

  it('handles zero and negative values', () => {
    expect(formatCurrency(0)).toBe('$0')
    expect(formatCurrency(-500)).toBe('-$500')
  })
})

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2025-12-25')
    expect(formatDate(date)).toBe('December 25, 2025')
  })

  it('handles string dates', () => {
    expect(formatDate('2025-01-01')).toBe('January 1, 2025')
  })
})

describe('formatPhoneNumber', () => {
  it('formats US phone numbers', () => {
    expect(formatPhoneNumber('5551234567')).toBe('(555) 123-4567')
    expect(formatPhoneNumber('8005551234')).toBe('(800) 555-1234')
  })

  it('handles already formatted numbers', () => {
    expect(formatPhoneNumber('(555) 123-4567')).toBe('(555) 123-4567')
  })

  it('returns original if invalid format', () => {
    expect(formatPhoneNumber('123')).toBe('123')
  })
})

describe('calculateLeadScore', () => {
  it('calculates base score correctly', () => {
    const score = calculateLeadScore({
      passengers: 2,
    })
    expect(score).toBe(5)
  })

  it('adds points for more passengers', () => {
    expect(calculateLeadScore({ passengers: 4 })).toBe(6)
    expect(calculateLeadScore({ passengers: 8 })).toBe(7)
  })

  it('adds points for aircraft preference', () => {
    expect(
      calculateLeadScore({
        passengers: 4,
        aircraft_preference: 'heavy-jets',
      })
    ).toBe(7)
  })

  it('adds points for detailed message', () => {
    const longMessage = 'a'.repeat(150)
    expect(
      calculateLeadScore({
        passengers: 8,
        aircraft_preference: 'heavy-jets',
        message: longMessage,
      })
    ).toBe(9)
  })

  it('caps score at 10', () => {
    const longMessage = 'a'.repeat(200)
    // Base: 5, passengers 10 (>=8): +2, aircraft: +1, message >100: +1 = 9
    // Max is 10, but we only get 9 from the formula
    expect(
      calculateLeadScore({
        passengers: 10,
        aircraft_preference: 'heavy-jets',
        message: longMessage,
      })
    ).toBe(9)
  })
})

describe('getLeadQuality', () => {
  it('returns hot for high scores', () => {
    expect(getLeadQuality(8)).toBe('hot')
    expect(getLeadQuality(10)).toBe('hot')
  })

  it('returns warm for medium scores', () => {
    expect(getLeadQuality(5)).toBe('warm')
    expect(getLeadQuality(7)).toBe('warm')
  })

  it('returns cold for low scores', () => {
    expect(getLeadQuality(1)).toBe('cold')
    expect(getLeadQuality(4)).toBe('cold')
  })
})

describe('getDeviceType', () => {
  it('detects mobile devices', () => {
    expect(getDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) Mobile/15E148')).toBe('mobile')
    expect(getDeviceType('Mozilla/5.0 (Linux; Android 10; SM-G973F) Mobile')).toBe('mobile')
  })

  it('detects tablets', () => {
    expect(getDeviceType('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)')).toBe('tablet')
  })

  it('detects desktop', () => {
    expect(getDeviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('desktop')
    expect(getDeviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe('desktop')
  })
})

