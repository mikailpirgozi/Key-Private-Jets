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
    <header className="fixed top-0 z-50 w-full border-b border-gold-500/20 bg-gray-900/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-playfair text-xl font-bold text-white hover:text-gold-400 transition-colors">
            <Plane className="h-6 w-6 text-gold-500" />
            <span>KeyPrivateJet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors"
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
            <Button asChild className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-gray-900 font-semibold shadow-lg hover:shadow-gold-500/50 transition-all">
              <Link href="/#quote-form">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gold-500/20 bg-gray-900/98 backdrop-blur-xl py-6">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors py-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gold-500/20 flex flex-col gap-3">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{process.env.NEXT_PUBLIC_PHONE_DISPLAY}</span>
                </a>
                <Button asChild className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-gray-900 font-semibold">
                  <Link href="/#quote-form" onClick={() => setIsMenuOpen(false)}>
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

