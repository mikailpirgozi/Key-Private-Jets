import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { POPULAR_ROUTES } from '@/lib/data/routes'
import { RouteCard } from '@/components/shared/route-card'
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata({
  title: 'Popular Private Jet Routes - Best Charter Flight Destinations',
  description: 'Explore our most popular private jet charter routes across the US. Get instant quotes for flights between major cities. Competitive pricing and 24/7 availability.',
  keywords: ['private jet routes', 'charter flight routes', 'popular destinations'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/routes`,
})

export default function RoutesPage() {
  return (
    <div className="bg-luxury-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-8">
              <TrendingUp className="h-4 w-4" />
              <span>Our Popular Routes</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-2">
                Popular Private
              </span>
              <span className="block text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                Jet Routes
              </span>
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore our most requested private jet routes. Each destination features competitive pricing, multiple aircraft options, and instant availability.
            </p>
          </div>
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </section>

      {/* Routes Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_ROUTES.map((route, index) => (
              <RouteCard key={route.id} route={route} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Card with luxury styling */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 bg-gradient-to-br from-luxury-black-lighter via-luxury-black to-luxury-black p-12 md:p-16">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-gold opacity-5 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span>Custom Destinations</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
                  <span className="block text-white mb-2">Don&apos;t See Your</span>
                  <span className="text-gradient-gold">Route?</span>
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
                </div>

                <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
                  We can arrange private jet charter to any destination worldwide. Get a custom quote for your specific route with our concierge team.
                </p>

                <Link
                  href="/#quote"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105"
                >
                  <span>Get Custom Quote</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                {/* Trust indicator */}
                <div className="mt-8 pt-8 border-t border-gold-500/20">
                  <p className="text-sm text-gray-400">
                    <span className="text-gold-400 font-semibold">24/7 Concierge Support</span> • Response within 15 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

