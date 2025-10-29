import Link from 'next/link'
import { Plane, Mail, Phone } from 'lucide-react'
import { NewsletterForm } from '@/components/forms/newsletter-form'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Private Jet Charter', href: '/' },
      { name: 'Empty Leg Flights', href: '/empty-legs' },
      { name: 'Popular Routes', href: '/routes' },
      { name: 'Aircraft Categories', href: '/aircraft' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
    ],
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white border-t border-gold-500/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 font-playfair text-xl font-bold text-white hover:text-gold-400 transition-colors group">
              <Plane className="h-6 w-6 text-gold-500 group-hover:text-gold-400 transition-colors" />
              <span>KeyPrivateJet</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting discerning travelers with premium private jet charter operators worldwide.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group"
              >
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{process.env.NEXT_PUBLIC_PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${process.env.ADMIN_EMAIL}`}
                className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{process.env.ADMIN_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Subscribe for exclusive empty leg deals and aviation insights.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-500">
              © {currentYear} KeyPrivateJet. All rights reserved.
            </p>
            <div className="flex gap-8">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-gold-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-6 text-center md:text-left leading-relaxed">
            KeyPrivateJet is a lead generation platform connecting clients with FAA Part 135
            certified charter operators. We do not operate aircraft or provide charter services
            directly.
          </p>
        </div>
      </div>
    </footer>
  )
}

