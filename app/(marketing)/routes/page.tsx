import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { POPULAR_ROUTES } from '@/lib/data/routes'
import { RouteCard } from '@/components/shared/route-card'

export const metadata: Metadata = generatePageMetadata({
  title: 'Popular Private Jet Routes - Best Charter Flight Destinations',
  description: 'Explore our most popular private jet charter routes across the US. Get instant quotes for flights between major cities. Competitive pricing and 24/7 availability.',
  keywords: ['private jet routes', 'charter flight routes', 'popular destinations'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/routes`,
})

export default function RoutesPage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-primary-900 mb-6">
            Popular Private Jet Routes
          </h1>
          <p className="text-xl text-gray-600">
            Discover our most requested private jet charter routes. Each route features competitive
            pricing, multiple aircraft options, and 24/7 availability.
          </p>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-16">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold font-playfair text-primary-900 mb-4">
            Don&apos;t See Your Route?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We can arrange private jet charter to any destination worldwide. Get a custom quote for
            your specific route.
          </p>
          <a
            href="/#quote"
            className="inline-block bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold px-8 py-4 rounded-md transition-colors"
          >
            Get Custom Quote
          </a>
        </div>
      </section>
    </div>
  )
}

