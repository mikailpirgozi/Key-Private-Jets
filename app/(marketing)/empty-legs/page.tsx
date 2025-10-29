import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plane, Clock, DollarSign, TrendingDown, Bell, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata({
  title: 'Empty Leg Flights - Save Up to 75% on Private Jet Charter',
  description: 'Discover empty leg private jet deals and save up to 75% on luxury flights. Last-minute availability on routes across the US. Book your discounted private jet today!',
  keywords: ['empty leg flights', 'private jet deals', 'discounted private jets', 'last minute private jet'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/empty-legs`,
})

export default function EmptyLegsPage() {
  // Sample empty leg deals (in production, these would come from API/database)
  const sampleDeals = [
    {
      id: '1',
      from: 'New York (TEB)',
      to: 'Miami (OPF)',
      date: 'Dec 15, 2025',
      aircraft: 'Citation X',
      category: 'Super Midsize',
      passengers: 8,
      regularPrice: 22000,
      emptyLegPrice: 8500,
      savings: 61,
    },
    {
      id: '2',
      from: 'Los Angeles (VNY)',
      to: 'Las Vegas (HND)',
      date: 'Dec 18, 2025',
      aircraft: 'Learjet 45',
      category: 'Light Jet',
      passengers: 6,
      regularPrice: 4500,
      emptyLegPrice: 1800,
      savings: 60,
    },
    {
      id: '3',
      from: 'Chicago (PWK)',
      to: 'New York (TEB)',
      date: 'Dec 20, 2025',
      aircraft: 'Challenger 300',
      category: 'Super Midsize',
      passengers: 9,
      regularPrice: 16000,
      emptyLegPrice: 5500,
      savings: 66,
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Save Up to 75%',
      description: 'Empty leg flights offer significant savings compared to regular charter rates.',
    },
    {
      icon: Clock,
      title: 'Last-Minute Availability',
      description: 'Perfect for flexible travelers who can book on short notice.',
    },
    {
      icon: Plane,
      title: 'Same Luxury Experience',
      description: 'Enjoy the same premium service and aircraft at a fraction of the cost.',
    },
    {
      icon: TrendingDown,
      title: 'Best Value',
      description: 'The most cost-effective way to experience private aviation.',
    },
  ]

  return (
    <div className="bg-luxury-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-8">
              <TrendingDown className="h-4 w-4" />
              <span>Save Up to 75%</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-2">
                Empty Leg
              </span>
              <span className="block text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                Flights
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
              Discover incredible deals on private jet flights. Empty legs occur when an aircraft needs to return to base or reposition for another charter. Book these flights and save up to 75%!
            </p>
          </div>
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </section>

      {/* What Are Empty Legs */}
      <section className="py-20 relative border-y border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold font-playfair text-white mb-8 text-center">
              What Are <span className="text-gradient-gold">Empty Leg Flights?</span>
            </h2>
            <div className="luxury-card p-8 md:p-12">
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p>
                  An empty leg flight happens when a private jet needs to fly without passengers. This
                  occurs when:
                </p>
                <ul className="space-y-3 pl-6">
                  <li className="flex gap-3">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>A one-way charter is booked and the aircraft must return to its base</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>An aircraft needs to reposition for another scheduled charter</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>A jet is being moved between maintenance facilities</span>
                  </li>
                </ul>
                <p>
                  Rather than fly empty, operators offer these flights at heavily discounted rates.
                  It&apos;s a win-win: you get luxury travel at a fraction of the cost, and operators offset
                  their repositioning expenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-playfair text-white mb-12 text-center">
            Why Book <span className="text-gradient-gold">Empty Legs?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="luxury-card p-8 group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gold-500/10 border-2 border-gold-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-400/60 group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="h-10 w-10 text-gold-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent w-full mb-3" />
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Deals */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-playfair text-white mb-8 text-center">
            Current Empty Leg <span className="text-gradient-gold">Deals</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {sampleDeals.map((deal) => (
              <div key={deal.id} className="luxury-card p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-gold-500/10 border border-gold-500/30 text-gold-400">
                    {deal.category}
                  </Badge>
                  <Badge className="bg-green-500/10 border border-green-500/30 text-green-400">
                    Save {deal.savings}%
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-playfair font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {deal.from} → {deal.to}
                </h3>
                <p className="text-gray-500 mb-6">{deal.date}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Aircraft:</span>
                    <span className="text-white font-semibold">{deal.aircraft}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Passengers:</span>
                    <span className="text-white font-semibold">Up to {deal.passengers}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Regular Price:</span>
                    <span className="text-sm line-through text-gray-600">
                      ${deal.regularPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Empty Leg Price:</span>
                    <span className="text-3xl font-bold text-gradient-gold">
                      ${deal.emptyLegPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-gray-900 font-semibold shadow-lg group-hover:shadow-gold-500/50 transition-all">
                  Book Now
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">
            These are sample deals. Actual availability changes daily.
          </p>
        </div>
      </section>

      {/* Subscribe for Alerts */}
      <section className="py-20 relative border-y border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-gold-500/10 border-2 border-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <Bell className="h-10 w-10 text-gold-500" />
            </div>
            <h2 className="text-4xl font-bold font-playfair text-white mb-6">
              Never Miss a <span className="text-gradient-gold">Deal</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Subscribe to our newsletter and get notified about new empty leg deals before anyone else.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-gray-900 font-semibold shadow-lg hover:shadow-gold-500/50 transition-all"
            >
              <a href="/#newsletter" className="inline-flex items-center gap-2">
                Subscribe for Alerts
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold font-playfair text-white mb-8 text-center">
              Important to <span className="text-gradient-gold">Know</span>
            </h2>
            <div className="luxury-card p-8 md:p-12 bg-gold-500/5 border-gold-500/30">
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold text-xl">•</span>
                  <span>
                    <strong className="text-white">Flexibility Required:</strong> Empty leg flights have fixed routes and
                    dates that cannot be changed.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold text-xl">•</span>
                  <span>
                    <strong className="text-white">Last-Minute Availability:</strong> Deals typically appear 1-14 days
                    before departure.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold text-xl">•</span>
                  <span>
                    <strong className="text-white">Subject to Cancellation:</strong> If the original charter cancels, the
                    empty leg may no longer be available.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-500 font-bold text-xl">•</span>
                  <span>
                    <strong className="text-white">One-Way Only:</strong> Empty legs are typically one-way flights. Round
                    trips are rare.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Card with luxury styling */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/20 bg-gradient-to-br from-luxury-black-lighter via-luxury-black to-luxury-black p-12 md:p-16">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-gold opacity-5 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span>Custom Route</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
                  <span className="block text-white mb-2">Looking for a Specific</span>
                  <span className="text-gradient-gold">Route?</span>
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
                </div>

                <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
                  Can&apos;t find an empty leg that fits your schedule? Get a regular charter quote with
                  competitive pricing.
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
                    <span className="text-gold-400 font-semibold">24/7 Concierge Support</span> • Available now
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
