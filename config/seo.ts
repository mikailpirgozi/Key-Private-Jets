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

