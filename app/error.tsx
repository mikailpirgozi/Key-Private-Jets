'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold font-playfair text-primary-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We apologize for the inconvenience. An unexpected error has occurred. Please try again or
          contact us if the problem persists.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md text-left">
            <p className="text-sm font-mono text-red-800">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-primary-900"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </a>
          </Button>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Need help?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
              className="text-gold-500 hover:text-gold-600 text-sm font-medium"
            >
              Call {process.env.NEXT_PUBLIC_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${process.env.ADMIN_EMAIL}`}
              className="text-gold-500 hover:text-gold-600 text-sm font-medium"
            >
              Email Support
            </a>
            <a
              href="/contact"
              className="text-gold-500 hover:text-gold-600 text-sm font-medium"
            >
              Contact Form
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

