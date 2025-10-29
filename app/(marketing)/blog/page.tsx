import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar, User } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = generatePageMetadata({
  title: 'Private Jet Charter Blog - News & Guides',
  description: 'Expert insights on private jet charter, empty leg flights, luxury aviation, and travel tips from KeyPrivateJet.',
  keywords: [
    'private jet blog',
    'aviation news',
    'charter tips',
    'luxury travel',
    'empty leg flights',
  ],
  canonical: 'https://keyprivatejet.com/blog',
})

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: number
  image?: string
  featured?: boolean
}

// Sample blog posts - will be replaced with database query
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How Much Does a Private Jet Cost? Complete 2025 Guide',
    slug: 'how-much-does-private-jet-cost',
    excerpt: 'Comprehensive breakdown of private jet charter costs, including hourly rates for all aircraft types.',
    category: 'Guide',
    author: 'KeyPrivateJet Team',
    date: '2025-10-29',
    readTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Private Jet vs First Class: Which is Better?',
    slug: 'private-jet-vs-first-class',
    excerpt: 'Detailed comparison of private aviation vs commercial first class for business and leisure travel.',
    category: 'Comparison',
    author: 'Travel Expert',
    date: '2025-10-28',
    readTime: 6,
    featured: true,
  },
  {
    id: '3',
    title: 'Top 10 Private Jet Routes in the US',
    slug: 'top-private-jet-routes-us',
    excerpt: 'Most popular private jet routes with pricing, flight times, and why they\'re so popular.',
    category: 'Routes',
    author: 'Aviation Specialist',
    date: '2025-10-27',
    readTime: 7,
  },
  {
    id: '4',
    title: 'Empty Leg Flights: How to Save 75%',
    slug: 'empty-leg-flights-save-money',
    excerpt: 'Discover how empty leg flights work and how to find deals saving up to 75% on charter costs.',
    category: 'Money-Saving',
    author: 'KeyPrivateJet Team',
    date: '2025-10-26',
    readTime: 5,
  },
  {
    id: '5',
    title: 'Private Jet Charter for Business Travel',
    slug: 'private-jet-business-travel',
    excerpt: 'Why executives and entrepreneurs prefer private jet charters for business travel.',
    category: 'Business',
    author: 'Business Consultant',
    date: '2025-10-25',
    readTime: 9,
  },
  {
    id: '6',
    title: 'What to Know Before Your First Private Jet Flight',
    slug: 'first-private-jet-flight-guide',
    excerpt: 'First-time private jet charter tips, what to expect, and how to prepare.',
    category: 'Beginner',
    author: 'KeyPrivateJet Team',
    date: '2025-10-24',
    readTime: 6,
  },
]

const categories = [
  { name: 'All Posts', value: 'all' },
  { name: 'Guides', value: 'guide' },
  { name: 'Routes', value: 'routes' },
  { name: 'Money-Saving', value: 'money-saving' },
  { name: 'Business', value: 'business' },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-playfair text-4xl font-bold md:text-5xl">
            Private Jet Charter Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-100">
            Expert insights, tips, and news about private aviation, luxury travel, and charter flights.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 font-playfair text-3xl font-bold text-primary-900">
              Featured Articles
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden border-primary-100 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-xs text-gray-500">{post.readTime} min read</span>
                      </div>
                      <CardTitle className="font-playfair text-2xl hover:text-gold-500">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between">
                      <p className="mb-4 text-gray-600">{post.excerpt}</p>
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="text-sm text-gray-500">
                          <Calendar className="mb-1 inline h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <ArrowRight className="h-4 w-4 text-gold-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-playfair text-3xl font-bold text-primary-900">
            Latest Articles
          </h2>

          {/* Categories Filter */}
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={cat.value === 'all' ? 'default' : 'outline'}
                className={cat.value === 'all' ? 'bg-gold-500 hover:bg-gold-600 text-primary-900' : ''}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden border-primary-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="col-span-3 p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.readTime} min read</span>
                      </div>
                      <h3 className="mb-2 font-playfair text-xl font-bold hover:text-gold-500">
                        {post.title}
                      </h3>
                      <p className="mb-4 text-gray-600">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center bg-primary-100 p-6">
                      <ArrowRight className="h-6 w-6 text-gold-500" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More / Pagination */}
          <div className="mt-12 text-center">
            <Button className="bg-gold-500 hover:bg-gold-600 text-primary-900">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-950 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-playfair text-3xl font-bold">
            Get Aviation News in Your Inbox
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-100">
            Subscribe to our newsletter for weekly tips, industry insights, and exclusive deals on private jet charters.
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded px-4 py-2 text-primary-900"
            />
            <Button className="bg-gold-500 hover:bg-gold-600 text-primary-900">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
