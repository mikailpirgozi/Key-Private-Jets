/**
 * SEO Monitoring & Keyword Tracking Utilities
 * Tracks rankings, search volume, and optimization metrics
 */

export interface KeywordMetric {
  keyword: string
  currentRank: number
  previousRank: number
  searchVolume: number
  difficulty: number
  cpc: number
  lastUpdated: Date
  trend: 'up' | 'down' | 'stable'
}

export interface ContentPerformance {
  url: string
  title: string
  clicks: number
  impressions: number
  avgClickThrough: number
  avgPosition: number
  targetKeyword: string
  createdAt: Date
  lastUpdated: Date
}

export interface SeoHealthScore {
  overall: number // 0-100
  technical: number
  content: number
  authority: number
  userExperience: number
}

/**
 * Calculate SEO health score based on various metrics
 */
export function calculateSeoHealthScore(metrics: {
  lighthouse: number // 0-100
  mobileUsable: boolean
  hasSchema: boolean
  contentLength: number // words
  internalLinks: number
  externalLinks: number
  backlinks: number
  domainAge: number // days
}): SeoHealthScore {
  // Technical score
  const technical = Math.round((metrics.lighthouse + (metrics.mobileUsable ? 100 : 0)) / 2)

  // Content score
  const contentScore =
    (metrics.contentLength >= 1500 ? 25 : (metrics.contentLength / 1500) * 25) +
    (metrics.hasSchema ? 25 : 0) +
    (metrics.internalLinks >= 5 ? 25 : (metrics.internalLinks / 5) * 25) +
    (metrics.externalLinks >= 3 ? 25 : (metrics.externalLinks / 3) * 25)

  // Authority score
  const authority = Math.min(
    100,
    (metrics.backlinks * 5) + (metrics.domainAge > 365 ? 20 : (metrics.domainAge / 365) * 20)
  )

  // User experience (based on lighthouse)
  const userExperience = metrics.lighthouse

  // Overall score
  const overall = Math.round((technical + contentScore + authority + userExperience) / 4)

  return {
    overall,
    technical,
    content: Math.round(contentScore),
    authority: Math.round(authority),
    userExperience,
  }
}

/**
 * Generate SEO report for a page
 */
export interface SeoPageReport {
  url: string
  title: string
  description: string
  keywords: string[]
  contentLength: number
  headingStructure: {
    h1: number
    h2: number
    h3: number
  }
  images: {
    total: number
    withAlt: number
    optimized: number
  }
  links: {
    internal: number
    external: number
    broken: number
  }
  performance: {
    lighthouse: number
    fcp: number // First Contentful Paint (ms)
    lcp: number // Largest Contentful Paint (ms)
    cls: number // Cumulative Layout Shift
  }
  issues: string[]
  recommendations: string[]
}

/**
 * SEO recommendation engine
 */
export function generateSeoRecommendations(report: SeoPageReport): string[] {
  const recommendations: string[] = []

  // Content recommendations
  if (report.contentLength < 1000) {
    recommendations.push('❌ Content too short. Aim for 1,500+ words for better rankings.')
  }
  if (report.contentLength > 3000) {
    recommendations.push('⚠️ Content very long. Consider breaking into multiple pages.')
  }

  // Heading structure
  if (report.headingStructure.h1 !== 1) {
    recommendations.push('❌ Exactly one H1 required. Currently: ' + report.headingStructure.h1)
  }
  if (report.headingStructure.h2 === 0) {
    recommendations.push('⚠️ No H2 headings found. Add subheadings for structure.')
  }

  // Images
  const imageAltRatio = (report.images.withAlt / report.images.total) * 100
  if (imageAltRatio < 100) {
    recommendations.push(`❌ ${100 - imageAltRatio}% of images missing alt text.`)
  }

  // Links
  if (report.links.internal < 3) {
    recommendations.push('⚠️ Few internal links. Link to 5+ relevant pages.')
  }
  if (report.links.broken > 0) {
    recommendations.push(`❌ ${report.links.broken} broken links found.`)
  }

  // Performance
  if (report.performance.lighthouse < 80) {
    recommendations.push(
      `⚠️ Lighthouse score ${report.performance.lighthouse}/100. Optimize for speed.`
    )
  }
  if (report.performance.lcp > 2500) {
    recommendations.push('❌ LCP too high. Optimize images and lazy load.')
  }
  if (report.performance.cls > 0.1) {
    recommendations.push('❌ Layout shift too high. Fix cumulative layout shift.')
  }

  return recommendations
}

/**
 * Track keyword ranking changes
 */
export function analyzeKeywordTrend(
  _keyword: string,
  previousRank: number,
  currentRank: number
): 'up' | 'down' | 'stable' {
  if (currentRank < previousRank) return 'up' // Better ranking (lower is better)
  if (currentRank > previousRank) return 'down'
  return 'stable'
}

/**
 * Calculate CTR metrics
 */
export function calculateCtrMetrics(impressions: number, clicks: number): number {
  if (impressions === 0) return 0
  return parseFloat(((clicks / impressions) * 100).toFixed(2))
}

/**
 * Identify low-hanging fruit keywords
 */
export function findLowHangingFruit(keywords: KeywordMetric[]): KeywordMetric[] {
  return keywords
    .filter((k) => k.currentRank <= 20 && k.difficulty < 30 && k.searchVolume > 100)
    .sort((a, b) => a.currentRank - b.currentRank)
    .slice(0, 10)
}

/**
 * Generate content gap analysis
 */
export interface ContentGap {
  keyword: string
  searchVolume: number
  difficulty: number
  competitors: string[]
  opportunity: 'high' | 'medium' | 'low'
}

export function identifyContentGaps(
  coveredKeywords: string[],
  targetKeywords: string[],
  keywordMetrics: Record<string, KeywordMetric>
): ContentGap[] {
  const gaps: ContentGap[] = []

  for (const keyword of targetKeywords) {
    if (!coveredKeywords.includes(keyword) && keywordMetrics[keyword]) {
      const metric = keywordMetrics[keyword]
      const opportunity =
        metric.difficulty < 20
          ? 'high'
          : metric.difficulty < 40
            ? 'medium'
            : 'low'

      gaps.push({
        keyword,
        searchVolume: metric.searchVolume,
        difficulty: metric.difficulty,
        competitors: [], // Would be populated from competitor data
        opportunity,
      })
    }
  }

  return gaps.sort((a, b) => b.searchVolume - a.searchVolume)
}
