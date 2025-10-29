/**
 * Site-wide configuration
 */

export const siteConfig = {
  name: 'KeyPrivateJet',
  title: 'KeyPrivateJet - Luxury Private Jet Charter',
  description:
    'Book private jet charters with the world\'s leading operators. Compare quotes, find empty legs, and fly in luxury. Instant quotes from Villiers Jets, Jettly & NuCo Jets.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com',
  ogImage: '/images/og-image.jpg',
  
  contact: {
    email: process.env.ADMIN_EMAIL || 'info@keyprivatejet.com',
    phone: process.env.NEXT_PUBLIC_PHONE || '+18555558888',
    phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '(855) 555-8888',
  },
  
  social: {
    twitter: 'https://twitter.com/keyprivatejet',
    facebook: 'https://facebook.com/keyprivatejet',
    instagram: 'https://instagram.com/keyprivatejet',
    linkedin: 'https://linkedin.com/company/keyprivatejet',
  },
  
  timezone: 'America/New_York', // Europe/Bratislava for backend
  
  // Performance targets
  performance: {
    fcpTarget: 1800, // ms
    lcpTarget: 2500, // ms
    ttiTarget: 3800, // ms
    clsTarget: 0.1,
    tbtTarget: 300, // ms
  },
  
  // Conversion targets
  conversion: {
    targetRate: 0.03, // 3%
    minLeadScore: 6, // out of 10
  },
} as const

export type SiteConfig = typeof siteConfig

