'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Plane, Home, Route, Users, Gift, Info, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mainNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'home':
        return <Home className="h-5 w-5" />
      case 'routes':
        return <Route className="h-5 w-5" />
      case 'aircraft':
        return <Plane className="h-5 w-5" />
      case 'charter':
        return <Users className="h-5 w-5" />
      case 'empty legs':
        return <Gift className="h-5 w-5" />
      case 'about':
        return <Info className="h-5 w-5" />
      case 'contact':
        return <Mail className="h-5 w-5" />
      default:
        return <Plane className="h-5 w-5" />
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-in Menu */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[280px] bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-500/20 p-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 font-playfair text-lg font-bold text-white hover:text-gold-400 transition-colors"
          >
            <Plane className="h-5 w-5 text-gold-500" />
            <span>KeyPrivateJet</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-4">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white ${
                item.featured ? 'bg-gold-500/10 text-gold-400 hover:bg-gold-500/20' : ''
              }`}
            >
              {getIcon(item.name)}
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                {item.description && (
                  <span className="text-xs text-gray-500">{item.description}</span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Call to Action */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gold-500/20 bg-gray-900 p-4">
          <Button
            asChild
            className="w-full bg-gold-500 text-gray-900 hover:bg-gold-600 font-semibold"
          >
            <Link href="/#quote" onClick={onClose}>
              Get Free Quote
            </Link>
          </Button>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors"
            onClick={onClose}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  )
}

