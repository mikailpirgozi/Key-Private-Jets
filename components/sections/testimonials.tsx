'use client'

import { TESTIMONIALS } from '@/lib/data/testimonials'
import { Star, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Testimonials() {
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

    const element = document.getElementById('testimonials')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="testimonials" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-gold-400" />
            <span>Client Reviews</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <p className="text-lg text-gray-400 leading-relaxed">
            Join thousands of satisfied travelers who trust KeyPrivateJet for their private aviation needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="luxury-card p-6 h-full flex flex-col group">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-gold-500/30 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 italic leading-relaxed flex-grow">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Decorative line */}
                <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-4" />

                {/* Author */}
                <div>
                  <p className="font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

