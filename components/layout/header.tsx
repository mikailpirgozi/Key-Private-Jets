'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plane, Menu, X, Phone } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Routes', href: '/routes' },
    { name: 'Aircraft', href: '/aircraft' },
    { name: 'Empty Legs', href: '/empty-legs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-playfair text-xl font-bold text-primary-900">
            <Plane className="h-6 w-6 text-gold-500" />
            <span>KeyPrivateJet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-900 transition-colors"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'phone_click', {
                    event_category: 'Contact',
                  })
                }
              }}
            >
              <Phone className="h-4 w-4" />
              <span>{process.env.NEXT_PUBLIC_PHONE_DISPLAY}</span>
            </a>
            <Button asChild className="bg-gold-500 hover:bg-gold-600 text-primary-900">
              <Link href="/#quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:text-primary-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col gap-3">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-900"
                >
                  <Phone className="h-4 w-4" />
                  <span>{process.env.NEXT_PUBLIC_PHONE_DISPLAY}</span>
                </a>
                <Button asChild className="w-full bg-gold-500 hover:bg-gold-600 text-primary-900">
                  <Link href="/#quote" onClick={() => setIsMenuOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

