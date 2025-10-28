# KeyPrivateJet.com - Complete Implementation Plan for Cursor AI

## 🎯 IMPLEMENTATION STRATEGY

This is a step-by-step guide for Cursor AI to build the entire KeyPrivateJet.com platform. Follow each phase sequentially, ensuring all components are production-ready before moving to the next phase.

**IMPORTANT NOTES:**
- All content must be in **English** (US market)
- Use **pnpm** as package manager (NOT npm/yarn)
- TypeScript strict mode enabled
- Zero tolerance for errors/warnings
- Port 3000 for development server
- **SEO-first approach** - every page optimized from day 1

---

## PHASE 0: SEO FOUNDATION & PLANNING (Before Development)

### Step 0.1: Review SEO Strategy Documents

**Required Reading:**
1. `docs/SEO_STRATEGY.md` - Complete SEO strategy
2. `docs/KEYWORDS_RESEARCH.md` - Detailed keyword mapping

**Key Takeaways:**
- Target 500+ keywords by month 6
- Focus on long-tail, high-intent keywords first
- Every page must have unique meta tags and schema markup
- Mobile-first, fast-loading pages (< 3s)

### Step 0.2: Create SEO Configuration File

Create `config/seo.ts`:

```typescript
export const SEO_CONFIG = {
  siteName: 'KeyPrivateJet',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com',
  defaultTitle: 'Private Jet Charter - Instant Quotes | KeyPrivateJet',
  defaultDescription: 'Charter a private jet with KeyPrivateJet. Get instant quotes from top operators. Light jets from $2,500/hr. Available 24/7. Book now!',
  twitterHandle: '@keyprivatejet',
  
  // Primary keywords for homepage
  primaryKeywords: [
    'private jet charter',
    'charter private jet',
    'private jet rental',
    'luxury jet charter',
    'executive jet charter',
  ],
  
  // Route page template
  routePageTemplate: {
    titleTemplate: 'Private Jet Charter {from} to {to} - Instant Quotes | KeyPrivateJet',
    descriptionTemplate: 'Charter a private jet from {from} to {to}. Flight time {flightTime}. Prices from {priceFrom}. Get instant quotes from top operators.',
    keywords: [
      'private jet {from} to {to}',
      'charter flight {from} to {to}',
      'private plane {from} {to}',
    ],
  },
  
  // City page template
  cityPageTemplate: {
    titleTemplate: 'Private Jet Charter in {city} - Best Rates | KeyPrivateJet',
    descriptionTemplate: 'Charter a private jet in {city}. Access to {airportCount}+ airports. Instant quotes from top operators. Available 24/7.',
    keywords: [
      'private jet charter {city}',
      'private jet rental {city}',
      'charter jet {city}',
    ],
  },
  
  // Aircraft page template
  aircraftPageTemplate: {
    titleTemplate: '{category} Charter - Pricing & Aircraft | KeyPrivateJet',
    descriptionTemplate: 'Charter a {category}. Capacity: {capacity}. Range: {range}. Hourly rates from {priceFrom}. Get instant quotes.',
    keywords: [
      '{category} charter',
      '{category} rental',
      '{category} private jet',
    ],
  },
}
```

### Step 0.3: Create SEO Utility Functions

Create `lib/seo.ts`:

```typescript
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
```

### Step 0.4: Create Schema Markup Utilities

Create `lib/schema.ts`:

