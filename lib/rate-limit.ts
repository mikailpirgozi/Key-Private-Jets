import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10)
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)

export function rateLimit(req: NextRequest): { success: boolean; remaining: number } {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()

  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return { success: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  store[ip].count++

  if (store[ip].count > RATE_LIMIT_MAX) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining: RATE_LIMIT_MAX - store[ip].count }
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    const entry = store[key]
    if (entry && now > entry.resetTime) {
      delete store[key]
    }
  })
}, 5 * 60 * 1000)

