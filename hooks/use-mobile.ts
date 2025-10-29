'use client'

import { useEffect, useState } from 'react'
import { BREAKPOINTS } from '@/lib/constants'

/**
 * Hook to detect if the current device is mobile
 * Based on viewport width, not user agent
 */
export function useMobile(breakpoint: number = BREAKPOINTS.md) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

/**
 * Hook to detect tablet devices
 */
export function useTablet() {
  return useMobile(BREAKPOINTS.lg) && !useMobile(BREAKPOINTS.md)
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS | 'xs'>('xs')

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth

      if (width >= BREAKPOINTS['2xl']) {
        setBreakpoint('2xl')
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint('xl')
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint('lg')
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint('md')
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint('sm')
      } else {
        setBreakpoint('xs')
      }
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)

    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  return breakpoint
}

/**
 * Hook to detect device type (mobile/tablet/desktop)
 */
export function useDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const isMobile = useMobile(BREAKPOINTS.md)
  const isTablet = useTablet()

  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