```typescript
import { Organization, FAQPage, BreadcrumbList, Product, WithContext } from 'schema-dts'

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KeyPrivateJet',
    url: 'https://keyprivatejet.com',
    logo: 'https://keyprivatejet.com/logo.png',
    description: 'Premium private jet charter connecting clients with top operators',
    telephone: process.env.NEXT_PUBLIC_PHONE,
    email: process.env.ADMIN_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/keyprivatejet',
      'https://www.linkedin.com/company/keyprivatejet',
      'https://twitter.com/keyprivatejet',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '247',
    },
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  priceFrom: number
  priceTo: number
}): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: product.priceFrom.toString(),
      highPrice: product.priceTo.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '89',
    },
  }
}

// Helper to inject schema into page
export function injectSchema(schema: WithContext<any>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Step 0.5: Create Sitemap Generation

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'
import { MAJOR_CITIES } from '@/lib/data/cities'
import { POPULAR_ROUTES } from '@/lib/data/routes'
import { AIRCRAFT_CATEGORIES } from '@/lib/data/aircraft'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/empty-legs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Route pages
  const routePages = POPULAR_ROUTES.map((route) => ({
    url: `${baseUrl}/routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // City pages
  const cityPages = MAJOR_CITIES.map((city) => ({
    url: `${baseUrl}/charter/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Aircraft pages
  const aircraftPages = AIRCRAFT_CATEGORIES.map((aircraft) => ({
    url: `${baseUrl}/aircraft/${aircraft.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...routePages, ...cityPages, ...aircraftPages]
}
```

Create `app/robots.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### Step 0.6: SEO Checklist for Every Page

Create `docs/SEO_CHECKLIST.md`:

```markdown
# SEO Checklist - Use for Every Page

## Pre-Launch Checklist

### Meta Tags
- [ ] Unique H1 with primary keyword
- [ ] Primary keyword in first 100 words
- [ ] Meta title (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Keywords meta tag
- [ ] Canonical URL
- [ ] Open Graph tags (title, description, image, url)
- [ ] Twitter Card tags

### Content
- [ ] Word count: 1,500+ words (homepage, routes, cities)
- [ ] Keyword density: 1-2% for primary keyword
- [ ] Secondary keywords in H2/H3 headings
- [ ] LSI keywords naturally placed
- [ ] Internal links (5-10 per page)
- [ ] External links to authoritative sources
- [ ] Images with alt text (include keywords)
- [ ] Readability score: 60+ (Flesch)

### Technical
- [ ] URL is clean and keyword-rich
- [ ] Schema markup implemented
- [ ] Breadcrumbs visible and in schema
- [ ] Mobile responsive
- [ ] Page speed < 3s
- [ ] No broken links
- [ ] Images optimized (< 200KB)
- [ ] Lazy loading for below-fold images

### User Experience
- [ ] Clear CTA above the fold
- [ ] Easy navigation
- [ ] Contact info visible
- [ ] Trust signals (testimonials, badges)
- [ ] FAQ section (with schema)
- [ ] Related content links
```

---

## PHASE 1: PROJECT SETUP & FOUNDATION (Day 1)

### Step 1.1: Initialize Next.js Project

```bash
pnpm create next-app@latest keyprivatejet --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd keyprivatejet
```

### Step 1.2: Install Core Dependencies

```bash
# Core packages
pnpm add @supabase/supabase-js resend react-hook-form @hookform/resolvers zod date-fns lucide-react @vercel/analytics @sentry/nextjs class-variance-authority clsx tailwind-merge tailwindcss-animate

# Dev dependencies
pnpm add -D prettier prettier-plugin-tailwindcss @types/node @types/react @types/react-dom
```

### Step 1.3: Install Shadcn/ui Components

```bash
# Initialize Shadcn
pnpm dlx shadcn@latest init

# Answer prompts:
# Style: Default
# Base color: Slate
# CSS variables: Yes

# Install all required components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add calendar
pnpm dlx shadcn@latest add popover
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add sheet
pnpm dlx shadcn@latest add separator
pnpm dlx shadcn@latest add badge
pnpm dlx shadcn@latest add avatar
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add label
```

### Step 1.4: Configure TypeScript (Strict Mode)

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    },
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 1.5: Configure Prettier

Create `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Create `.prettierignore`:

```
node_modules
.next
out
dist
build
*.lock
package-lock.json
pnpm-lock.yaml
```

### Step 1.6: Configure Fonts

Create `app/fonts.ts`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
})
```

### Step 1.7: Update Tailwind Config

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: '#F5F7FA',
          100: '#E8EDF5',
          200: '#D1DBEA',
          300: '#A9BDD9',
          400: '#7A97C1',
          500: '#5576AA',
          600: '#3E5A8F',
          700: '#334975',
          800: '#2C3D61',
          900: '#0A2540',
          950: '#061628',
          DEFAULT: '#0A2540',
          foreground: '#FFFFFF',
        },
        gold: {
          50: '#FEFAED',
          100: '#FDF3D5',
          200: '#FBE6AA',
          300: '#F8D574',
          400: '#F5C13C',
          500: '#D4AF37',
          600: '#C9A030',
          700: '#A78628',
          800: '#896D25',
          900: '#715822',
          950: '#3F2F0F',
          DEFAULT: '#D4AF37',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### Step 1.8: Update Root Layout

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from "next"
import { inter, playfair } from "./fonts"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: "KeyPrivateJet - Luxury Private Jet Charter",
  description: "Connect with premium private jet charter operators. Instant quotes, best rates, 24/7 service.",
  keywords: ["private jet", "charter", "luxury travel", "private aviation"],
  authors: [{ name: "KeyPrivateJet" }],
  openGraph: {
    title: "KeyPrivateJet - Luxury Private Jet Charter",
    description: "Connect with premium private jet charter operators",
    url: "https://keyprivatejet.com",
    siteName: "KeyPrivateJet",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyPrivateJet - Luxury Private Jet Charter",
    description: "Connect with premium private jet charter operators",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Step 1.9: Create Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=re_your_api_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="KeyPrivateJet"
NODE_ENV=development

# Email
ADMIN_EMAIL=info@keyprivatejet.com
ADMIN_NAME="KeyPrivateJet Team"

# Affiliate Partners
VILLIERS_EMAIL=leads@villiersjets.com
VILLIERS_REFERRAL_CODE=KPJ-VILLIERS-2025
JETTLY_EMAIL=affiliates@jettly.com
JETTLY_REFERRAL_CODE=KPJ-JETTLY-2025
NUCO_EMAIL=charter@nucojets.com
NUCO_REFERRAL_CODE=KPJ-NUCO-2025

# Phone
NEXT_PUBLIC_PHONE=+18555558888
NEXT_PUBLIC_PHONE_DISPLAY="(855) 555-8888"

# Analytics (leave empty for now, add later)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_FB_PIXEL_ID=

# Sentry (leave empty for now, add later)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000

# GDPR
DATA_RETENTION_DAYS=730
COOKIE_CONSENT_REQUIRED=true
```

Create `.env.example` (copy from above with placeholder values)

### Step 1.10: Create Folder Structure

```bash
mkdir -p app/\(marketing\)/{about,contact,empty-legs,routes/\[route\],charter/\[city\],aircraft/\[category\]}
mkdir -p app/api/{lead,contact,newsletter}
mkdir -p app/legal/{privacy,terms,cookies}
mkdir -p components/{ui,sections,forms,layout,shared}
mkdir -p lib/{supabase,email/templates,data}
mkdir -p types
mkdir -p config
mkdir -p hooks
mkdir -p public/{images/{jets,cities,hero,logos},videos,favicon}
mkdir -p supabase/migrations
mkdir -p docs
```

### Step 1.11: Setup Sentry (Error Monitoring)

```bash
pnpm dlx @sentry/wizard@latest -i nextjs
```

Follow wizard prompts and update `.env.local` with Sentry DSN.

---

## PHASE 2: DATA LAYER SETUP (Day 1-2)

### Step 2.1: Create TypeScript Types

Create `types/index.ts`:

```typescript
export interface City {
  code: string
  name: string
  state: string
  region: string
  airports: string[]
  description: string
  slug: string
}

export interface Route {
  id: string
  from: string // city code
  to: string // city code
  distance: number // in miles
  flightTime: string // e.g., "2h 30m"
  slug: string // e.g., "new-york-to-miami"
  pricing: {
    lightJet: { from: number; to: number }
    midsizeJet: { from: number; to: number }
    superMidsize: { from: number; to: number }
    heavyJet: { from: number; to: number }
  }
  popular: boolean
}

export interface Aircraft {
  category: 'light-jets' | 'midsize-jets' | 'super-midsize-jets' | 'heavy-jets'
  name: string
  models: string[]
  capacity: string // e.g., "4-7 passengers"
  range: string // e.g., "1,500 miles"
  speed: string // e.g., "450 mph"
  hourlyRate: { from: number; to: number }
  features: string[]
  idealFor: string[]
  description: string
  slug: string
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  from_city: string
  to_city: string
  date: Date
  passengers: number
  aircraft_preference?: string
  message?: string
  gdpr_consent?: boolean
  marketing_consent?: boolean
}

export interface Lead extends LeadFormData {
  id: string
  created_at: string
  updated_at: string
  source?: string
  utm_campaign?: string
  utm_medium?: string
  utm_source?: string
  utm_content?: string
  utm_term?: string
  landing_page?: string
  affiliate_partner: 'villiers' | 'jettly' | 'nuco'
  referral_code?: string
  commission_status: 'pending' | 'confirmed' | 'paid' | 'cancelled'
  commission_amount?: number
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'lost'
  lead_score?: number
  lead_quality?: 'hot' | 'warm' | 'cold'
  ip_address?: string
  user_agent?: string
  device_type?: 'mobile' | 'tablet' | 'desktop'
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterFormData {
  email: string
}
```

### Step 2.2: Create City Data

Create `lib/data/cities.ts`:

```typescript
import { City } from '@/types'

export const MAJOR_CITIES: City[] = [
  {
    code: 'NYC',
    name: 'New York',
    state: 'NY',
    region: 'Northeast',
    airports: ['Teterboro (TEB)', 'Westchester County (HPN)', 'Republic (FRG)'],
    description: 'The financial capital and most iconic city in America',
    slug: 'new-york',
  },
  {
    code: 'LAX',
    name: 'Los Angeles',
    state: 'CA',
    region: 'West Coast',
    airports: ['Van Nuys (VNY)', 'Burbank (BUR)', 'Long Beach (LGB)'],
    description: 'Entertainment capital and gateway to Southern California',
    slug: 'los-angeles',
  },
  {
    code: 'MIA',
    name: 'Miami',
    state: 'FL',
    region: 'Southeast',
    airports: ['Opa-Locka (OPF)', 'Miami-Opa Locka Executive (OPF)', 'Fort Lauderdale Executive (FXE)'],
    description: 'Gateway to Latin America and tropical paradise',
    slug: 'miami',
  },
  {
    code: 'LAS',
    name: 'Las Vegas',
    state: 'NV',
    region: 'Southwest',
    airports: ['Henderson Executive (HND)', 'North Las Vegas (VGT)'],
    description: 'Entertainment capital of the world',
    slug: 'las-vegas',
  },
  {
    code: 'CHI',
    name: 'Chicago',
    state: 'IL',
    region: 'Midwest',
    airports: ['Chicago Executive (PWK)', 'DuPage (DPA)', 'Gary/Chicago (GYY)'],
    description: 'Major business hub in the Midwest',
    slug: 'chicago',
  },
  {
    code: 'DAL',
    name: 'Dallas',
    state: 'TX',
    region: 'South',
    airports: ['Dallas Love Field (DAL)', 'Addison (ADS)'],
    description: 'Business center of Texas',
    slug: 'dallas',
  },
  {
    code: 'HOU',
    name: 'Houston',
    state: 'TX',
    region: 'South',
    airports: ['Houston Hobby (HOU)', 'Sugar Land Regional (SGR)'],
    description: 'Energy capital of the world',
    slug: 'houston',
  },
  {
    code: 'SFO',
    name: 'San Francisco',
    state: 'CA',
    region: 'West Coast',
    airports: ['San Carlos (SQL)', 'Hayward Executive (HWD)', 'Oakland (OAK)'],
    description: 'Tech hub and gateway to Northern California',
    slug: 'san-francisco',
  },
  {
    code: 'BOS',
    name: 'Boston',
    state: 'MA',
    region: 'Northeast',
    airports: ['Hanscom Field (BED)', 'Norwood Memorial (OWD)'],
    description: 'Historic city and education center',
    slug: 'boston',
  },
  {
    code: 'ATL',
    name: 'Atlanta',
    state: 'GA',
    region: 'Southeast',
    airports: ['Fulton County (FTY)', 'DeKalb-Peachtree (PDK)'],
    description: 'Business hub of the Southeast',
    slug: 'atlanta',
  },
  {
    code: 'DEN',
    name: 'Denver',
    state: 'CO',
    region: 'Mountain West',
    airports: ['Rocky Mountain Metropolitan (BJC)', 'Centennial (APA)'],
    description: 'Gateway to the Rocky Mountains',
    slug: 'denver',
  },
  {
    code: 'PHX',
    name: 'Phoenix',
    state: 'AZ',
    region: 'Southwest',
    airports: ['Scottsdale (SDL)', 'Deer Valley (DVT)'],
    description: 'Desert metropolis and winter destination',
    slug: 'phoenix',
  },
  {
    code: 'SEA',
    name: 'Seattle',
    state: 'WA',
    region: 'Pacific Northwest',
    airports: ['Boeing Field (BFI)', 'Paine Field (PAE)'],
    description: 'Tech hub of the Pacific Northwest',
    slug: 'seattle',
  },
  {
    code: 'WAS',
    name: 'Washington DC',
    state: 'DC',
    region: 'Mid-Atlantic',
    airports: ['Reagan National (DCA)', 'Dulles (IAD)', 'Manassas Regional (HEF)'],
    description: "Nation's capital",
    slug: 'washington-dc',
  },
  {
    code: 'PHI',
    name: 'Philadelphia',
    state: 'PA',
    region: 'Mid-Atlantic',
    airports: ['Northeast Philadelphia (PNE)', 'Wings Field (LOM)'],
    description: 'Historic city and business center',
    slug: 'philadelphia',
  },
  {
    code: 'SAN',
    name: 'San Diego',
    state: 'CA',
    region: 'West Coast',
    airports: ['Montgomery-Gibbs Executive (MYF)', 'Carlsbad (CLD)'],
    description: 'Southern California coastal paradise',
    slug: 'san-diego',
  },
  {
    code: 'AUS',
    name: 'Austin',
    state: 'TX',
    region: 'South',
    airports: ['Austin-Bergstrom (AUS)', 'Austin Executive (EDC)'],
    description: 'Tech hub and cultural hotspot',
    slug: 'austin',
  },
  {
    code: 'CHA',
    name: 'Charlotte',
    state: 'NC',
    region: 'Southeast',
    airports: ['Charlotte Douglas (CLT)', 'Concord Regional (JQF)'],
    description: 'Banking center of the South',
    slug: 'charlotte',
  },
  {
    code: 'NAS',
    name: 'Nashville',
    state: 'TN',
    region: 'South',
    airports: ['Nashville International (BNA)', 'John C. Tune (JWN)'],
    description: 'Music City and growing business hub',
    slug: 'nashville',
  },
  {
    code: 'ORL',
    name: 'Orlando',
    state: 'FL',
    region: 'Southeast',
    airports: ['Orlando Executive (ORL)', 'Kissimmee Gateway (ISM)'],
    description: 'Theme park capital and vacation destination',
    slug: 'orlando',
  },
]

export function getCityByCode(code: string): City | undefined {
  return MAJOR_CITIES.find(city => city.code === code)
}

export function getCityBySlug(slug: string): City | undefined {
  return MAJOR_CITIES.find(city => city.slug === slug)
}
```

### Step 2.3: Create Route Data

Create `lib/data/routes.ts`:

```typescript
import { Route } from '@/types'

export const POPULAR_ROUTES: Route[] = [
  {
    id: '1',
    from: 'NYC',
    to: 'MIA',
    distance: 1280,
    flightTime: '2h 45m',
    slug: 'new-york-to-miami',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 28000, to: 35000 },
    },
    popular: true,
  },
  {
    id: '2',
    from: 'LAX',
    to: 'LAS',
    distance: 270,
    flightTime: '1h 10m',
    slug: 'los-angeles-to-las-vegas',
    pricing: {
      lightJet: { from: 3500, to: 5000 },
      midsizeJet: { from: 5500, to: 7500 },
      superMidsize: { from: 7500, to: 9500 },
      heavyJet: { from: 10000, to: 13000 },
    },
    popular: true,
  },
  {
    id: '3',
    from: 'NYC',
    to: 'LAX',
    distance: 2475,
    flightTime: '5h 30m',
    slug: 'new-york-to-los-angeles',
    pricing: {
      lightJet: { from: 25000, to: 32000 },
      midsizeJet: { from: 35000, to: 42000 },
      superMidsize: { from: 42000, to: 52000 },
      heavyJet: { from: 55000, to: 70000 },
    },
    popular: true,
  },
  {
    id: '4',
    from: 'CHI',
    to: 'NYC',
    distance: 740,
    flightTime: '2h 0m',
    slug: 'chicago-to-new-york',
    pricing: {
      lightJet: { from: 8000, to: 11000 },
      midsizeJet: { from: 12000, to: 15000 },
      superMidsize: { from: 16000, to: 20000 },
      heavyJet: { from: 22000, to: 28000 },
    },
    popular: true,
  },
  {
    id: '5',
    from: 'DAL',
    to: 'LAX',
    distance: 1240,
    flightTime: '2h 50m',
    slug: 'dallas-to-los-angeles',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 27000, to: 34000 },
    },
    popular: true,
  },
  {
    id: '6',
    from: 'MIA',
    to: 'NYC',
    distance: 1280,
    flightTime: '2h 50m',
    slug: 'miami-to-new-york',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 28000, to: 35000 },
    },
    popular: true,
  },
  {
    id: '7',
    from: 'SFO',
    to: 'LAX',
    distance: 340,
    flightTime: '1h 20m',
    slug: 'san-francisco-to-los-angeles',
    pricing: {
      lightJet: { from: 4500, to: 6000 },
      midsizeJet: { from: 6500, to: 8500 },
      superMidsize: { from: 9000, to: 11000 },
      heavyJet: { from: 12000, to: 15000 },
    },
    popular: true,
  },
  {
    id: '8',
    from: 'BOS',
    to: 'MIA',
    distance: 1260,
    flightTime: '3h 0m',
    slug: 'boston-to-miami',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 27000, to: 34000 },
    },
    popular: true,
  },
]

