import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ContactForm } from '@/components/forms/contact-form'
import { Mail, Phone, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
    <div className="bg-luxury-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm font-medium mb-8">
              <MessageSquare className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-2">
                Contact
              </span>
              <span className="block text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                Us
              </span>
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have questions? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you
              as soon as possible.
            </p>
          </div>
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      </section>

      {/* Contact Methods */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
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
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="luxury-card p-8 md:p-12">
              <h2 className="text-3xl font-bold font-playfair text-white text-center mb-8">
                Send Us a <span className="text-gradient-gold">Message</span>
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 relative border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-playfair text-white mb-6">
              Looking for Quick <span className="text-gradient-gold">Answers?</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Check out our FAQ page for answers to common questions about private jet charter.
            </p>
            <Link
              href="/#faq"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105"
            >
              <span>View FAQs</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
