import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service - KeyPrivateJet',
  description: 'Read our terms of service to understand the rules and regulations for using KeyPrivateJet services.',
  noindex: true,
})

export default function TermsPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold font-playfair text-primary-900 mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using KeyPrivateJet (&quot;the Service&quot;), you accept and agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              KeyPrivateJet is a lead generation platform that connects potential clients with FAA Part
              135 certified private jet charter operators. We do not:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Operate aircraft</li>
              <li>Provide charter services directly</li>
              <li>Act as a charter broker</li>
              <li>Guarantee availability or pricing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">When using our Service, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Provide accurate and truthful information</li>
              <li>Use the Service for lawful purposes only</li>
              <li>Not misuse or attempt to gain unauthorized access to our systems</li>
              <li>Not submit false or fraudulent quote requests</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">4. Quote Requests</h2>
            <p className="text-gray-700 mb-4">
              When you submit a quote request:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Your information will be shared with partner charter operators</li>
              <li>Operators will contact you directly with quotes and availability</li>
              <li>Quotes are estimates and may change based on various factors</li>
              <li>You are under no obligation to book a flight</li>
              <li>Final contracts are between you and the charter operator</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">5. No Guarantees</h2>
            <p className="text-gray-700">
              KeyPrivateJet makes no guarantees regarding:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-4">
              <li>Aircraft availability</li>
              <li>Pricing accuracy</li>
              <li>Response times from operators</li>
              <li>Quality of service from partner operators</li>
              <li>Successful completion of charter flights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700">
              To the maximum extent permitted by law, KeyPrivateJet shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-4">
              <li>Use or inability to use our Service</li>
              <li>Actions or omissions of partner operators</li>
              <li>Flight delays, cancellations, or incidents</li>
              <li>Loss of data or profits</li>
              <li>Any other matter relating to the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700">
              Our Service may contain links to third-party websites or services. We are not responsible
              for the content, privacy policies, or practices of third-party sites. Your interactions
              with charter operators are governed by their terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on KeyPrivateJet, including text, graphics, logos, and software, is the
              property of KeyPrivateJet or its licensors and is protected by copyright and trademark laws.
              You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">9. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend access to our Service immediately, without
              prior notice, for any reason, including breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of the United
              States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify users of any
              material changes by posting the new Terms on this page and updating the &quot;Last Updated&quot;
              date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms, please contact us:
            </p>
            <ul className="list-none mt-4 text-gray-700">
              <li>Email: {process.env.ADMIN_EMAIL}</li>
              <li>Phone: {process.env.NEXT_PUBLIC_PHONE_DISPLAY}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">13. Severability</h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be unenforceable or invalid, that provision
              shall be limited or eliminated to the minimum extent necessary, and the remaining provisions
              shall remain in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