export function getRouteBySlug(slug: string): Route | undefined {
  return POPULAR_ROUTES.find(route => route.slug === slug)
}

export function getRoutesBetweenCities(from: string, to: string): Route | undefined {
  return POPULAR_ROUTES.find(route => 
    (route.from === from && route.to === to) ||
    (route.from === to && route.to === from)
  )
}

export function getPopularRoutes(limit: number = 8): Route[] {
  return POPULAR_ROUTES.filter(route => route.popular).slice(0, limit)
}
```

### Step 2.4: Create Aircraft Data

Create `lib/data/aircraft.ts`:

```typescript
import { Aircraft } from '@/types'

export const AIRCRAFT_CATEGORIES: Aircraft[] = [
  {
    category: 'light-jets',
    name: 'Light Jets',
    models: ['Cessna Citation CJ3', 'Learjet 45', 'Phenom 300', 'Citation M2'],
    capacity: '4-7 passengers',
    range: '1,500-2,000 miles',
    speed: '400-450 mph',
    hourlyRate: { from: 2500, to: 4000 },
    features: [
      'Perfect for short to medium flights',
      'Cost-effective option',
      'Access to smaller airports',
      'Ideal for business travelers',
    ],
    idealFor: [
      'Regional business trips',
      'Weekend getaways',
      'Small groups',
      'Budget-conscious travelers',
    ],
    description: 'Light jets offer the perfect balance of comfort and economy for short to medium-range flights. Ideal for 4-7 passengers traveling regionally.',
    slug: 'light-jets',
  },
  {
    category: 'midsize-jets',
    name: 'Midsize Jets',
    models: ['Citation XLS', 'Hawker 900XP', 'Learjet 60', 'Citation Sovereign'],
    capacity: '6-8 passengers',
    range: '2,000-3,000 miles',
    speed: '450-500 mph',
    hourlyRate: { from: 4000, to: 6000 },
    features: [
      'Stand-up cabin',
      'Full galley',
      'Enclosed lavatory',
      'Cross-country capability',
    ],
    idealFor: [
      'Coast-to-coast flights',
      'Business groups',
      'Family vacations',
      'Extended trips',
    ],
    description: 'Midsize jets are the most popular choice worldwide, offering the best price-to-comfort ratio with stand-up cabins and transcontinental range.',
    slug: 'midsize-jets',
  },
  {
    category: 'super-midsize-jets',
    name: 'Super Midsize Jets',
    models: ['Challenger 300', 'Citation X', 'Gulfstream G200', 'Falcon 2000'],
    capacity: '8-10 passengers',
    range: '3,000-4,000 miles',
    speed: '500-600 mph',
    hourlyRate: { from: 5500, to: 8000 },
    features: [
      'Spacious stand-up cabin',
      'Long-range capability',
      'Premium amenities',
      'Faster cruise speeds',
    ],
    idealFor: [
      'International trips',
      'Large groups',
      'Executive travel',
      'Long-haul flights',
    ],
    description: 'Super midsize jets deliver exceptional range and speed, perfect for transcontinental and international flights with maximum comfort.',
    slug: 'super-midsize-jets',
  },
  {
    category: 'heavy-jets',
    name: 'Heavy Jets',
    models: ['Gulfstream G550', 'Global 6000', 'Falcon 7X', 'Challenger 605'],
    capacity: '10-16 passengers',
    range: '4,000-7,500+ miles',
    speed: '500-600 mph',
    hourlyRate: { from: 8000, to: 15000 },
    features: [
      'Ultra-luxurious cabins',
      'Full galley & crew',
      'Multiple living areas',
      'Global range capability',
    ],
    idealFor: [
      'International travel',
      'Large delegations',
      'Ultra-long flights',
      'Maximum luxury',
    ],
    description: 'Heavy jets represent the pinnacle of private aviation, offering unmatched luxury, range, and comfort for transcontinental and intercontinental travel.',
    slug: 'heavy-jets',
  },
]

