import { Metadata } from 'next'
import { SEO_CONFIG } from '@/config/seo'

interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/images/og-default.jpg',
  noindex = false,
}: PageSEOProps): Metadata {
  const fullTitle = title.includes('|') ? title : `${title} | ${SEO_CONFIG.siteName}`
  const canonicalUrl = canonical || SEO_CONFIG.siteUrl
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SEO_CONFIG.siteUrl}${ogImage}`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: SEO_CONFIG.twitterHandle,
    },
  }
}

export function generateRouteMetadata(route: {
  from: string
  to: string
  flightTime: string
  priceFrom: number
  slug: string
}): Metadata {
  const title = SEO_CONFIG.routePageTemplate.titleTemplate
    .replace('{from}', route.from)
    .replace('{to}', route.to)

  const description = SEO_CONFIG.routePageTemplate.descriptionTemplate
    .replace('{from}', route.from)
    .replace('{to}', route.to)
    .replace('{flightTime}', route.flightTime)
    .replace('{priceFrom}', `$${route.priceFrom.toLocaleString()}`)

  const keywords = SEO_CONFIG.routePageTemplate.keywords.map((kw) =>
    kw
      .replace('{from}', route.from)
      .replace('{to}', route.to)
  )

  return generatePageMetadata({
    title,
    description,
    keywords,
    canonical: `${SEO_CONFIG.siteUrl}/routes/${route.slug}`,
    ogImage: `/images/routes/${route.slug}-og.jpg`,
  })
}

export function generateCityMetadata(city: {
  name: string
  airports: string[]
  slug: string
}): Metadata {
  const title = SEO_CONFIG.cityPageTemplate.titleTemplate.replace('{city}', city.name)

  const description = SEO_CONFIG.cityPageTemplate.descriptionTemplate
    .replace('{city}', city.name)
    .replace('{airportCount}', city.airports.length.toString())

  const keywords = SEO_CONFIG.cityPageTemplate.keywords.map((kw) =>
    kw.replace('{city}', city.name)
  )

  return generatePageMetadata({
    title,
    description,
    keywords,
    canonical: `${SEO_CONFIG.siteUrl}/charter/${city.slug}`,
    ogImage: `/images/cities/${city.slug}-og.jpg`,
  })
}

export function generateAircraftMetadata(aircraft: {
  name: string
  capacity: string
  range: string
  hourlyRate: { from: number }
  slug: string
}): Metadata {
  const title = SEO_CONFIG.aircraftPageTemplate.titleTemplate.replace(
    '{category}',
    aircraft.name
  )

  const description = SEO_CONFIG.aircraftPageTemplate.descriptionTemplate
    .replace('{category}', aircraft.name)
    .replace('{capacity}', aircraft.capacity)
    .replace('{range}', aircraft.range)
    .replace('{priceFrom}', `$${aircraft.hourlyRate.from.toLocaleString()}`)

  const keywords = SEO_CONFIG.aircraftPageTemplate.keywords.map((kw) =>
    kw.replace('{category}', aircraft.name)
  )

  return generatePageMetadata({
    title,
    description,
    keywords,
    canonical: `${SEO_CONFIG.siteUrl}/aircraft/${aircraft.slug}`,
    ogImage: `/images/aircraft/${aircraft.slug}-og.jpg`,
  })
}

