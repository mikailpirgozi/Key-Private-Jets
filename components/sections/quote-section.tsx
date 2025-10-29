'use client'

import { QuoteForm } from '@/components/forms/quote-form'
import { Sparkles } from 'lucide-react'

export function QuoteSection() {
  return (
    <section id="quote-form" className="py-20 bg-gradient-to-b from-primary-900 to-primary-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span className="text-gold-400 text-sm font-semibold">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
              Get Your Free Quote
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fill out the form below and receive competitive quotes from top charter operators
            </p>
          </div>

          {/* Quote Form */}
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}

