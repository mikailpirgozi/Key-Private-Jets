/**
 * Affiliate partner configuration
 */

export type AffiliatePartner = 'villiers' | 'jettly' | 'nuco'

export interface AffiliateConfig {
  id: AffiliatePartner
  name: string
  email: string
  referralCode: string
  commission: string
  website: string
  description: string
  deliveryMethod: 'email' | 'api' | 'phone'
  phone?: string
}

export const affiliatePartners: Record<AffiliatePartner, AffiliateConfig> = {
  villiers: {
    id: 'villiers',
    name: 'Villiers Jets',
    email: process.env.VILLIERS_EMAIL || 'leads@villiersjets.com',
    referralCode: process.env.VILLIERS_REFERRAL_CODE || 'KPJ-VILLIERS-2025',
    commission: '30% profit share',
    website: 'https://www.villiersjets.com',
    description: 'Global leader in private jet charter with 10,000+ aircraft worldwide',
    deliveryMethod: 'email',
  },
  jettly: {
    id: 'jettly',
    name: 'Jettly',
    email: process.env.JETTLY_EMAIL || 'affiliates@jettly.com',
    referralCode: process.env.JETTLY_REFERRAL_CODE || 'KPJ-JETTLY-2025',
    commission: 'Up to $30,000 per booking',
    website: 'https://www.jettly.com',
    description: 'Technology-driven charter marketplace connecting clients with certified operators',
    deliveryMethod: 'email',
  },
  nuco: {
    id: 'nuco',
    name: 'NuCo Jets',
    email: process.env.NUCO_EMAIL || 'charter@nucojets.com',
    referralCode: process.env.NUCO_REFERRAL_CODE || 'KPJ-NUCO-2025',
    commission: 'Tiered based on volume',
    website: 'https://www.nucojets.com',
    description: 'Premium charter service specializing in corporate and luxury travel',
    deliveryMethod: 'email',
    phone: '(855) 682-6538',
  },
} as const

/**
 * Get affiliate config by ID
 */
export function getAffiliateConfig(partnerId: AffiliatePartner): AffiliateConfig {
  return affiliatePartners[partnerId]
}

/**
 * Get all affiliate partners
 */
export function getAllAffiliates(): AffiliateConfig[] {
  return Object.values(affiliatePartners)
}

/**
 * Select best affiliate partner based on lead characteristics
 * Currently uses round-robin, but can be enhanced with lead scoring
 */
export function selectBestAffiliate(_leadData?: {
  passengers?: number
  estimatedBudget?: number
  route?: string
}): AffiliatePartner {
  // Default to Villiers (largest network)
  // Can be enhanced with intelligent routing based on:
  // - Route coverage
  // - Aircraft availability
  // - Historical conversion rates
  // - Commission structure
  return 'villiers'
}

