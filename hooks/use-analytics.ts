'use client'

import { useCallback } from 'react'
import { event as trackEvent } from '@/lib/analytics/ga'
import { ANALYTICS_EVENTS } from '@/lib/constants'

/**
 * Hook for tracking analytics events
 */
export function useAnalytics() {
  /**
   * Track lead submission
   */
  const trackLeadSubmit = useCallback((data: {
    from: string
    to: string
    passengers: number
    aircraft?: string
  }) => {
    trackEvent({
      action: ANALYTICS_EVENTS.leadSubmit,
      category: 'Lead',
      label: `${data.from} to ${data.to}`,
      value: data.passengers,
    })
  }, [])

  /**
   * Track lead success
   */
  const trackLeadSuccess = useCallback((leadId: string, leadScore: number) => {
    trackEvent({
      action: ANALYTICS_EVENTS.leadSuccess,
      category: 'Lead',
      label: leadId,
      value: leadScore,
    })
  }, [])

  /**
   * Track lead error
   */
  const trackLeadError = useCallback((error: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.leadError,
      category: 'Lead',
      label: error,
    })
  }, [])

  /**
   * Track phone click
   */
  const trackPhoneClick = useCallback((location: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.phoneClick,
      category: 'Engagement',
      label: location,
    })
  }, [])

  /**
   * Track email click
   */
  const trackEmailClick = useCallback((location: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.emailClick,
      category: 'Engagement',
      label: location,
    })
  }, [])

  /**
   * Track quote form start
   */
  const trackQuoteFormStart = useCallback(() => {
    trackEvent({
      action: ANALYTICS_EVENTS.quoteFormStart,
      category: 'Form',
      label: 'Quote Form Started',
    })
  }, [])

  /**
   * Track quote form completion
   */
  const trackQuoteFormComplete = useCallback((timeSpent: number) => {
    trackEvent({
      action: ANALYTICS_EVENTS.quoteFormComplete,
      category: 'Form',
      label: 'Quote Form Completed',
      value: Math.round(timeSpent / 1000), // Convert to seconds
    })
  }, [])

  /**
   * Track route view
   */
  const trackRouteView = useCallback((route: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.routeView,
      category: 'Content',
      label: route,
    })
  }, [])

  /**
   * Track aircraft view
   */
  const trackAircraftView = useCallback((category: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.aircraftView,
      category: 'Content',
      label: category,
    })
  }, [])

  /**
   * Track city view
   */
  const trackCityView = useCallback((city: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.cityView,
      category: 'Content',
      label: city,
    })
  }, [])

  /**
   * Track empty leg view
   */
  const trackEmptyLegView = useCallback(() => {
    trackEvent({
      action: ANALYTICS_EVENTS.emptyLegView,
      category: 'Content',
      label: 'Empty Legs Page',
    })
  }, [])

  /**
   * Track newsletter signup
   */
  const trackNewsletterSignup = useCallback((source: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.newsletterSignup,
      category: 'Engagement',
      label: source,
    })
  }, [])

  /**
   * Track contact form submission
   */
  const trackContactFormSubmit = useCallback((subject: string) => {
    trackEvent({
      action: ANALYTICS_EVENTS.contactFormSubmit,
      category: 'Form',
      label: subject,
    })
  }, [])

  return {
    trackLeadSubmit,
    trackLeadSuccess,
    trackLeadError,
    trackPhoneClick,
    trackEmailClick,
    trackQuoteFormStart,
    trackQuoteFormComplete,
    trackRouteView,
    trackAircraftView,
    trackCityView,
    trackEmptyLegView,
    trackNewsletterSignup,
    trackContactFormSubmit,
  }
}

