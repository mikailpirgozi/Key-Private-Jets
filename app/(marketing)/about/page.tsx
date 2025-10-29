import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Plane, Shield, Clock, Award, Globe } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'About KeyPrivateJet - Your Trusted Private Aviation Partner',
  description: 'Learn about KeyPrivateJet, the leading platform connecting discerning travelers with premium private jet charter operators worldwide. Safe, reliable, and luxurious.',
  keywords: ['about keyprivatejet', 'private jet charter company', 'luxury aviation'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
})

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All partner operators are FAA Part 135 certified with rigorous safety standards and experienced crews.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We partner only with top-tier charter operators known for exceptional service and well-maintained aircraft.',
    },
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Get competitive quotes within 2-4 hours. Our partners understand that your time is valuable.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to 5,000+ airports worldwide and a diverse fleet from light jets to ultra-long-range aircraft.',
    },
  ]

  const stats = [
    { number: '500+', label: 'Successful Charters' },
    { number: '50+', label: 'Partner Operators' },
    { number: '24/7', label: 'Availability' },
    { number: '98%', label: 'Client Satisfaction' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-8">
            <Plane className="h-4 w-4" />
            <span>About Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
            About <span className="text-gradient-gold">KeyPrivateJet</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <p className="text-xl text-gray-400 leading-relaxed">
            We connect discerning travelers with the world&apos;s finest private jet charter operators,
            ensuring every journey is safe, comfortable, and unforgettable.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-y border-gold-500/20 py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold font-playfair text-gradient-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold font-playfair text-white mb-8 text-center">
            Our <span className="text-gradient-gold">Story</span>
          </h2>
          <div className="luxury-card p-8 md:p-12">
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                KeyPrivateJet was founded with a simple mission: to make private aviation accessible,
                transparent, and hassle-free. We recognized that booking a private jet shouldn&apos;t be
                complicated or time-consuming.
              </p>
              <p>
                Our platform connects you directly with certified charter operators, eliminating
                middlemen and ensuring you get the best rates and service. We carefully vet each
                partner to guarantee safety, reliability, and exceptional customer experience.
              </p>
              <p>
                Whether you&apos;re flying for business or pleasure, domestically or internationally,
                KeyPrivateJet makes it easy to find the perfect aircraft for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-4xl font-bold font-playfair text-white mb-12 text-center">
          Our <span className="text-gradient-gold">Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="luxury-card p-8 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gold-500/10 border-2 border-gold-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-400/60 group-hover:scale-110 transition-all duration-300">
                  <value.icon className="h-10 w-10 text-gold-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                  {value.title}
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent w-full mb-3" />
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-gradient-to-b from-gray-950 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold font-playfair text-white mb-12 text-center">
              How We <span className="text-gradient-gold">Work</span>
            </h2>
            <div className="space-y-8">
              <div className="luxury-card p-6 flex gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    You Submit Your Request
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Tell us your travel details - where you&apos;re going, when, and how many passengers.
                  </p>
                </div>
              </div>

              <div className="luxury-card p-6 flex gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    We Connect You with Operators
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your request is sent to our network of certified charter operators who compete to offer you the best rates.
                  </p>
                </div>
              </div>

              <div className="luxury-card p-6 flex gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center text-gray-900 font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    You Choose & Fly
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Review quotes, select your preferred option, and prepare for an exceptional flight experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-playfair text-white mb-8">
            Why Choose <span className="text-gradient-gold">KeyPrivateJet</span>
          </h2>
          <div className="luxury-card p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-gold-500 rounded-full mt-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Transparent Pricing</h3>
                  <p className="text-gray-400">No hidden fees. What you see is what you pay.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-gold-500 rounded-full mt-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Vetted Operators</h3>
                  <p className="text-gray-400">All partners are FAA Part 135 certified.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-gold-500 rounded-full mt-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
                  <p className="text-gray-400">Our team is available whenever you need us.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-gold-500 rounded-full mt-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Best Rates</h3>
                  <p className="text-gray-400">Competitive pricing from multiple operators.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
