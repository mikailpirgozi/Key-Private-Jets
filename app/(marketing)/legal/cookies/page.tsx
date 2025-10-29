import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Cookie Policy - KeyPrivateJet',
  description: 'Learn about how KeyPrivateJet uses cookies and similar technologies on our website.',
  noindex: true,
})

export default function CookiesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold font-playfair text-primary-900 mb-8">
          Cookie Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files that are placed on your device when you visit a website.
              They help websites remember your preferences and provide a better user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              KeyPrivateJet uses cookies for the following purposes:
            </p>
            
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. They enable basic
              features like page navigation and access to secure areas.
            </p>

            <h3 className="text-xl font-semibold text-primary-900 mb-3">Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              We use Google Analytics to understand how visitors use our site. These cookies collect
              information about:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>How you arrived at our site</li>
              <li>Device and browser information</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary-900 mb-3">Marketing Cookies</h3>
            <p className="text-gray-700 mb-4">
              We use marketing cookies from services like Google Tag Manager and Facebook Pixel to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Track conversions from advertising campaigns</li>
              <li>Show relevant ads to users who have visited our site</li>
              <li>Measure the effectiveness of our marketing efforts</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">3. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use the following third-party services that may set cookies:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Google Analytics:</strong> Website analytics</li>
              <li><strong>Google Tag Manager:</strong> Tag management</li>
              <li><strong>Facebook Pixel:</strong> Advertising and analytics</li>
              <li><strong>Vercel Analytics:</strong> Performance monitoring</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These third parties have their own privacy policies governing their use of cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">4. Cookie Duration</h2>
            <p className="text-gray-700 mb-4">
              We use both session cookies (which expire when you close your browser) and persistent
              cookies (which remain on your device for a set period or until you delete them).
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Session Cookies:</strong> Expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Typically expire after 1-2 years</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">5. Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in several ways:
            </p>

            <h3 className="text-xl font-semibold text-primary-900 mb-3">Browser Settings</h3>
            <p className="text-gray-700 mb-4">
              Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>View and delete cookies</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary-900 mb-3">Opt-Out Tools</h3>
            <p className="text-gray-700 mb-4">
              You can opt out of specific tracking services:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                <strong>Google Analytics:</strong>{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
              <li>
                <strong>Facebook:</strong>{' '}
                <a
                  href="https://www.facebook.com/settings?tab=ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:underline"
                >
                  Facebook Ad Preferences
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">6. Impact of Disabling Cookies</h2>
            <p className="text-gray-700">
              If you disable cookies, some features of our website may not function properly. For
              example, we may not be able to remember your preferences or provide personalized content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">7. Do Not Track</h2>
            <p className="text-gray-700">
              Some browsers have a &quot;Do Not Track&quot; feature that signals to websites that you do not
              want to be tracked. Currently, there is no industry standard for how to respond to Do Not
              Track signals, and we do not currently respond to them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">8. Updates to This Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time. We will notify you of any changes by
              posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about our use of cookies, please contact us:
            </p>
            <ul className="list-none mt-4 text-gray-700">
              <li>Email: {process.env.ADMIN_EMAIL}</li>
              <li>Phone: {process.env.NEXT_PUBLIC_PHONE_DISPLAY}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

