import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { AIRCRAFT_CATEGORIES } from '@/lib/data/aircraft'
import { AircraftCard } from '@/components/shared/aircraft-card'

export const metadata: Metadata = generatePageMetadata({
  title: 'Private Jet Aircraft Categories - Find Your Perfect Charter',
  description: 'Explore our range of private jet aircraft from light jets to heavy jets. Find the perfect aircraft for your charter needs with detailed specs and pricing.',
  keywords: ['private jet aircraft', 'charter aircraft types', 'jet categories'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/aircraft`,
})

export default function AircraftPage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-primary-900 mb-6">
            Private Jet Aircraft Categories
          </h1>
          <p className="text-xl text-gray-600">
            Choose from our diverse fleet of private jets. From efficient light jets to luxurious
            heavy jets, we have the perfect aircraft for every journey.
          </p>
        </div>
      </section>

      {/* Aircraft Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {AIRCRAFT_CATEGORIES.map((aircraft) => (
            <AircraftCard key={aircraft.slug} aircraft={aircraft} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-16">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold font-playfair text-primary-900 mb-4">
            Not Sure Which Aircraft is Right for You?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team can help you select the perfect aircraft based on your route, passenger count,
            and budget.
          </p>
          <a
            href="/#quote"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold px-8 py-4 rounded-md transition-colors"
          >
            Get Expert Advice
          </a>
        </div>
      </section>
    </div>
  )
}