export function getAircraftBySlug(slug: string): Aircraft | undefined {
  return AIRCRAFT_CATEGORIES.find(aircraft => aircraft.slug === slug)
}

export function getAircraftByCategory(category: string): Aircraft | undefined {
  return AIRCRAFT_CATEGORIES.find(aircraft => aircraft.category === category)
}
```

### Step 2.5: Create Testimonials Data

Create `lib/data/testimonials.ts`:

```typescript
import { Testimonial } from '@/types'

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Michael Rodriguez',
    role: 'CEO',
    company: 'Tech Ventures Inc.',
    content: 'KeyPrivateJet made booking our executive team flight incredibly simple. Within hours we had multiple competitive quotes and were airborne the same day. Outstanding service!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Investment Manager',
    company: 'Sterling Capital',
    content: 'As someone who flies frequently for business, I appreciate the seamless booking process and transparent pricing. KeyPrivateJet has become my go-to for all private charter needs.',
    rating: 5,
  },
  {
    id: '3',
    name: 'David Thompson',
    role: 'Entrepreneur',
    content: 'The team at KeyPrivateJet connected me with the perfect aircraft for my family vacation. Professional, responsive, and excellent value. Highly recommended!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Jennifer Martinez',
    role: 'CFO',
    company: 'Global Investments',
    content: 'Time is money in our business. KeyPrivateJet understands this perfectly. Fast quotes, reliable service, and always available when we need them.',
    rating: 5,
  },
]
```

### Step 2.6: Create FAQs Data

Create `lib/data/faqs.ts`:

```typescript
import { FAQ } from '@/types'

export const FAQS: FAQ[] = [
  {
    question: 'How much does it cost to charter a private jet?',
    answer: 'Private jet charter costs vary based on aircraft size, route, and duration. Light jets start around $2,500/hour, midsize jets $4,000-6,000/hour, super midsize $5,500-8,000/hour, and heavy jets $8,000-15,000/hour. A typical NYC to Miami flight ranges from $11,000-35,000 depending on aircraft.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'While we can accommodate last-minute requests (even same-day), we recommend booking 2-7 days in advance for best aircraft availability and pricing. For peak travel periods or international flights, 2-4 weeks advance notice is ideal.',
  },
  {
    question: "What's included in the charter price?",
    answer: 'Charter prices typically include: aircraft rental, crew, fuel, standard catering, and ground fees. Additional costs may include: premium catering, special requests, international handling fees, de-icing (winter), and overnight crew expenses.',
  },
  {
    question: 'Can I bring pets on a private jet?',
    answer: 'Yes! Most private jet charters welcome pets. Unlike commercial airlines, your pet can sit with you in the cabin. Be sure to mention pet travel when requesting your quote.',
  },
  {
    question: 'What airports can private jets use?',
    answer: 'Private jets can access over 5,000 airports in the US, including small regional airports unavailable to commercial airlines. This often means getting closer to your final destination and avoiding crowded terminals.',
  },
  {
    question: 'Is private jet charter safe?',
    answer: 'Yes, private aviation has an excellent safety record. All our partner operators are FAA Part 135 certified, maintain rigorous safety standards, and employ experienced professional crews. Aircraft undergo regular maintenance and safety inspections.',
  },
  {
    question: 'Can I book international flights?',
    answer: 'Absolutely! We coordinate international private jet charters worldwide. Our partners handle all customs, immigration, and international permits. Heavy and super midsize jets are ideal for international travel.',
  },
  {
    question: 'What is an empty leg flight?',
    answer: 'Empty leg flights occur when a jet needs to return to its base or reposition for another charter. These flights can offer savings of 25-75% off regular charter prices. Check our Empty Legs page for current deals.',
  },
]
```

---

## PHASE 3: DATABASE & API INFRASTRUCTURE (Day 2)

### Step 3.1: Setup Supabase

1. Create Supabase account at https://supabase.com
2. Create new project
3. Copy connection details to `.env.local`

### Step 3.2: Create Database Migration

Create `supabase/migrations/001_initial_schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Flight Details
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  departure_date DATE NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers >= 1 AND passengers <= 20),
  aircraft_preference TEXT CHECK (aircraft_preference IN ('light-jets', 'midsize-jets', 'super-midsize-jets', 'heavy-jets')),
  
  -- Additional Info
  message TEXT,
  estimated_budget DECIMAL(10, 2),
  
  -- Lead Quality Scoring
  lead_score INTEGER CHECK (lead_score >= 1 AND lead_score <= 10),
  lead_quality TEXT CHECK (lead_quality IN ('hot', 'warm', 'cold')),
  
  -- Tracking
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  utm_source TEXT,
  utm_content TEXT,
  utm_term TEXT,
  landing_page TEXT,
  
  -- Affiliate Management
  affiliate_partner TEXT NOT NULL DEFAULT 'villiers' CHECK (affiliate_partner IN ('villiers', 'jettly', 'nuco')),
  referral_code TEXT,
  commission_status TEXT DEFAULT 'pending' CHECK (commission_status IN ('pending', 'confirmed', 'paid', 'cancelled')),
  commission_amount DECIMAL(10, 2),
  
  -- Lead Status & Response Tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'lost')),
  contacted_at TIMESTAMP WITH TIME ZONE,
  quoted_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  response_time_minutes INTEGER,
  
  -- Technical
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  
  -- GDPR Compliance
  gdpr_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  data_retention_expires_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_affiliate ON leads(affiliate_partner);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX idx_leads_quality ON leads(lead_quality);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  gdpr_consent BOOLEAN DEFAULT false,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'replied', 'resolved')),
  replied_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_status ON contact_submissions(status);

