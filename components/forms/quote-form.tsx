'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/shared/loading-spinner'
import { Plane, Calendar, Users, Mail, Phone, User, MessageSquare } from 'lucide-react'
import * as z from 'zod'

type LeadFormData = z.infer<typeof leadFormSchema>

interface QuoteFormProps {
  defaultFrom?: string
  defaultTo?: string
  className?: string
}

export function QuoteForm({ defaultFrom, defaultTo, className = '' }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      from_city: defaultFrom || '',
      to_city: defaultTo || '',
      passengers: 4,
      gdpr_consent: false,
      marketing_consent: false,
    },
  })

  const onSubmit = async (data: LeadFormData) => {
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
      reset()

      // Track conversion
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold font-playfair text-primary-900">
              Thank You!
            </h3>
            <p className="text-muted-foreground">
              Your quote request has been submitted successfully. Our partner operators will
              contact you within 2-4 hours with competitive quotes.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              variant="outline"
              className="mt-4"
            >
              Submit Another Request
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-playfair">Get Your Free Quote</CardTitle>
        <CardDescription>
          Fill out the form below and receive competitive quotes from top charter operators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Flight Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Plane className="h-5 w-5 text-gold-500" />
              Flight Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from_city">From City *</Label>
                <Input
                  id="from_city"
                  placeholder="e.g., New York"
                  {...register('from_city')}
                  className={errors.from_city ? 'border-red-500' : ''}
                />
                {errors.from_city && (
                  <p className="text-sm text-red-500">{errors.from_city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="to_city">To City *</Label>
                <Input
                  id="to_city"
                  placeholder="e.g., Miami"
                  {...register('to_city')}
                  className={errors.to_city ? 'border-red-500' : ''}
                />
                {errors.to_city && (
                  <p className="text-sm text-red-500">{errors.to_city.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Departure Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('date', {
                    setValueAs: (v) => (v ? new Date(v) : undefined),
                  })}
                  className={errors.date ? 'border-red-500' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Passengers *
                </Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="20"
                  {...register('passengers', {
                    setValueAs: (v) => (v ? parseInt(v, 10) : undefined),
                  })}
                  className={errors.passengers ? 'border-red-500' : ''}
                />
                {errors.passengers && (
                  <p className="text-sm text-red-500">{errors.passengers.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aircraft_preference">Preferred Aircraft (Optional)</Label>
              <select
                id="aircraft_preference"
                {...register('aircraft_preference')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">No preference</option>
                <option value="light-jets">Light Jets (4-7 passengers)</option>
                <option value="midsize-jets">Midsize Jets (6-8 passengers)</option>
                <option value="super-midsize-jets">Super Midsize Jets (8-10 passengers)</option>
                <option value="heavy-jets">Heavy Jets (10-16 passengers)</option>
              </select>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-gold-500" />
              Contact Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...register('phone')}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Additional Information (Optional)
              </Label>
              <textarea
                id="message"
                rows={4}
                placeholder="Any special requirements or questions..."
                {...register('message')}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
          </div>

          {/* GDPR Consent */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="gdpr_consent"
                {...register('gdpr_consent')}
                className="mt-1"
              />
              <Label htmlFor="gdpr_consent" className="text-sm font-normal cursor-pointer">
                I agree to the{' '}
                <a href="/legal/privacy" className="text-gold-500 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/legal/terms" className="text-gold-500 hover:underline">
                  Terms of Service
                </a>{' '}
                *
              </Label>
            </div>
            {errors.gdpr_consent && (
              <p className="text-sm text-red-500">{errors.gdpr_consent.message}</p>
            )}

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="marketing_consent"
                {...register('marketing_consent')}
                className="mt-1"
              />
              <Label htmlFor="marketing_consent" className="text-sm font-normal cursor-pointer">
                I would like to receive exclusive deals and updates (optional)
              </Label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold text-lg h-12"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Submitting...</span>
              </>
            ) : (
              'Get Free Quote'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting this form, you&apos;ll receive quotes from our partner operators within 2-4
            hours. No obligation to book.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

