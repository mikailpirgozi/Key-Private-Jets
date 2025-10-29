import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateRouteMetadata } from '@/lib/seo'
import { getRouteBySlug, POPULAR_ROUTES } from '@/lib/data/routes'
import { getCityByCode } from '@/lib/data/cities'
import { QuoteForm } from '@/components/forms/quote-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Plane, DollarSign } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge className="bg-gold-500 text-primary-900 hover:bg-gold-600">Popular Route</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6 text-center">
              Private Jet Charter: {fromCity?.name} to {toCity?.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-gray-200">
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
                <span>From {formatCurrency(route.pricing.lightJet.from)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Route Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Route Overview */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-primary-900">Route Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The {fromCity?.name} to {toCity?.name} route is one of the most popular private jet
                  charters in the United States. With a flight time of approximately {route.flightTime},
                  this {route.distance}-mile journey offers significant time savings compared to
                  commercial flights.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-900 mb-3 text-lg">Departure</h3>
                    <p className="text-gray-900 font-medium mb-2">{fromCity?.name}, {fromCity?.state}</p>
                    <p className="text-sm text-gray-700 font-medium mb-2">Available Airports:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {fromCity?.airports.map((airport) => (
                        <li key={airport}>• {airport}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-900 mb-3 text-lg">Destination</h3>
                    <p className="text-gray-900 font-medium mb-2">{toCity?.name}, {toCity?.state}</p>
                    <p className="text-sm text-gray-700 font-medium mb-2">Available Airports:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {toCity?.airports.map((airport) => (
                        <li key={airport}>• {airport}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aircraft Options */}
            <div>
              <h2 className="text-3xl font-bold font-playfair text-primary-900 mb-6">
                Aircraft Options & Pricing
              </h2>
              <div className="space-y-4">
                {aircraftOptions.map((option) => (
                  <Card key={option.category} className="bg-white shadow-lg border-2 border-gray-100 hover:border-gold-300 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Plane className="h-5 w-5 text-gold-500" />
                            <h3 className="text-xl font-semibold text-primary-900">
                              {option.category}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-700 font-medium mb-1">
                            Capacity: {option.passengers} passengers
                          </p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-700 font-medium mb-1">Estimated Cost</p>
                          <p className="text-2xl font-bold text-gold-600">
                            {formatCurrency(option.price.from)} - {formatCurrency(option.price.to)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-6 text-center italic">
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
      </section>

      {/* Why Choose This Route */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-playfair text-primary-900 mb-8 text-center">
              Why Choose Private Jet Charter?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-primary-900 mb-2">Save Time</h3>
                  <p className="text-sm text-gray-600">
                    Skip security lines and arrive just 15 minutes before departure
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-primary-900 mb-2">Convenient Airports</h3>
                  <p className="text-sm text-gray-600">
                    Access smaller airports closer to your destination
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Plane className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-primary-900 mb-2">Luxury & Privacy</h3>
                  <p className="text-sm text-gray-600">
                    Enjoy exclusive use of the aircraft with premium service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