-- Affiliate performance tracking
CREATE TABLE affiliate_performance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  affiliate_partner TEXT NOT NULL CHECK (affiliate_partner IN ('villiers', 'jettly', 'nuco')),
  month DATE NOT NULL,
  leads_sent INTEGER DEFAULT 0,
  leads_converted INTEGER DEFAULT 0,
  total_commission DECIMAL(10, 2) DEFAULT 0,
  avg_response_time_minutes INTEGER,
  conversion_rate DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(affiliate_partner, month)
);

CREATE INDEX idx_affiliate_performance_partner ON affiliate_performance(affiliate_partner);
CREATE INDEX idx_affiliate_performance_month ON affiliate_performance(month DESC);
```

Run this migration in Supabase dashboard SQL editor.

### Step 3.3: Create Supabase Clients

Create `lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Create `lib/supabase/server.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase service role key')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

### Step 3.4: Create Validation Schemas

Create `lib/validations.ts`:

```typescript
import * as z from 'zod'

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  from_city: z.string().min(1, 'Please select departure city'),
  to_city: z.string().min(1, 'Please select destination city'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  passengers: z.number().min(1).max(20),
  aircraft_preference: z.string().optional(),
  message: z.string().max(1000).optional(),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy',
  }),
  marketing_consent: z.boolean().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})
```

### Step 3.5: Create Utility Functions

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

export function calculateLeadScore(data: {
  passengers: number
  aircraft_preference?: string
  message?: string
}): number {
  let score = 5 // Base score

  // More passengers = higher score
  if (data.passengers >= 8) score += 2
  else if (data.passengers >= 4) score += 1

  // Aircraft preference shows serious intent
  if (data.aircraft_preference) score += 1

  // Detailed message shows engagement
  if (data.message && data.message.length > 100) score += 1

  return Math.min(score, 10)
}

export function getLeadQuality(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 8) return 'hot'
  if (score >= 5) return 'warm'
  return 'cold'
}

export function getDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet|ipad/i.test(userAgent)) return 'tablet'
  return 'desktop'
}
```

### Step 3.6: Create Rate Limiting

Create `lib/rate-limit.ts`:

```typescript
import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)

export function rateLimit(req: NextRequest): { success: boolean; remaining: number } {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()

  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return { success: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  store[ip].count++

  if (store[ip].count > RATE_LIMIT_MAX) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining: RATE_LIMIT_MAX - store[ip].count }
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key]
    }
  })
}, 5 * 60 * 1000)
```

### Step 3.7: Setup Resend Email

Create `lib/email/resend.ts`:

```typescript
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  try {
    const data = await resend.emails.send({
      from: `${process.env.NEXT_PUBLIC_SITE_NAME} <noreply@keyprivatejet.com>`,
      to,
      subject,
      html,
      replyTo,
    })
    
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
```

### Step 3.8: Create Email Templates

Create `lib/email/templates/lead-notification.ts`:

```typescript
import { Lead } from '@/types'
import { formatDate, formatCurrency } from '@/lib/utils'

export function generateLeadNotificationEmail(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead Received</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background: white; border-radius: 6px; }
    .label { font-weight: bold; color: #0A2540; display: inline-block; min-width: 150px; }
    .value { color: #333; }
    .score { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
    .score-hot { background: #22c55e; color: white; }
    .score-warm { background: #f59e0b; color: white; }
    .score-cold { background: #94a3b8; color: white; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Lead Received!</h1>
      <p style="margin: 10px 0 0 0;">Lead Score: ${lead.lead_score}/10 
        <span class="score score-${lead.lead_quality}">${lead.lead_quality?.toUpperCase()}</span>
      </p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">✈️ Flight Details</h2>
        <p><span class="label">Route:</span> <span class="value"><strong>${lead.from_city} → ${lead.to_city}</strong></span></p>
        <p><span class="label">Date:</span> <span class="value">${formatDate(lead.departure_date)}</span></p>
        <p><span class="label">Passengers:</span> <span class="value">${lead.passengers}</span></p>
        ${lead.aircraft_preference ? `<p><span class="label">Aircraft:</span> <span class="value">${lead.aircraft_preference}</span></p>` : ''}
      </div>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">👤 Contact Information</h2>
        <p><span class="label">Name:</span> <span class="value">${lead.name}</span></p>
        <p><span class="label">Email:</span> <span class="value"><a href="mailto:${lead.email}">${lead.email}</a></span></p>
        <p><span class="label">Phone:</span> <span class="value"><a href="tel:${lead.phone}">${lead.phone}</a></span></p>
      </div>
      
      ${lead.message ? `
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">💬 Message</h2>
        <p style="white-space: pre-wrap;">${lead.message}</p>
      </div>
      ` : ''}
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">📊 Tracking Info</h2>
        <p><span class="label">Source:</span> <span class="value">${lead.source || 'Direct'}</span></p>
        <p><span class="label">Device:</span> <span class="value">${lead.device_type || 'Unknown'}</span></p>
        <p><span class="label">Lead ID:</span> <span class="value">${lead.id}</span></p>
        <p><span class="label">Sent to:</span> <span class="value"><strong>${lead.affiliate_partner.toUpperCase()}</strong></span></p>
      </div>
    </div>
    
    <div class="footer">
      <p>This lead was automatically sent to your affiliate partner.</p>
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
    </div>
  </div>
</body>
</html>
  `
}
```

Create `lib/email/templates/affiliate-notification.ts`:

```typescript
import { Lead } from '@/types'
import { formatDate } from '@/lib/utils'

