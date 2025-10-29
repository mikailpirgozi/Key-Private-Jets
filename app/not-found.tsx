import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, Plane } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold font-playfair text-primary-900 opacity-10">
              404
            </h1>
            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-gold-500" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-4xl font-bold font-playfair text-primary-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have been moved or
          doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-primary-900">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#quote">
              <Search className="mr-2 h-5 w-5" />
              Get a Quote
            </Link>
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/routes" className="text-gold-500 hover:text-gold-600 text-sm font-medium">
              Popular Routes
            </Link>
            <Link href="/aircraft" className="text-gold-500 hover:text-gold-600 text-sm font-medium">
              Aircraft Categories
            </Link>
            <Link href="/empty-legs" className="text-gold-500 hover:text-gold-600 text-sm font-medium">
              Empty Leg Deals
            </Link>
            <Link href="/contact" className="text-gold-500 hover:text-gold-600 text-sm font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

