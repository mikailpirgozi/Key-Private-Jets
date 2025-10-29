/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  images: {
    domains: ['keyprivatejet.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

// Sentry configuration (only if SENTRY_AUTH_TOKEN is set)
if (process.env.SENTRY_AUTH_TOKEN) {
  try {
    const { withSentryConfig } = require('@sentry/nextjs')
    
    if (typeof withSentryConfig === 'function') {
      module.exports = withSentryConfig(nextConfig, {
        silent: true,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      })
    } else {
      module.exports = nextConfig
    }
  } catch (error) {
    console.warn('Sentry configuration failed, using default Next.js config')
    module.exports = nextConfig
  }
} else {
  module.exports = nextConfig
}

