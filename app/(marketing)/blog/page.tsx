import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Private Jet Charter Blog - Tips, Guides & Insights | KeyPrivateJet',
  description: 'Read expert guides on private jet charter costs, booking tips, aircraft comparisons, and destination guides. Learn everything about luxury travel.',
  keywords: [
    'private jet blog',
    'charter guides',
    'aviation tips',
    'travel guides',
    'luxury travel',
  ],
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com'}/blog`,
  ogImage: '/images/og-blog.jpg',
})

import BlogPageClient from './blog-page-client'

export default function BlogPage() {
  return <BlogPageClient />
}
