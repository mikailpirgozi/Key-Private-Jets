import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateRouteMetadata } from '@/lib/seo'
import { getRouteBySlug, POPULAR_ROUTES } from '@/lib/data/routes'
import { getCityByCode } from '@/lib/data/cities'
import { QuoteForm } from '@/components/forms/quote-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Plane, DollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface RoutePageProps {
  params: {
    route: string
  }
}

export async function generateStaticParams() {
  return POPULAR_ROUTES.map((route) => ({
    route: route.slug,
  }))
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const route = getRouteBySlug(params.route)
  
  if (!route) {
    return {
      title: 'Route Not Found',
    }
  }

  const fromCity = getCityByCode(route.from)
  const toCity = getCityByCode(route.to)

  return generateRouteMetadata({
    from: fromCity?.name || route.from,
    to: toCity?.name || route.to,
    flightTime: route.flightTime,
    priceFrom: route.pricing.lightJet.from,
    slug: route.slug,
  })
}

export default function RoutePage({ params }: RoutePageProps) {
  const route = getRouteBySlug(params.route)

  if (!route) {
    notFound()
  }

  const fromCity = getCityByCode(route.from)
  const toCity = getCityByCode(route.to)

  const aircraftOptions = [
    {
      category: 'Light Jets',
      price: route.pricing.lightJet,
      passengers: '4-7',
      description: 'Perfect for small groups and short to medium flights',
    },
    {
      category: 'Midsize Jets',
      price: route.pricing.midsizeJet,
      passengers: '6-8',
      description: 'Best value with stand-up cabin and transcontinental range',
    },
    {
      category: 'Super Midsize Jets',
      price: route.pricing.superMidsize,
      passengers: '8-10',
      description: 'Spacious cabin with long-range capability',
    },
    {
      category: 'Heavy Jets',
      price: route.pricing.heavyJet,
      passengers: '10-16',
      description: 'Ultimate luxury for long-haul flights',
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge className="bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20">
                Popular Route
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-center mb-6">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-2">
                {fromCity?.name} to {toCity?.name}
              </span>
              <span className="text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                Private Jet Charter
              </span>
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold-400" />
                <span>{route.distance} miles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold-400" />
                <span>{route.flightTime} flight time</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gold-400" />
                <span className="text-gradient-gold">From {formatCurrency(route.pricing.lightJet.from)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Route Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Route Overview */}
              <div className="luxury-card p-8 md:p-10">
                <h2 className="text-3xl font-bold font-playfair text-white mb-6">Route Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  The {fromCity?.name} to {toCity?.name} route is one of the most popular private jet
                  charters in the United States. With a flight time of approximately {route.flightTime},
                  this {route.distance}-mile journey offers significant time savings compared to
                  commercial flights.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-luxury-black-lighter border border-gold-500/20 p-6 rounded-lg">
                    <h3 className="font-semibold text-white mb-4 text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gold-400" />
                      Departure
                    </h3>
                    <p className="text-gold-300 font-medium mb-2">{fromCity?.name}, {fromCity?.state}</p>
                    <p className="text-sm text-gray-500 font-medium mb-3">Available Airports:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {fromCity?.airports.map((airport) => (
                        <li key={airport}>✓ {airport}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-luxury-black-lighter border border-gold-500/20 p-6 rounded-lg">
                    <h3 className="font-semibold text-white mb-4 text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gold-400" />
                      Destination
                    </h3>
                    <p className="text-gold-300 font-medium mb-2">{toCity?.name}, {toCity?.state}</p>
                    <p className="text-sm text-gray-500 font-medium mb-3">Available Airports:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {toCity?.airports.map((airport) => (
                        <li key={airport}>✓ {airport}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Aircraft Options */}
              <div>
                <h2 className="text-3xl font-bold font-playfair text-white mb-6">
                  Aircraft Options & <span className="text-gradient-gold">Pricing</span>
                </h2>
                <div className="space-y-4">
                  {aircraftOptions.map((option) => (
                    <div key={option.category} className="luxury-card p-6 md:p-8 border border-gold-500/20 hover:border-gold-400/50 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Plane className="h-5 w-5 text-gold-400" />
                            <h3 className="text-xl font-semibold text-white group-hover:text-gold-400">
                              {option.category}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-400 font-medium mb-1">
                            Capacity: {option.passengers} passengers
                          </p>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 font-medium mb-1">Estimated Cost</p>
                          <p className="text-2xl font-bold text-gradient-gold">
                            {formatCurrency(option.price.from)} - {formatCurrency(option.price.to)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-6 text-center italic">
                  * Prices are estimates and may vary based on availability, season, and specific requirements.
                </p>
              </div>
            </div>

            {/* Right Column - Quote Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QuoteForm
                  defaultFrom={fromCity?.name}
                  defaultTo={toCity?.name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose This Route */}
      <section className="py-20 relative border-y border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-playfair text-white mb-12 text-center">
              Why Choose <span className="text-gradient-gold">Private Jet Charter?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luxury-card p-8 group">
                <div className="text-center">
                  <Clock className="h-12 w-12 text-gold-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">Save Time</h3>
                  <p className="text-sm text-gray-400">
                    Skip security lines and arrive just 15 minutes before departure
                  </p>
                </div>
              </div>
              <div className="luxury-card p-8 group">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gold-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">Convenient Airports</h3>
                  <p className="text-sm text-gray-400">
                    Access smaller airports closer to your destination
                  </p>
                </div>
              </div>
              <div className="luxury-card p-8 group">
                <div className="text-center">
                  <Plane className="h-12 w-12 text-gold-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">Luxury & Privacy</h3>
                  <p className="text-sm text-gray-400">
                    Enjoy exclusive use of the aircraft with premium service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Routes CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/routes"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105"
          >
            <span>Explore More Routes</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
}

