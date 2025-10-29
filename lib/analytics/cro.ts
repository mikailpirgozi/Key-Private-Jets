/**
 * Conversion Rate Optimization (CRO) Utilities
 * A/B testing, funnel analysis, and conversion tracking
 */

export interface Variant {
  id: string
  name: string
  description: string
  isControl: boolean
  startDate: Date
  endDate?: Date
  active: boolean
}

export interface ABTestResult {
  testId: string
  testName: string
  startDate: Date
  endDate?: Date
  controlVariant: Variant
  variants: Variant[]
  results: {
    variantId: string
    variantName: string
    visitors: number
    conversions: number
    conversionRate: number
    confidence: number
    winner: boolean
  }[]
  hypothesis: string
  conclusion?: string
  recommendation?: string
}

export interface FunnelStep {
  stepId: string
  stepName: string
  stepNumber: number
  url?: string
  visitors: number
  conversions: number
  dropoffRate: number
}

export interface ConversionFunnel {
  funnelId: string
  funnelName: string
  steps: FunnelStep[]
  totalVisitors: number
  totalConversions: number
  overallConversionRate: number
  bottlenecks: FunnelStep[] // Steps with highest dropoff
}

export interface ConversionMetrics {
  totalVisitors: number
  totalConversions: number
  conversionRate: number
  avgOrderValue: number
  revenue: number
  costPerAcquisition: number
  returnOnAdSpend: number
  customerLifetimeValue: number
}

/**
 * Calculate conversion rate
 */
export function calculateConversionRate(conversions: number, visitors: number): number {
  if (visitors === 0) return 0
  return parseFloat(((conversions / visitors) * 100).toFixed(2))
}

/**
 * Calculate statistical significance (Chi-square test)
 */
export function calculateStatisticalSignificance(
  controlConversions: number,
  controlVisitors: number,
  variantConversions: number,
  variantVisitors: number
): number {
  const controlRate = controlConversions / controlVisitors
  const variantRate = variantConversions / variantVisitors

  const pooledRate = (controlConversions + variantConversions) / (controlVisitors + variantVisitors)
  const se = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlVisitors + 1 / variantVisitors))

  const zScore = (variantRate - controlRate) / se

  // Convert to confidence level (0-100)
  // z-score of 1.96 ≈ 95% confidence
  // z-score of 2.576 ≈ 99% confidence
  if (Math.abs(zScore) < 1.96) return 0
  if (Math.abs(zScore) < 2.576) return 95
  return 99
}

/**
 * Determine A/B test winner
 */
export function determineTestWinner(
  controlConversions: number,
  controlVisitors: number,
  variantConversions: number,
  variantVisitors: number
): { winner: 'control' | 'variant' | 'tie'; improvement: number; confidence: number } {
  const controlRate = calculateConversionRate(controlConversions, controlVisitors)
  const variantRate = calculateConversionRate(variantConversions, variantVisitors)
  const confidence = calculateStatisticalSignificance(
    controlConversions,
    controlVisitors,
    variantConversions,
    variantVisitors
  )

  const improvement = ((variantRate - controlRate) / controlRate) * 100

  if (confidence < 95) {
    return { winner: 'tie', improvement, confidence }
  }

  return {
    winner: variantRate > controlRate ? 'variant' : 'control',
    improvement: Math.abs(improvement),
    confidence,
  }
}

/**
 * Calculate required sample size for A/B test
 */
export function calculateSampleSize(
  baselineConversionRate: number,
  minimumDetectableEffect: number,
  confidenceLevel: number = 0.95,
  powerLevel: number = 0.8
): number {
  // Using standard formulas for two-proportion z-test
  const zAlpha = confidenceLevel === 0.95 ? 1.96 : 2.576
  const zBeta = powerLevel === 0.8 ? 0.84 : 1.28

  const p1 = baselineConversionRate
  const p2 = baselineConversionRate * (1 + minimumDetectableEffect)

  const sampleSize = Math.ceil(
    ((zAlpha + zBeta) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))) /
      ((p2 - p1) ** 2)
  )

  return sampleSize
}

/**
 * Identify funnel bottlenecks
 */
export function identifyBottlenecks(funnel: ConversionFunnel): FunnelStep[] {
  return funnel.steps
    .slice(0, -1) // Exclude last step
    .sort((a, b) => b.dropoffRate - a.dropoffRate)
    .slice(0, 3) // Top 3 bottlenecks
}

/**
 * Calculate funnel insights
 */
export interface FunnelInsight {
  step: FunnelStep
  insight: string
  recommendation: string
  priority: 'high' | 'medium' | 'low'
}

