'use client'

import { Search, MessageSquare, Plane, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const steps = [
  {
    icon: Search,
    title: 'Request a Quote',
    description: 'Tell us your travel details - where, when, and how many passengers. Get instant quotes from multiple operators.',
    number: '01',
  },
  {
    icon: MessageSquare,
    title: 'Compare & Choose',
    description: 'Review competitive quotes, aircraft options, and operator ratings. Our team helps you select the best option.',
    number: '02',
  },
  {
    icon: Plane,
    title: 'Fly in Luxury',
    description: 'Confirm your booking and prepare for departure. Enjoy personalized service and arrive refreshed at your destination.',
    number: '03',
  },
]

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('how-it-works')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="how-it-works" className="py-24 bg-luxury-black-soft relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Simple Process</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
            How It <span className="text-gradient-gold">Works</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <p className="text-lg text-gray-400 leading-relaxed">
            Booking a private jet has never been easier. Three simple steps to your perfect flight.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={index} 
                className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Connector Line (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-px bg-gradient-to-r from-gold-500/50 to-gold-500/20 -z-10" />
                )}

                <div className="luxury-card p-8 relative group">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-gold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-luxury-black font-bold text-xl">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-luxury-black-lighter border-2 border-gold-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-400/60 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-10 w-10 text-gold-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold font-playfair text-white mb-4 group-hover:text-gold-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-4" />
                  
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