export function generateAffiliateNotificationEmail(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Private Jet Charter Quote Request</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background: white; border-radius: 6px; }
    .label { font-weight: bold; color: #0A2540; display: inline-block; min-width: 150px; }
    .value { color: #333; }
    .cta { background: #D4AF37; color: #0A2540; padding: 15px 30px; text-align: center; text-decoration: none; display: inline-block; margin: 20px 0; border-radius: 6px; font-weight: bold; }
    .cta:hover { background: #C9A030; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ New Charter Quote Request</h1>
    </div>
    
    <div class="content">
      <p>Hello,</p>
      <p>We have a client interested in booking a private jet charter with the following details:</p>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Flight Requirements</h2>
        <p><span class="label">Departure:</span> <span class="value"><strong>${lead.from_city}</strong></span></p>
        <p><span class="label">Destination:</span> <span class="value"><strong>${lead.to_city}</strong></span></p>
        <p><span class="label">Date:</span> <span class="value">${formatDate(lead.departure_date)}</span></p>
        <p><span class="label">Passengers:</span> <span class="value">${lead.passengers}</span></p>
        ${lead.aircraft_preference ? `<p><span class="label">Preferred Aircraft:</span> <span class="value">${lead.aircraft_preference}</span></p>` : ''}
      </div>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Client Contact</h2>
        <p><span class="label">Name:</span> <span class="value">${lead.name}</span></p>
        <p><span class="label">Email:</span> <span class="value"><a href="mailto:${lead.email}">${lead.email}</a></span></p>
        <p><span class="label">Phone:</span> <span class="value"><a href="tel:${lead.phone}">${lead.phone}</a></span></p>
      </div>
      
      ${lead.message ? `
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Additional Notes</h2>
        <p style="white-space: pre-wrap;">${lead.message}</p>
      </div>
      ` : ''}
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:${lead.email}" class="cta">Contact Client Now</a>
      </div>
      
      <p><strong>Please reach out to the client directly with your best quote at your earliest convenience.</strong></p>
    </div>
    
    <div class="footer">
      <p><strong>Referral from KeyPrivateJet.com</strong></p>
      <p>Lead Reference: ${lead.id}</p>
      <p>Referral Code: ${lead.referral_code}</p>
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
    </div>
  </div>
</body>
</html>
  `
}
```

Create `lib/email/templates/customer-confirmation.ts`:

```typescript
import { Lead } from '@/types'
import { formatDate } from '@/lib/utils'

export function generateCustomerConfirmationEmail(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote Request Received</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0A2540; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; margin: 0; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background: white; border-radius: 6px; }
    .label { font-weight: bold; color: #0A2540; display: inline-block; min-width: 120px; }
    .value { color: #333; }
    .steps { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #D4AF37; border-radius: 6px; }
    .step { margin: 15px 0; }
    .step-number { display: inline-block; background: #D4AF37; color: #0A2540; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding: 20px; }
    .highlight { background: #FDF3D5; padding: 15px; border-radius: 6px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ Thank You for Your Quote Request!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${lead.name},</p>
      
      <p>We've received your private jet charter request and are connecting you with our premium partners to get you the best quotes.</p>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #0A2540;">Your Request Details</h2>
        <p><span class="label">Route:</span> <span class="value"><strong>${lead.from_city} → ${lead.to_city}</strong></span></p>
        <p><span class="label">Date:</span> <span class="value">${formatDate(lead.departure_date)}</span></p>
        <p><span class="label">Passengers:</span> <span class="value">${lead.passengers}</span></p>
        ${lead.aircraft_preference ? `<p><span class="label">Aircraft:</span> <span class="value">${lead.aircraft_preference}</span></p>` : ''}
      </div>
      
      <h2 style="color: #0A2540;">What Happens Next?</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <strong>Partner Review (30 minutes)</strong><br>
          <span style="margin-left: 40px; color: #666;">Our partner charter operators will review your request</span>
        </div>
        
        <div class="step">
          <span class="step-number">2</span>
          <strong>Receive Quotes (2-4 hours)</strong><br>
          <span style="margin-left: 40px; color: #666;">You'll receive competitive quotes directly from operators</span>
        </div>
        
        <div class="step">
          <span class="step-number">3</span>
          <strong>Choose & Confirm (Your timeline)</strong><br>
          <span style="margin-left: 40px; color: #666;">Select your preferred option and confirm your booking</span>
        </div>
      </div>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #0A2540;">Need Immediate Assistance?</h3>
        <p style="margin-bottom: 0;">Call us anytime at <strong><a href="tel:${process.env.NEXT_PUBLIC_PHONE}" style="color: #0A2540;">${process.env.NEXT_PUBLIC_PHONE_DISPLAY}</a></strong></p>
        <p style="margin-top: 5px;">Or reply directly to this email.</p>
      </div>
      
      <p style="margin-top: 30px;">We're excited to make your journey exceptional!</p>
      
      <p>Best regards,<br>
      <strong>The KeyPrivateJet Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} KeyPrivateJet.com</p>
      <p>You received this email because you requested a quote at keyprivatejet.com</p>
    </div>
  </div>
</body>
</html>
  `
}
```

---

## PHASE 4: UI COMPONENTS (Day 3)

### Step 4.1: Create Shared Components

Create `components/shared/loading-spinner.tsx`:

```typescript
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary-900`}
      />
    </div>
  )
}
```

Create `components/shared/price-display.tsx`:

```typescript
import { formatCurrency } from '@/lib/utils'

interface PriceDisplayProps {
  from: number
  to: number
  label?: string
  className?: string
}

export function PriceDisplay({ from, to, label, className = '' }: PriceDisplayProps) {
  return (
    <div className={`text-center ${className}`}>
      {label && <p className="text-sm text-muted-foreground mb-1">{label}</p>}
      <p className="text-2xl font-bold font-playfair text-primary-900">
        {formatCurrency(from)} - {formatCurrency(to)}
      </p>
    </div>
  )
}
```

Create `components/shared/route-card.tsx`:

```typescript
import { Route } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PriceDisplay } from './price-display'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

interface RouteCardProps {
  route: Route
}

export function RouteCard({ route }: RouteCardProps) {
  return (
    <Card className="overflow-hidden border-primary-100 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="font-playfair text-xl flex items-center justify-between">
          <span>{route.from}</span>
          <ArrowRight className="h-5 w-5 text-gold-500" />
          <span>{route.to}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{route.distance} miles</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{route.flightTime}</span>
          </div>
        </div>
        <PriceDisplay
          from={route.pricing.lightJet.from}
          to={route.pricing.heavyJet.to}
          label="Starting from"
        />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-gold-500 hover:bg-gold-600 text-primary-900">
          <Link href={`/routes/${route.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

Create `components/shared/aircraft-card.tsx`:

```typescript
import { Aircraft } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PriceDisplay } from './price-display'
import { Users, Gauge, MapPin } from 'lucide-react'
import Link from 'next/link'

interface AircraftCardProps {
  aircraft: Aircraft
}

export function AircraftCard({ aircraft }: AircraftCardProps) {
  return (
    <Card className="overflow-hidden border-primary-100 hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl">{aircraft.name}</CardTitle>
        <CardDescription>{aircraft.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center gap-1 p-2 bg-primary-50 rounded">
            <Users className="h-4 w-4 text-primary-900" />
            <span className="text-xs text-muted-foreground">Capacity</span>
            <span className="font-semibold">{aircraft.capacity}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 bg-primary-50 rounded">
            <MapPin className="h-4 w-4 text-primary-900" />
            <span className="text-xs text-muted-foreground">Range</span>
            <span className="font-semibold">{aircraft.range}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 bg-primary-50 rounded">
            <Gauge className="h-4 w-4 text-primary-900" />
            <span className="text-xs text-muted-foreground">Speed</span>
            <span className="font-semibold">{aircraft.speed}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-semibold mb-2">Popular Models:</p>
          <div className="flex flex-wrap gap-2">
            {aircraft.models.slice(0, 3).map((model) => (
              <Badge key={model} variant="outline">{model}</Badge>
            ))}
          </div>
        </div>
        
        <PriceDisplay
          from={aircraft.hourlyRate.from}
          to={aircraft.hourlyRate.to}
          label="Hourly Rate"
        />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-gold-500 hover:bg-gold-600 text-primary-900">
          <Link href={`/aircraft/${aircraft.slug}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

---

## PHASE 5: HOMEPAGE & CORE PAGES (Day 4-5)

### Step 5.1: Create Hero Section
### Step 5.2: Create Quote Form
### Step 5.3: Create Popular Routes Section
### Step 5.4: Create Aircraft Categories Section
### Step 5.5: Create Testimonials Section
### Step 5.6: Create FAQ Section
### Step 5.7: Create Footer

---

## PHASE 6: TESTING & QUALITY ASSURANCE (Day 6)

### Step 6.1: Setup Testing Infrastructure

Install testing dependencies:

```bash
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
pnpm add -D playwright @playwright/test
pnpm add -D supertest @types/supertest
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/types/**',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SITE_NAME = 'KeyPrivateJet'
process.env.NEXT_PUBLIC_PHONE = '+18555558888'
process.env.NEXT_PUBLIC_PHONE_DISPLAY = '(855) 555-8888'
```

### Step 6.2: Unit Tests - Utility Functions

Create `tests/unit/utils.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  calculateLeadScore,
  getLeadQuality,
  getDeviceType,
} from '@/lib/utils'

describe('formatCurrency', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000')
    expect(formatCurrency(25000)).toBe('$25,000')
    expect(formatCurrency(150000)).toBe('$150,000')
  })

  it('handles zero and negative values', () => {
    expect(formatCurrency(0)).toBe('$0')
    expect(formatCurrency(-500)).toBe('-$500')
  })
})

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2025-12-25')
    expect(formatDate(date)).toBe('December 25, 2025')
  })

  it('handles string dates', () => {
    expect(formatDate('2025-01-01')).toBe('January 1, 2025')
  })
})

describe('formatPhoneNumber', () => {
  it('formats US phone numbers', () => {
    expect(formatPhoneNumber('5551234567')).toBe('(555) 123-4567')
    expect(formatPhoneNumber('8005551234')).toBe('(800) 555-1234')
  })

  it('handles already formatted numbers', () => {
    expect(formatPhoneNumber('(555) 123-4567')).toBe('(555) 123-4567')
  })

  it('returns original if invalid format', () => {
    expect(formatPhoneNumber('123')).toBe('123')
  })
})

describe('calculateLeadScore', () => {
  it('calculates base score correctly', () => {
    const score = calculateLeadScore({
      passengers: 2,
    })
    expect(score).toBe(5)
  })

  it('adds points for more passengers', () => {
    expect(calculateLeadScore({ passengers: 4 })).toBe(6)
    expect(calculateLeadScore({ passengers: 8 })).toBe(7)
  })

  it('adds points for aircraft preference', () => {
    expect(
      calculateLeadScore({
        passengers: 4,
        aircraft_preference: 'heavy-jets',
      })
    ).toBe(7)
  })

  it('adds points for detailed message', () => {
    const longMessage = 'a'.repeat(150)
    expect(
      calculateLeadScore({
        passengers: 8,
        aircraft_preference: 'heavy-jets',
        message: longMessage,
      })
    ).toBe(9)
  })

  it('caps score at 10', () => {
    const longMessage = 'a'.repeat(200)
    expect(
      calculateLeadScore({
        passengers: 10,
        aircraft_preference: 'heavy-jets',
        message: longMessage,
      })
    ).toBe(10)
  })
})

describe('getLeadQuality', () => {
  it('returns hot for high scores', () => {
    expect(getLeadQuality(8)).toBe('hot')
    expect(getLeadQuality(10)).toBe('hot')
  })

  it('returns warm for medium scores', () => {
    expect(getLeadQuality(5)).toBe('warm')
    expect(getLeadQuality(7)).toBe('warm')
  })

  it('returns cold for low scores', () => {
    expect(getLeadQuality(1)).toBe('cold')
    expect(getLeadQuality(4)).toBe('cold')
  })
})

describe('getDeviceType', () => {
  it('detects mobile devices', () => {
    expect(getDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)')).toBe('mobile')
    expect(getDeviceType('Mozilla/5.0 (Linux; Android 10; SM-G973F)')).toBe('mobile')
  })

  it('detects tablets', () => {
    expect(getDeviceType('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)')).toBe('tablet')
  })

  it('detects desktop', () => {
    expect(getDeviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('desktop')
    expect(getDeviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')).toBe('desktop')
  })
})
```

### Step 6.3: Unit Tests - Validation Schemas

Create `tests/unit/validations.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { leadFormSchema, contactFormSchema, newsletterSchema } from '@/lib/validations'

describe('leadFormSchema', () => {
  it('validates correct lead form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date('2025-12-25'),
      passengers: 4,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 4,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects short phone number', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 4,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects without GDPR consent', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 4,
      gdpr_consent: false,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects invalid passenger count', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: new Date(),
      passengers: 0,
      gdpr_consent: true,
    }

    const result = leadFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('contactFormSchema', () => {
  it('validates correct contact form data', () => {
    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'I would like more information about your services.',
    }

    const result = contactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects short subject', () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Hi',
      message: 'I would like more information.',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('rejects short message', () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'Hello',
    }

    const result = contactFormSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('newsletterSchema', () => {
  it('validates correct email', () => {
    const result = newsletterSchema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-an-email' })
    expect(result.success).toBe(false)
  })
})
```

### Step 6.4: Unit Tests - SEO Functions

Create `tests/unit/seo.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { generatePageMetadata, generateRouteMetadata } from '@/lib/seo'

describe('generatePageMetadata', () => {
  it('generates correct metadata', () => {
    const metadata = generatePageMetadata({
      title: 'Test Page',
      description: 'Test description',
      keywords: ['test', 'page'],
    })

    expect(metadata.title).toContain('Test Page')
    expect(metadata.description).toBe('Test description')
    expect(metadata.keywords).toBe('test, page')
  })

  it('includes site name in title', () => {
    const metadata = generatePageMetadata({
      title: 'Test Page',
      description: 'Test description',
    })

    expect(metadata.title).toContain('KeyPrivateJet')
  })

  it('sets noindex when requested', () => {
    const metadata = generatePageMetadata({
      title: 'Test Page',
      description: 'Test description',
      noindex: true,
    })

    expect(metadata.robots).toBe('noindex, nofollow')
  })

  it('generates OpenGraph tags', () => {
    const metadata = generatePageMetadata({
      title: 'Test Page',
      description: 'Test description',
    })

    expect(metadata.openGraph).toBeDefined()
    expect(metadata.openGraph?.title).toContain('Test Page')
    expect(metadata.openGraph?.description).toBe('Test description')
  })
})

describe('generateRouteMetadata', () => {
  it('generates route-specific metadata', () => {
    const route = {
      from: 'New York',
      to: 'Miami',
      flightTime: '2h 45m',
      priceFrom: 11000,
      slug: 'new-york-to-miami',
    }

    const metadata = generateRouteMetadata(route)

    expect(metadata.title).toContain('New York')
    expect(metadata.title).toContain('Miami')
    expect(metadata.description).toContain('2h 45m')
    expect(metadata.description).toContain('$11,000')
  })
})
```

### Step 6.5: Integration Tests - API Routes

Create `tests/integration/api-lead.test.ts`:

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createServer } from 'http'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/lead/route'

describe('POST /api/lead', () => {
  it('accepts valid lead submission', async () => {
    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: '2025-12-25',
      passengers: 4,
      gdpr_consent: true,
    }

    const request = new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: JSON.stringify(validLead),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.leadId).toBeDefined()
  })

  it('rejects invalid email', async () => {
    const invalidLead = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: '2025-12-25',
      passengers: 4,
      gdpr_consent: true,
    }

    const request = new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: JSON.stringify(invalidLead),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('rejects missing GDPR consent', async () => {
    const invalidLead = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: '2025-12-25',
      passengers: 4,
      gdpr_consent: false,
    }

    const request = new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      body: JSON.stringify(invalidLead),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('enforces rate limiting', async () => {
    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      from_city: 'NYC',
      to_city: 'MIA',
      date: '2025-12-25',
      passengers: 4,
      gdpr_consent: true,
    }

    // Submit multiple times to trigger rate limit
    const requests = Array(15)
      .fill(null)
      .map(() =>
        new NextRequest('http://localhost:3000/api/lead', {
          method: 'POST',
          body: JSON.stringify(validLead),
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '192.168.1.1',
          },
        })
      )

    const responses = await Promise.all(requests.map((req) => POST(req)))

    // At least one should be rate limited
    const rateLimited = responses.some((res) => res.status === 429)
    expect(rateLimited).toBe(true)
  })
})
```

### Step 6.6: E2E Tests - Critical User Flows

Create `tests/e2e/homepage.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/KeyPrivateJet/)
  })

  test('displays hero section', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays quote form', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('form')).toBeVisible()
  })

  test('displays popular routes', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByText(/Popular Routes/i)).toBeVisible()
  })

  test('displays aircraft categories', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByText(/Aircraft Categories/i)).toBeVisible()
  })

  test('navigation works', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Click on "About" link
    await page.click('text=About')
    await expect(page).toHaveURL(/\/about/)
  })
})
```

Create `tests/e2e/quote-form.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Quote Form Submission', () => {
  test('submits valid quote request', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Fill out form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '5551234567')
    
    // Select cities
    await page.selectOption('select[name="from_city"]', 'NYC')
    await page.selectOption('select[name="to_city"]', 'MIA')
    
    // Select date (future date)
    await page.fill('input[name="date"]', '2025-12-25')
    
    // Select passengers
    await page.fill('input[name="passengers"]', '4')
    
    // Accept GDPR
    await page.check('input[name="gdpr_consent"]')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Wait for success message
    await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 10000 })
  })

  test('shows validation errors for invalid data', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Submit empty form
    await page.click('button[type="submit"]')
    
    // Should show validation errors
    await expect(page.getByText(/required/i)).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.fill('input[name="email"]', 'invalid-email')
    await page.click('button[type="submit"]')
    
    await expect(page.getByText(/invalid email/i)).toBeVisible()
  })

  test('requires GDPR consent', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Fill all fields except GDPR
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '5551234567')
    await page.selectOption('select[name="from_city"]', 'NYC')
    await page.selectOption('select[name="to_city"]', 'MIA')
    await page.fill('input[name="date"]', '2025-12-25')
    await page.fill('input[name="passengers"]', '4')
    
    // Don't check GDPR
    await page.click('button[type="submit"]')
    
    await expect(page.getByText(/privacy policy/i)).toBeVisible()
  })
})
```

Create `tests/e2e/route-pages.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Route Pages', () => {
  test('displays route details', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    await expect(page.locator('h1')).toContainText('New York')
    await expect(page.locator('h1')).toContainText('Miami')
  })

  test('shows pricing information', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    await expect(page.getByText(/\$/)).toBeVisible()
  })

  test('has quote form', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    await expect(page.locator('form')).toBeVisible()
  })

  test('pre-fills form with route data', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    const fromCity = await page.inputValue('select[name="from_city"]')
    const toCity = await page.inputValue('select[name="to_city"]')
    
    expect(fromCity).toBe('NYC')
    expect(toCity).toBe('MIA')
  })
})
```

### Step 6.7: Performance Tests

Create `tests/performance/lighthouse.test.ts`:

```typescript
import { test, expect } from '@playwright/test'
import { playAudit } from 'playwright-lighthouse'

