import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SITE_NAME = 'KeyPrivateJet'
process.env.NEXT_PUBLIC_PHONE = '+18555558888'
process.env.NEXT_PUBLIC_PHONE_DISPLAY = '(855) 555-8888'

