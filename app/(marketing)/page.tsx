import { Hero } from '@/components/sections/hero'
import { PopularRoutes } from '@/components/sections/popular-routes'
import { AircraftCategories } from '@/components/sections/aircraft-categories'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { generateFAQSchema, generateOrganizationSchema, injectSchema } from '@/lib/schema'
import { FAQS } from '@/lib/data/faqs'

export default function Home() {
  const faqSchema = generateFAQSchema(FAQS)
  const orgSchema = generateOrganizationSchema()

  return (
    <>
      {/* Inject Schemas for SEO */}
      {injectSchema(faqSchema)}
      {injectSchema(orgSchema)}

      {/* Page Sections */}
      <Hero />
      <PopularRoutes />
      <AircraftCategories />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  )
}

