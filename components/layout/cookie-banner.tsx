'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COOKIES } from '@/lib/constants'

/**
 * Lightweight cookie consent banner
 * Compliant with CCPA (California) and GDPR (EU)
 * Shows only on first visit
 */
export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(COOKIES.consent)
    if (!hasConsented) {
      // Show banner after 1 second delay (better UX)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
    
    return undefined
  }, [])

  const handleAccept = () => {
    // Store consent in localStorage
    localStorage.setItem(COOKIES.consent, 'true')
    localStorage.setItem(COOKIES.analytics, 'true')
    localStorage.setItem(COOKIES.marketing, 'true')
    
    // Initialize analytics (if not already initialized)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      })
    }

    setIsVisible(false)
  }

  const handleDecline = () => {
    // Store minimal consent (only essential cookies)
    localStorage.setItem(COOKIES.consent, 'true')
    localStorage.setItem(COOKIES.analytics, 'false')
    localStorage.setItem(COOKIES.marketing, 'false')
    
    // Deny analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }

    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/98 backdrop-blur-xl border-t border-gold-500/20 shadow-2xl"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Message */}
          <div className="flex-1 text-sm text-gray-300">
            <p className="mb-2">
              We use cookies to enhance your experience, analyze site traffic, and personalize content.
            </p>
            <p className="text-xs text-gray-400">
              By clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
              <Link 
                href="/legal/privacy" 
                className="text-gold-400 hover:text-gold-300 underline"
              >
                Privacy Policy
              </Link>
              {' | '}
              <Link 
                href="/legal/cookies" 
                className="text-gold-400 hover:text-gold-300 underline"
              >
                Cookie Policy
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-xs sm:text-sm"
            >
              Essential Only
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="flex-1 sm:flex-none bg-gold-500 text-gray-900 hover:bg-gold-600 font-semibold text-xs sm:text-sm"
            >
              Accept All
            </Button>
            <button
              onClick={handleDecline}
              className="p-2 text-gray-400 hover:text-white transition-colors sm:ml-2"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Check if user has consented to analytics
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(COOKIES.analytics) === 'true'
}

/**
 * Check if user has consented to marketing
 */
export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(COOKIES.marketing) === 'true'
}

/**
 * Clear all cookie consent (for testing or user request)
 */
export function clearCookieConsent() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(COOKIES.consent)
  localStorage.removeItem(COOKIES.analytics)
  localStorage.removeItem(COOKIES.marketing)
}

