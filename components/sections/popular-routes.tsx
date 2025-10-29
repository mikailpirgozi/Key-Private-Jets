'use client'

import { RouteCard } from '@/components/shared/route-card'
import { getPopularRoutes } from '@/lib/data/routes'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function PopularRoutes() {
  const routes = getPopularRoutes(8)
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

    const element = document.getElementById('popular-routes')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="popular-routes" className="py-24 bg-luxury-black-soft relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Most Requested</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
            Popular <span className="text-gradient-gold">Routes</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Explore our most requested private jet routes. Get instant pricing and book your flight today.
          </p>
        </div>

        {/* Routes Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {routes.map((route, index) => (
            <div
              key={route.id}
              className="transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <RouteCard route={route} index={index} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link href="/routes" className="group inline-flex items-center gap-3 px-8 py-4 bg-luxury-black-lighter border-2 border-gold-500/50 rounded-lg text-gold-400 font-semibold hover:border-gold-400 hover:bg-gold-500/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            View All Routes
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}

