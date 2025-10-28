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

