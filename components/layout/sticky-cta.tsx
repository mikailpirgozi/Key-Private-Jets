'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useMobile } from '@/hooks/use-mobile'

interface StickyCtaProps {
  showAfterScroll?: number
}

/**
 * Sticky CTA bar that appears on mobile after scrolling
 * Shows phone call and quote buttons
 */
export function StickyCta({ showAfterScroll = 300 }: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > showAfterScroll
      setIsVisible(scrolled)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll])

  // Only show on mobile
  if (!isMobile) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transform border-t border-gold-500/20 bg-gray-900/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="complementary"
      aria-label="Quick actions"
    >
      <div className="flex items-center gap-2 p-3">
        {/* Phone Button */}
        <Button
          asChild
          variant="outline"
          className="flex-1 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-gray-900 font-semibold"
        >
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center justify-center gap-2"
            onClick={() => {
              // Track phone click
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'phone_click', {
                  event_category: 'Engagement',
                  event_label: 'Sticky CTA',
                })
              }
            }}
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm">Call Now</span>
          </a>
        </Button>

        {/* Quote Button */}
        <Button
          asChild
          className="flex-1 bg-gold-500 text-gray-900 hover:bg-gold-600 font-semibold"
        >
          <Link
            href="/#quote"
            className="flex items-center justify-center gap-2"
            onClick={() => {
              // Track quote click
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'cta_click', {
                  event_category: 'Engagement',
                  event_label: 'Sticky CTA Quote',
                })
              }
            }}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">Get Quote</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

