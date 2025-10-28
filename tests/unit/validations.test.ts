import { describe, it, expect } from 'vitest'
import { leadFormSchema, contactFormSchema, newsletterSchema } from '@/lib/validations'

describe('leadFormSchema', () => {
  it('validates correct lead form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date('2025-12-25'),
      passengers: 4,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 4,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects short phone number', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 4,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects without GDPR consent', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 4,
      gdpr_consent: false,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects invalid passenger count', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 0,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('contactFormSchema', () => {
  it('validates correct contact form data', () => {
    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'I would like more information about your services.',
    }

    const result = contactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short subject', () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Hi',
      message: 'I would like more information.',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects short message', () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'Hello',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('newsletterSchema', () => {
  it('validates correct email', () => {
    const result = newsletterSchema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-an-email' })
    expect(result.success).toBe(false)
  })
})

