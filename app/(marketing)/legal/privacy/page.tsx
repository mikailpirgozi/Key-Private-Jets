import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy - KeyPrivateJet',
  description: 'Read our privacy policy to understand how KeyPrivateJet collects, uses, and protects your personal information.',
  noindex: true,
})

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold font-playfair text-primary-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              KeyPrivateJet (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              When you request a quote or contact us, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Travel details (departure/destination cities, dates, passenger count)</li>
              <li>Any additional information you provide in messages</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary-900 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website</li>
              <li>UTM parameters and marketing campaign data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Process and respond to your quote requests</li>
              <li>Connect you with our partner charter operators</li>
              <li>Send you confirmation emails and updates</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (only if you opt-in)</li>
              <li>Comply with legal obligations</li>
              <li>Analyze website usage and trends</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                <strong>Partner Charter Operators:</strong> When you request a quote, we share your
                contact and travel details with certified operators who can fulfill your request.
              </li>
              <li>
                <strong>Service Providers:</strong> We use third-party services for email delivery
                (Resend), database hosting (Supabase), and analytics (Google Analytics, Facebook Pixel).
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required by law or
                to protect our rights.
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Track marketing campaign effectiveness</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings. Note that disabling cookies may
              affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal information for {process.env.DATA_RETENTION_DAYS || '730'} days
              (2 years) from the date of collection, unless required by law to retain it longer. After
              this period, your data is automatically deleted from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">7. Your Rights (GDPR)</h2>
            <p className="text-gray-700 mb-4">
              If you are in the European Economic Area, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, contact us at {process.env.ADMIN_EMAIL}.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">8. Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal
              information. However, no method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under 18 years of age. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy, please contact us:
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

