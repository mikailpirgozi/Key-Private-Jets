'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import * as z from 'zod'

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterFormProps {
  className?: string
}

export function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe')
      }

      setIsSuccess(true)
      reset()

      // Track event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'Engagement',
        })
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      {isSuccess ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600 font-medium">
            ✓ Successfully subscribed! Check your email for confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Subscribing...</span>
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <p className="text-xs text-muted-foreground">
            Get exclusive empty leg deals and private aviation insights. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  )
}

