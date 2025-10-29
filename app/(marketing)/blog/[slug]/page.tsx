import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostBySlug, getRelatedBlogPosts, BLOG_POSTS } from '@/lib/data/blog'
import { generatePageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generateFAQSchema, injectSchema } from '@/lib/schema'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'

interface BlogArticleProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: 'noindex',
    }
  }

  return generatePageMetadata({
    title: `${post.title} | KeyPrivateJet Blog`,
    description: post.description,
    keywords: post.keywords,
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://keyprivatejet.com'}/blog/${post.slug}`,
    ogImage: post.image,
  })
}

const CATEGORY_COLORS = {
  cost: { bg: 'bg-blue-100', text: 'text-blue-800' },
  howto: { bg: 'bg-green-100', text: 'text-green-800' },
  comparison: { bg: 'bg-purple-100', text: 'text-purple-800' },
  guide: { bg: 'bg-orange-100', text: 'text-orange-800' },
}

const CATEGORY_LABELS = {
  cost: 'Cost & Pricing',
  howto: 'How-To Guides',
  comparison: 'Comparisons',
  guide: 'Destination Guides',
}

export default function BlogArticlePage({ params }: BlogArticleProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(post.id, 3)
  const categoryColor = CATEGORY_COLORS[post.category]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  const faqSchema = generateFAQSchema(
    post.keywords.map((kw) => ({
      question: `What is ${kw}?`,
      answer: post.content.substring(0, 200) + '...',
    }))
  )

  return (
    <>
      {injectSchema(breadcrumbSchema)}
      {injectSchema(faqSchema)}

      <div className="bg-white">
        {/* Back Link */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-semibold">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-block ${categoryColor.bg} ${categoryColor.text} text-xs font-bold px-4 py-1 rounded-full`}>
                {CATEGORY_LABELS[post.category]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold font-playfair text-primary-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gold-500" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gold-500" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold-500" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-96 bg-gradient-to-br from-gold-200 to-blue-200 rounded-lg mb-12 flex items-center justify-center text-8xl">
              📰
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {post.description}
              </p>

              <div className="bg-gray-50 border-l-4 border-gold-500 p-6 my-8 rounded">
                <p className="text-gray-800 leading-relaxed">{post.content}</p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-blue-50 p-8 rounded-lg my-8">
                <h3 className="text-2xl font-bold font-playfair text-primary-900 mb-4">Key Takeaways</h3>
                <ul className="space-y-3">
                  {post.keywords.slice(0, 4).map((keyword, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{keyword}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-gold-500/10 to-blue-500/10 p-8 rounded-lg my-8">
                <h3 className="text-2xl font-bold font-playfair text-primary-900 mb-4">Ready to Charter a Private Jet?</h3>
                <p className="text-gray-700 mb-6">Get instant quotes from top operators. Our experts are available 24/7.</p>
                <Link href="/#quote" className="inline-block bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                  Get Instant Quote
                </Link>
              </div>
            </div>

            {/* Keywords */}
            <div className="mb-12 pb-12 border-b border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-4">Related Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, idx) => (
                  <Link key={idx} href={`/blog?search=${encodeURIComponent(keyword)}`}>
                    <span className="inline-block bg-gray-100 hover:bg-gold-100 text-primary-900 px-4 py-2 rounded-full text-sm transition-colors">
                      {keyword}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-12 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold font-playfair text-primary-900 mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                        <div className="w-full h-40 bg-gradient-to-br from-gold-200 to-blue-200 flex items-center justify-center text-5xl">
                          📰
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-bold font-playfair text-primary-900 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 flex-1 mb-3">
                            {relatedPost.description}
                          </p>
                          <div className="text-xs text-gray-500">
                            {relatedPost.readTime} min read
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Author Section */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold font-playfair text-primary-900 mb-3">About the Author</h3>
            <p className="text-gray-700 mb-4">
              {post.author} is an expert in private aviation with years of experience helping clients find the perfect charter solutions. Their insights help thousands of travelers make informed decisions about luxury travel.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
