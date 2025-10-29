import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/forms/contact-form'
import { Mail, Phone, Clock, MessageSquare } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact KeyPrivateJet - Get in Touch with Our Team',
  description: 'Have questions about private jet charter? Contact KeyPrivateJet 24/7. Call us, email us, or fill out our contact form for a quick response.',
  keywords: ['contact keyprivatejet', 'private jet charter contact', 'aviation support'],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
})

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      value: process.env.NEXT_PUBLIC_PHONE_DISPLAY,
      link: `tel:${process.env.NEXT_PUBLIC_PHONE}`,
      description: 'Call us anytime, 24/7',
    },
    {
      icon: Mail,
      title: 'Email',
      value: process.env.ADMIN_EMAIL,
      link: `mailto:${process.env.ADMIN_EMAIL}`,
      description: 'We respond within 24 hours',
    },
    {
      icon: Clock,
      title: 'Availability',
      value: '24/7/365',
      description: 'Always here when you need us',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-8">
            <MessageSquare className="h-4 w-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-playfair text-white mb-6">
            Contact <span className="text-gradient-gold">Us</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <div className="w-2 h-2 bg-gold-500 rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <p className="text-xl text-gray-400 leading-relaxed">
            Have questions? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you
            as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method) => (
            <div key={method.title} className="luxury-card p-8 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gold-500/10 border-2 border-gold-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-400/60 group-hover:scale-110 transition-all duration-300">
                  <method.icon className="h-10 w-10 text-gold-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                  {method.title}
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent w-full mb-3" />
                {method.link ? (
                  <a
                    href={method.link}
                    className="text-gold-400 hover:text-gold-300 font-medium mb-2 transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-gold-400 font-medium mb-2">{method.value}</p>
                )}
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-2xl mx-auto">
          <div className="luxury-card p-8 md:p-12">
            <h2 className="text-3xl font-bold font-playfair text-white text-center mb-8">
              Send Us a <span className="text-gradient-gold">Message</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="bg-gradient-to-b from-gray-950 to-gray-900 border-t border-gold-500/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-playfair text-white mb-6">
              Looking for Quick <span className="text-gradient-gold">Answers?</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Check out our FAQ page for answers to common questions about private jet charter.
            </p>
            <a
              href="/#faq"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-gold-500/50"
            >
              View FAQs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
