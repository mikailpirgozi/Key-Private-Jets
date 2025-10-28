'use client'

import { AircraftCard } from '@/components/shared/aircraft-card'
import { AIRCRAFT_CATEGORIES } from '@/lib/data/aircraft'
import { Plane } from 'lucide-react'
import { useEffect, useState } from 'react'

export function AircraftCategories() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('aircraft-categories')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="aircraft-categories" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-6">
            <Plane className="h-4 w-4" />
            <span>Our Fleet</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
            Choose Your <span className="text-gradient-gold">Aircraft</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <p className="text-lg text-gray-400 leading-relaxed">
            From light jets for short hops to heavy jets for transcontinental travel, find the perfect aircraft for your journey.
          </p>
        </div>

        {/* Aircraft Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {AIRCRAFT_CATEGORIES.map((aircraft, index) => (
            <div
              key={aircraft.slug}
              className="transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AircraftCard aircraft={aircraft} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

