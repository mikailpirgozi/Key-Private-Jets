import { Hero } from '@/components/sections/hero'
import { PopularRoutes } from '@/components/sections/popular-routes'
import { AircraftCategories } from '@/components/sections/aircraft-categories'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { generateFAQSchema, generateOrganizationSchema, injectSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { FAQS } from '@/lib/data/faqs'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Private Jet Charter - Instant Quotes from Top Operators | KeyPrivateJet',
  description: 'Charter a private jet with KeyPrivateJet. Get instant quotes from top operators. Light jets from $2,500/hr. Available 24/7. Fast booking. Book now!',
  keywords: ['private jet charter', 'charter private jet', 'private jet rental', 'luxury jet charter', 'executive jet charter', 'affordable private jet charter', 'instant jet quote'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com'}`,
  ogImage: '/images/og-homepage.jpg',
})

export default function Home() {
  const faqSchema = generateFAQSchema(FAQS)
  const orgSchema = generateOrganizationSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
  ])

  return (
    <>
      {/* Inject Schemas */}
      {injectSchema(faqSchema)}
      {injectSchema(orgSchema)}
      {injectSchema(breadcrumbSchema)}

      {/* Page Sections */}
      <Hero />
      <PopularRoutes />
      <AircraftCategories />
      <HowItWorks />
      <WhyChooseUs />
      <ComparisonSection />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}

function WhyChooseUs() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-center text-white mb-4">
            Why Choose <span className="text-gradient-gold">KeyPrivateJet?</span>
          </h2>
          <p className="text-center text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
            Experience premium private jet charter with exceptional service, competitive pricing, and 24/7 availability
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Instant Quotes',
                description: 'Get real-time pricing from multiple operators and book within minutes',
                icon: '⚡',
              },
              {
                title: 'Best Rates',
                description: 'Compare prices from top operators and save up to 40% on charter costs',
                icon: '💰',
              },
              {
                title: '24/7 Availability',
                description: 'Book flights anytime, day or night. Same-day departures available',
                icon: '🌙',
              },
              {
                title: 'Expert Service',
                description: 'Our aviation experts help you choose the perfect aircraft for your needs',
                icon: '👨‍✈️',
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees. All costs included: crew, fuel, maintenance, and taxes',
                icon: '✓',
              },
              {
                title: 'Flexible Options',
                description: 'From light jets to heavy jets, luxury to economy - find your match',
                icon: '🛩️',
              },
              {
                title: 'Time Savings',
                description: 'Skip security lines, arrive 15 min before departure, save 4+ hours',
                icon: '⏱️',
              },
              {
                title: 'Premium Privacy',
                description: 'Exclusive use of aircraft. No commercial passengers. Complete privacy',
                icon: '🔒',
              },
            ].map((item, idx) => (
              <div key={idx} className="luxury-card p-6 group hover:border-gold-400/50 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ComparisonSection() {
  return (
    <section className="py-20 relative border-y border-gold-500/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold font-playfair text-center text-white mb-4">
            Private Jet vs <span className="text-gradient-gold">Commercial Flights</span>
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            See why more executives and travelers choose private jet charter for flexibility, time, and luxury
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-gold-500/20">
                  <th className="text-left py-4 px-4 text-white font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 text-gold-400 font-semibold">Private Jet</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-semibold">Commercial</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Departure Time', jet: 'Your schedule', commercial: 'Fixed schedule' },
                  { feature: 'Security Check', jet: '15 minutes', commercial: '2-3 hours' },
                  { feature: 'Airport Arrival', jet: '15 minutes before', commercial: '2-3 hours before' },
                  { feature: 'Baggage Limits', jet: 'Unlimited', commercial: 'Weight/count limits' },
                  { feature: 'Pet Policy', jet: 'Allowed', commercial: 'Restrictions' },
                  { feature: 'Privacy', jet: '100% exclusive', commercial: 'Public cabin' },
                  { feature: 'Price per Hour', jet: '$2,500-$15,000', commercial: 'Per ticket $100-$500' },
                  { feature: 'Best For', jet: 'Groups, executives', commercial: 'Budget travelers' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gold-500/10">
                    <td className="py-4 px-4 text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gold-400">✓ {row.jet}</td>
                    <td className="py-4 px-4 text-center text-gray-500">✗ {row.commercial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-blue-500/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-6">
            Ready to Charter a <span className="text-gradient-gold">Private Jet?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Get an instant quote today. Our aviation experts are available 24/7 to help you book the perfect flight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#quote" className="px-8 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105">
              Get Instant Quote
            </a>
            <a href="/contact" className="px-8 py-4 border border-gold-500/50 text-gold-400 font-semibold rounded-lg hover:bg-gold-500/10 transition-colors duration-300">
              Contact Us
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            ✓ No credit card required • ✓ Response within 1 hour • ✓ 24/7 support
          </p>
        </div>
      </div>
    </section>
  )
}

