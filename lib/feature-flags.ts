/**
 * Feature Flags & A/B Testing
 * Dynamic feature management for experimentation
 */

export type FeatureFlag = 'hero-headline-test' | 'form-length-test' | 'cta-text-test' | 'trust-badges'

export interface Variant {
  id: string
  name: string
  weight: number // 0-100, percentage of traffic
}

export interface FeatureFlagConfig {
  enabled: boolean
  variants: Variant[]
  rolloutPercentage: number // 0-100
  description: string
}

const FEATURE_FLAGS: Record<FeatureFlag, FeatureFlagConfig> = {
  'hero-headline-test': {
    enabled: true,
    rolloutPercentage: 50,
    description: 'Test different hero headlines for conversion rate',
    variants: [
      { id: 'control', name: 'Fly Private. Fly Now.', weight: 33 },
      { id: 'variant-b', name: 'Charter a Private Jet in 30 Minutes', weight: 33 },
      { id: 'variant-c', name: 'Luxury Aviation Simplified', weight: 34 },
    ],
  },
  'form-length-test': {
    enabled: true,
    rolloutPercentage: 33,
    description: 'Test form field reduction for better completion rates',
    variants: [
      { id: 'full-form', name: 'Full Form (8 fields)', weight: 33 },
      { id: 'short-form', name: 'Short Form (3 fields)', weight: 33 },
      { id: 'progressive-form', name: 'Progressive Form (3 steps)', weight: 34 },
    ],
  },
  'cta-text-test': {
    enabled: true,
    rolloutPercentage: 25,
    description: 'Test CTA button text variations',
    variants: [
      { id: 'get-free-quote', name: 'Get Free Quote', weight: 33 },
      { id: 'get-instant-quote', name: 'Get Instant Quote', weight: 33 },
      { id: 'request-quote', name: 'Request a Quote', weight: 34 },
    ],
  },
  'trust-badges': {
    enabled: true,
    rolloutPercentage: 100,
    description: 'Display trust badges in hero section',
    variants: [
      { id: 'control', name: 'No badges', weight: 50 },
      { id: 'with-badges', name: 'With badges', weight: 50 },
    ],
  },
}

/**
 * Get stable hash for user (for consistent variant assignment)
 */
function hashUser(userId: string): number {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Get variant for user (deterministic)
 */
export function getVariant(
  featureFlag: FeatureFlag,
  userId: string = 'anonymous'
): Variant | null {
  const config = FEATURE_FLAGS[featureFlag]

  if (!config || !config.enabled) {
    return null
  }

  // Check rollout percentage
  const userHash = hashUser(userId)
  if ((userHash % 100) >= config.rolloutPercentage) {
    return null
  }

  // Assign to variant based on weight
  const variantHash = (userHash % 100) / 100
  let cumulativeWeight = 0

  for (const variant of config.variants) {
    cumulativeWeight += variant.weight / 100
    if (variantHash <= cumulativeWeight) {
      return variant
    }
  }

  // Fallback to first variant
  return config.variants[0] ?? null
}

/**
 * Check if feature is enabled for user
 */
export function isFeatureEnabled(featureFlag: FeatureFlag, userId: string = 'anonymous'): boolean {
  return getVariant(featureFlag, userId) !== null
}

/**
 * Get variant ID (useful for tracking)
 */
export function getVariantId(featureFlag: FeatureFlag, userId: string = 'anonymous'): string {
  const variant = getVariant(featureFlag, userId)
  return variant?.id || 'control'
}

/**
 * Get variant name (display value)
 */
export function getVariantName(featureFlag: FeatureFlag, userId: string = 'anonymous'): string {
  const variant = getVariant(featureFlag, userId)
  return variant?.name || 'control'
}

/**
 * Get all active features for user
 */
export function getActiveFeatures(userId: string = 'anonymous'): Record<FeatureFlag, string> {
  const active: Record<string, string> = {}

  for (const flagName of Object.keys(FEATURE_FLAGS) as FeatureFlag[]) {
    const variantId = getVariantId(flagName, userId)
    active[flagName] = variantId
  }

  return active as Record<FeatureFlag, string>
}

/**
 * Test helper: check if user is in control group
 */
export function isControlGroup(featureFlag: FeatureFlag, userId: string = 'anonymous'): boolean {
  return getVariantId(featureFlag, userId) === 'control'
}

/**
 * Test helper: check if user is in test group
 */
export function isTestGroup(featureFlag: FeatureFlag, userId: string = 'anonymous'): boolean {
  return getVariantId(featureFlag, userId) !== 'control'
}

/**
 * Track feature flag usage (for analytics)
 */
export function trackFeatureUsage(featureFlag: FeatureFlag, userId: string = 'anonymous'): void {
  if (typeof window !== 'undefined' && window.gtag) {
    const variantId = getVariantId(featureFlag, userId)
    window.gtag('event', 'feature_flag', {
      feature_name: featureFlag,
      variant_id: variantId,
      user_id: userId,
    })
  }
}

/**
 * Get feature flag stats
 */
export interface FeatureFlagStats {
  flag: FeatureFlag
  enabled: boolean
  rolloutPercentage: number
  totalVariants: number
  variantDistribution: Record<string, number>
}

export function getFeatureFlagStats(featureFlag: FeatureFlag): FeatureFlagStats {
  const config = FEATURE_FLAGS[featureFlag]

  return {
    flag: featureFlag,
    enabled: config.enabled,
    rolloutPercentage: config.rolloutPercentage,
    totalVariants: config.variants.length,
    variantDistribution: Object.fromEntries(
      config.variants.map((v) => [v.id, v.weight])
    ),
  }
}

/**
 * Get all feature flags status
 */
export function getAllFeatureFlags(): Record<FeatureFlag, FeatureFlagConfig> {
  return FEATURE_FLAGS
}

/**
 * Helper for React components
 */
export function useFeatureFlag(featureFlag: FeatureFlag, userId: string = 'anonymous') {
  return {
    enabled: isFeatureEnabled(featureFlag, userId),
    variant: getVariantId(featureFlag, userId),
    variantName: getVariantName(featureFlag, userId),
    isControl: isControlGroup(featureFlag, userId),
    isTest: isTestGroup(featureFlag, userId),
  }
}

/**
 * Dynamic content based on feature flags
 */
export const featureFlagContent = {
  heroHeadline: {
    control: 'Fly Private. Fly Now.',
    'variant-b': 'Charter a Private Jet in 30 Minutes',
    'variant-c': 'Luxury Aviation Simplified',
  } as Record<string, string>,

  ctaText: {
    'get-free-quote': 'Get Free Quote',
    'get-instant-quote': 'Get Instant Quote',
    'request-quote': 'Request a Quote',
  } as Record<string, string>,

  formType: {
    'full-form': 'full',
    'short-form': 'short',
    'progressive-form': 'progressive',
  } as Record<string, string>,
}

// Type safety helpers
export type HeroHeadlineVariant = keyof typeof featureFlagContent.heroHeadline
export type CtaTextVariant = keyof typeof featureFlagContent.ctaText
export type FormTypeVariant = keyof typeof featureFlagContent.formType
