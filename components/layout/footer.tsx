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
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-playfair text-xl font-bold">
              <Plane className="h-6 w-6 text-gold-500" />
              <span>KeyPrivateJet</span>
            </Link>
            <p className="text-sm text-gray-300">
              Connecting discerning travelers with premium private jet charter operators worldwide.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="flex items-center gap-2 text-gray-300 hover:text-gold-500 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{process.env.NEXT_PUBLIC_PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${process.env.ADMIN_EMAIL}`}
                className="flex items-center gap-2 text-gray-300 hover:text-gold-500 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{process.env.ADMIN_EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-gold-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-gold-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe for exclusive empty leg deals and aviation insights.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} KeyPrivateJet. All rights reserved.
            </p>
            <div className="flex gap-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-gold-500 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
            KeyPrivateJet is a lead generation platform connecting clients with FAA Part 135
            certified charter operators. We do not operate aircraft or provide charter services
            directly.
          </p>
        </div>
      </div>
    </footer>
  )
}