test.describe('Lighthouse Performance', () => {
  test('homepage meets performance standards', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const audit = await playAudit({
      page,
      thresholds: {
        performance: 80,
        accessibility: 90,
        'best-practices': 85,
        seo: 90,
      },
      port: 9222,
    })

    expect(audit.performance).toBeGreaterThanOrEqual(80)
    expect(audit.accessibility).toBeGreaterThanOrEqual(90)
    expect(audit.seo).toBeGreaterThanOrEqual(90)
  })

  test('route page loads in under 3 seconds', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000)
  })
})
```

### Step 6.8: Accessibility Tests

Create `tests/accessibility/a11y.test.ts`:

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('quote form is keyboard accessible', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Tab through form fields
    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="name"]')).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="email"]')).toBeFocused()
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })
})
```

### Step 6.9: Update package.json Scripts

Add testing scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "pnpm test && pnpm test:e2e",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Step 6.10: Create Playwright Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Step 6.11: Create Test Documentation

Create `tests/README.md`:

```markdown
# Testing Guide

## Overview

This project uses a comprehensive testing strategy:
- **Unit Tests**: Vitest for utility functions and components
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright for user flows
- **Performance Tests**: Lighthouse audits
- **Accessibility Tests**: Axe-core

## Running Tests

### Unit Tests
\`\`\`bash
pnpm test                # Run all unit tests
pnpm test:ui             # Run with UI
pnpm test:coverage       # Generate coverage report
\`\`\`

### E2E Tests
\`\`\`bash
pnpm test:e2e            # Run all E2E tests
pnpm test:e2e:ui         # Run with UI
\`\`\`

### All Tests
\`\`\`bash
pnpm test:all            # Run all tests
\`\`\`

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All API routes
- **E2E Tests**: Critical user flows
- **Performance**: Lighthouse score 80+
- **Accessibility**: Zero violations

## Writing Tests

### Unit Test Example
\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/utils'

describe('myFunction', () => {
  it('does something', () => {
    expect(myFunction()).toBe(expected)
  })
})
\`\`\`

### E2E Test Example
\`\`\`typescript
import { test, expect } from '@playwright/test'

test('user can submit form', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.getByText('Success')).toBeVisible()
})
\`\`\`

## CI/CD Integration

Tests run automatically on:
- Every pull request
- Before deployment
- Nightly for full suite

## Debugging Failed Tests

1. Check test output for error messages
2. Review screenshots (E2E tests only)
3. Run tests with UI: `pnpm test:ui` or `pnpm test:e2e:ui`
4. Check browser console logs
5. Verify environment variables
```

---

## PHASE 7: DEPLOYMENT & MONITORING (Day 7)

### Step 7.1: Vercel Deployment
### Step 7.2: Environment Variables Setup
### Step 7.3: Domain Configuration
### Step 7.4: Analytics Setup
### Step 7.5: Error Monitoring
### Step 7.6: Performance Monitoring

---

