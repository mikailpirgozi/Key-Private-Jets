import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { MAJOR_CITIES, getCityBySlug } from '@/lib/data/cities'
import { POPULAR_ROUTES } from '@/lib/data/routes'
import { generateCityMetadata } from '@/lib/seo'
import { RouteCard } from '@/components/shared/route-card'
import { QuoteForm } from '@/components/forms/quote-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Plane, Clock, DollarSign } from 'lucide-react'

interface CityPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city)

  if (!city) {
    return {
      title: 'City Not Found',
      robots: 'noindex',
    }
  }

  return generateCityMetadata({
    name: city.name,
    airports: city.airports,
    slug: city.slug,
  })
}

export async function generateStaticParams() {
  return MAJOR_CITIES.map((city) => ({
    city: city.slug,
  }))
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city)

  if (!city) {
    notFound()
  }

  // Get routes from/to this city
  const routesFromCity = POPULAR_ROUTES.filter((route) => route.from === city.code)
  const routesToCity = POPULAR_ROUTES.filter((route) => route.to === city.code)
  const relatedRoutes = [...routesFromCity, ...routesToCity].slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Badge className="bg-gold-500 text-primary-900 hover:bg-gold-600">
              Charter Flights Available
            </Badge>
          </div>

          <h1 className="mb-4 font-playfair text-4xl font-bold md:text-5xl">
            Private Jet Charter in {city.name}
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-primary-100">
            {city.description}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold-500" />
                <span className="text-sm text-primary-200">Airports</span>
              </div>
              <p className="text-2xl font-bold">{city.airports.length}</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 flex items-center gap-2">
                <Plane className="h-5 w-5 text-gold-500" />
                <span className="text-sm text-primary-200">Region</span>
              </div>
              <p className="text-2xl font-bold">{city.region}</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold-500" />
                <span className="text-sm text-primary-200">24/7 Available</span>
              </div>
              <p className="text-2xl font-bold">Always Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-playfair text-3xl font-bold text-primary-900">
                Get Instant Quote
              </h2>
              <p className="mb-6 text-lg text-gray-700">
                Request a quote for your private jet charter from {city.name}. Our partners will respond within 2 hours with competitive pricing.
              </p>
              <ul className="space-y-3">
                {[
                  'Instant quotes from top operators',
                  'Best rates guaranteed',
                  '24/7 availability',
                  'Professional crew included',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gold-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg">
              <QuoteForm defaultFrom={city.code} />
            </div>
          </div>
        </div>
      </section>

      {/* Airports Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-playfair text-3xl font-bold text-primary-900">
            Available Airports
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {city.airports.map((airport, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gold-500" />
                    {airport}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Premium private aviation facility serving {city.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes from This City */}
      {relatedRoutes.length > 0 && (
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-playfair text-3xl font-bold text-primary-900">
              Popular Routes from {city.name}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedRoutes.map((route, index) => (
                <RouteCard key={route.id} route={route} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Charter from This City */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-playfair text-3xl font-bold text-primary-900">
            Why Charter from {city.name}?
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Strategic Location',
                description: `${city.name} is a major aviation hub with excellent connectivity to destinations worldwide.`,
                icon: MapPin,
              },
              {
                title: 'Multiple Airports',
                description: `Access to ${city.airports.length} private aviation facilities for maximum flexibility.`,
                icon: Plane,
              },
              {
                title: 'Fast Service',
                description: 'Get instant quotes and book your flight within hours from one of our partners.',
                icon: Clock,
              },
              {
                title: 'Competitive Pricing',
                description: 'Compare quotes from multiple operators and get the best rates available.',
                icon: DollarSign,
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <Icon className="mb-2 h-8 w-8 text-gold-500" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="mb-12 text-center font-playfair text-3xl font-bold text-primary-900">
            Common Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: `What's the minimum charter time from ${city.name}?`,
                a: 'Typically 1 hour of flight time, though minimum billing may apply. Contact us for exact details.',
              },
              {
                q: `How far in advance should I book from ${city.name}?`,
                a: 'We can accommodate same-day bookings, but recommend 2-7 days for better aircraft selection.',
              },
              {
                q: 'Which airports can I use from ' + city.name + '?',
                a: `You can use any of our ${city.airports.length} available airports: ${city.airports.join(', ')}.`,
              },
              {
                q: 'What aircraft types are available?',
                a: 'From light jets ($2,500/hr) to heavy jets ($15,000/hr). All maintenance and crew included.',
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-950 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-playfair text-3xl font-bold">
            Ready to Charter from {city.name}?
          </h2>
          <p className="mb-8 text-lg text-primary-100">
            Get an instant quote from our partner operators and book your flight today.
          </p>
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-primary-900">
            Get Free Quote
          </Button>
        </div>
      </section>
    </>
  )
}
