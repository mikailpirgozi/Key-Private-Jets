'use client'

import { useState, useCallback } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema } from '@/lib/validations'
import type * as z from 'zod'

type LeadFormData = z.infer<typeof leadFormSchema>

interface UseLeadFormOptions {
  defaultFrom?: string
  defaultTo?: string
  aircraftPreference?: string
  onSuccess?: (data: LeadFormData) => void
  onError?: (error: Error) => void
}

interface UseLeadFormReturn {
  form: UseFormReturn<LeadFormData>
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  onSubmit: (data: LeadFormData) => Promise<void>
  reset: () => void
}

/**
 * Hook for managing lead form state and submission
 */
export function useLeadForm(options: UseLeadFormOptions = {}): UseLeadFormReturn {
  const { defaultFrom, defaultTo, aircraftPreference, onSuccess, onError } = options

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      from_city: defaultFrom || '',
      to_city: defaultTo || '',
      aircraft_preference: aircraftPreference || '',
      passengers: 4,
      gdpr_consent: false,
      marketing_consent: false,
    },
  })

  const onSubmit = useCallback(
    async (data: LeadFormData) => {
      setIsSubmitting(true)
      setError(null)

      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit quote request')
        }

        setIsSuccess(true)
        form.reset()

        // Track conversion in Google Analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'lead_submission', {
            event_category: 'Lead Generation',
            event_label: `${data.from_city} to ${data.to_city}`,
            value: data.passengers,
          })
        }

        // Facebook Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead')
        }

        // Success callback
        onSuccess?.(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(errorMessage)
        onError?.(err instanceof Error ? err : new Error(errorMessage))
      } finally {
        setIsSubmitting(false)
      }
    },
    [form, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setIsSuccess(false)
    setError(null)
    form.reset()
  }, [form])

  return {
    form,
    isSubmitting,
    isSuccess,
    error,
    onSubmit,
    reset,
  }
}

/**
 * Calculate lead score based on form data
 * Score: 1-10 (10 being highest quality)
 */
export function calculateLeadScore(data: LeadFormData): number {
  let score = 5 // Base score

  // Has phone number (+2)
  if (data.phone && data.phone.length >= 10) {
    score += 2
  }

  // Reasonable passenger count (+1)
  if (data.passengers >= 4 && data.passengers <= 12) {
    score += 1
  }

  // Has specific aircraft preference (+1)
  if (data.aircraft_preference) {
    score += 1
  }

  // Has additional message/requirements (+1)
  if (data.message && data.message.length > 20) {
    score += 1
  }

  // Marketing consent indicates serious interest (+1)
  if (data.marketing_consent) {
    score += 1
  }

  // Future date (not same day emergency) - more likely to convert (-1 for same day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const depDate = new Date(data.date)
  depDate.setHours(0, 0, 0, 0)
  const daysUntilDeparture = Math.floor((depDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntilDeparture >= 7) {
    score += 1 // Planning ahead is good
  } else if (daysUntilDeparture < 0) {
    score -= 2 // Past date is bad
  }

  return Math.max(1, Math.min(10, score))
}

/**
 * Determine lead quality based on score
 */
export function getLeadQuality(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 8) return 'hot'
  if (score >= 5) return 'warm'
  return 'cold'
}