export function generateFunnelInsights(funnel: ConversionFunnel): FunnelInsight[] {
  const insights: FunnelInsight[] = []
  const bottlenecks = identifyBottlenecks(funnel)

  for (const step of bottlenecks) {
    let insight = ''
    let recommendation = ''
    let priority: 'high' | 'medium' | 'low' = 'medium'

    if (step.dropoffRate > 50) {
      insight = `High dropoff at "${step.stepName}": ${step.dropoffRate}% of visitors leave`
      priority = 'high'
    } else if (step.dropoffRate > 30) {
      insight = `Moderate dropoff at "${step.stepName}": ${step.dropoffRate}% of visitors leave`
      priority = 'medium'
    } else {
      insight = `Slight dropoff at "${step.stepName}": ${step.dropoffRate}% of visitors leave`
      priority = 'low'
    }

    // Generate recommendations based on step
    if (step.stepName.toLowerCase().includes('form')) {
      recommendation = 'Simplify form fields. Consider multi-step forms or progress indicators.'
    } else if (step.stepName.toLowerCase().includes('checkout')) {
      recommendation = 'Reduce checkout steps. Offer guest checkout and multiple payment options.'
    } else if (step.stepName.toLowerCase().includes('landing')) {
      recommendation = 'Improve headline clarity. Add social proof and clearer CTAs.'
    } else {
      recommendation = `Analyze user behavior on this step. Run heatmaps and session recordings.`
    }

    insights.push({
      step,
      insight,
      recommendation,
      priority,
    })
  }

  return insights
}

/**
 * Segment analysis for conversions
 */
export interface ConversionSegment {
  segmentName: string
  visitors: number
  conversions: number
  conversionRate: number
  trend: 'up' | 'down' | 'stable'
}

export function analyzeConversionSegments(
  segments: ConversionSegment[]
): ConversionSegment[] {
  return segments.sort((a, b) => b.conversionRate - a.conversionRate)
}

/**
 * Calculate lift from variant
 */
export function calculateLift(
  controlConversionRate: number,
  variantConversionRate: number
): number {
  if (controlConversionRate === 0) return 0
  return parseFloat(
    (((variantConversionRate - controlConversionRate) / controlConversionRate) * 100).toFixed(2)
  )
}

/**
 * Revenue impact calculator
 */
export function calculateRevenueImpact(
  currentConversionRate: number,
  projectedConversionRate: number,
  monthlyVisitors: number,
  averageOrderValue: number
): {
  currentRevenue: number
  projectedRevenue: number
  additionalRevenue: number
  percentageIncrease: number
} {
  const currentRevenue = (currentConversionRate / 100) * monthlyVisitors * averageOrderValue
  const projectedRevenue = (projectedConversionRate / 100) * monthlyVisitors * averageOrderValue
  const additionalRevenue = projectedRevenue - currentRevenue
  const percentageIncrease = ((additionalRevenue / currentRevenue) * 100) || 0

  return {
    currentRevenue,
    projectedRevenue,
    additionalRevenue,
    percentageIncrease,
  }
}

/**
 * Identify high-value segments
 */
export function identifyHighValueSegments(segments: ConversionSegment[]): ConversionSegment[] {
  return segments.filter((s) => s.conversionRate > 5).sort((a, b) => b.conversions - a.conversions)
}

/**
 * Generate CRO recommendations
 */
export interface CroRecommendation {
  id: string
  title: string
  description: string
  expectedLift: number // percentage
  effort: 'low' | 'medium' | 'high'
  priority: number // 1-10
  testDuration: number // days
}

export function generateCroRecommendations(metrics: ConversionMetrics): CroRecommendation[] {
  const recommendations: CroRecommendation[] = []

  // Based on conversion rate
  if (metrics.conversionRate < 1) {
    recommendations.push({
      id: 'low-cr-1',
      title: 'Improve form clarity',
      description: 'Reduce form fields and add field labels with descriptions',
      expectedLift: 25,
      effort: 'low',
      priority: 10,
      testDuration: 14,
    })

    recommendations.push({
      id: 'low-cr-2',
      title: 'Add trust signals',
      description: 'Add customer testimonials, reviews, and security badges',
      expectedLift: 20,
      effort: 'low',
      priority: 9,
      testDuration: 14,
    })
  }

  // Based on CAC
  if (metrics.costPerAcquisition > metrics.customerLifetimeValue * 0.3) {
    recommendations.push({
      id: 'cac-1',
      title: 'Optimize landing page',
      description: 'Test different headlines and value propositions',
      expectedLift: 15,
      effort: 'medium',
      priority: 8,
      testDuration: 21,
    })
  }

  // Based on ROAS
  if (metrics.returnOnAdSpend < 3) {
    recommendations.push({
      id: 'roas-1',
      title: 'Improve ad relevance',
      description: 'Test new ad copy variations and audience targeting',
      expectedLift: 30,
      effort: 'medium',
      priority: 9,
      testDuration: 7,
    })
  }

  return recommendations.sort((a, b) => b.priority - a.priority)
}
