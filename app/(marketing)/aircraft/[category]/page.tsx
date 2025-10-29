import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateAircraftMetadata } from '@/lib/seo'
import { getAircraftBySlug, AIRCRAFT_CATEGORIES } from '@/lib/data/aircraft'
import { QuoteForm } from '@/components/forms/quote-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, MapPin, Gauge, Clock, CheckCircle2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface AircraftPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return AIRCRAFT_CATEGORIES.map((aircraft) => ({
    category: aircraft.slug,
  }))
}

export async function generateMetadata({ params }: AircraftPageProps): Promise<Metadata> {
  const aircraft = getAircraftBySlug(params.category)
  
  if (!aircraft) {
    return {
      title: 'Aircraft Not Found',
    }
  }

  return generateAircraftMetadata(aircraft)
}

export default function AircraftCategoryPage({ params }: AircraftPageProps) {
  const aircraft = getAircraftBySlug(params.category)

  if (!aircraft) {
    notFound()
  }

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-gold-500 text-primary-900">
            {aircraft.capacity}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-primary-900 mb-6">
            {aircraft.name} Charter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {aircraft.description}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gold-500" />
              <span>{aircraft.capacity}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gold-500" />
              <span>{aircraft.range}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-gold-500" />
              <span>{aircraft.speed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold-500" />
              <span>{formatCurrency(aircraft.hourlyRate.from)}/hr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Aircraft Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-gold-500" />
                      <h3 className="font-semibold text-primary-900">Passenger Capacity</h3>
                    </div>
                    <p className="text-gray-700">{aircraft.capacity}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-gold-500" />
                      <h3 className="font-semibold text-primary-900">Range</h3>
                    </div>
                    <p className="text-gray-700">{aircraft.range}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="h-5 w-5 text-gold-500" />
                      <h3 className="font-semibold text-primary-900">Cruise Speed</h3>
                    </div>
                    <p className="text-gray-700">{aircraft.speed}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-gold-500" />
                      <h3 className="font-semibold text-primary-900">Hourly Rate</h3>
                    </div>
                    <p className="text-gray-700">
                      {formatCurrency(aircraft.hourlyRate.from)} - {formatCurrency(aircraft.hourlyRate.to)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Models */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Popular Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aircraft.models.map((model) => (
                    <div key={model} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                      <span className="text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {aircraft.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Ideal For */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-playfair">Ideal For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aircraft.idealFor.map((use) => (
                    <div key={use} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                      <span className="text-gray-700">{use}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quote Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuoteForm aircraft_preference={aircraft.category} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-playfair mb-4">
              Ready to Charter a {aircraft.name}?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get competitive quotes from certified operators. Book your flight with confidence.
            </p>
            <a
              href="#quote"
              className="inline-block bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

