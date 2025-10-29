'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BLOG_POSTS, BlogPost } from '@/lib/data/blog'
import { Search } from 'lucide-react'

const CATEGORY_LABELS = {
  cost: { label: 'Cost & Pricing', color: 'bg-blue-100 text-blue-800' },
  howto: { label: 'How-To Guides', color: 'bg-green-100 text-green-800' },
  comparison: { label: 'Comparisons', color: 'bg-purple-100 text-purple-800' },
  guide: { label: 'Destination Guides', color: 'bg-orange-100 text-orange-800' },
}

export default function BlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-playfair text-primary-900 mb-6">
            Private Jet <span className="text-gradient-gold">Blog & Guides</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Expert insights on private jet charter costs, booking strategies, aircraft comparisons, and luxury travel destinations.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !selectedCategory
                  ? 'bg-gold-500 text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gold-500'
              }`}
            >
              All Articles
            </button>
            {Object.entries(CATEGORY_LABELS).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === key
                    ? 'bg-gold-500 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gold-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-gray-600 text-sm mt-4">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-12">
            <p className="text-2xl font-bold text-gray-700 mb-4">No articles found</p>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const categoryInfo = CATEGORY_LABELS[post.category]

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gold-200 to-blue-200 flex items-center justify-center text-6xl">
            📰
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category Badge */}
          <span className={`inline-block ${categoryInfo.color} text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit`}>
            {categoryInfo.label}
          </span>

          {/* Title */}
          <h2 className="text-xl font-bold font-playfair text-primary-900 mb-3 line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {post.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-4">
            <span>{post.author}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
