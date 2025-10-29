// Web Vitals tracking
export function reportWebVitals(metric: {
  id: string
  name: string
  label: string
  value: number
}): void {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
}

// Custom performance marks
export function markPerformance(name: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(name)
  }
}

export function measurePerformance(name: string, startMark: string, endMark: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.measure(name, startMark, endMark)

    const measure = window.performance.getEntriesByName(name)[0]

    // Send to analytics
    if (window.gtag && measure) {
      window.gtag('event', 'timing_complete', {
        name: name,
        value: Math.round(measure.duration),
        event_category: 'Performance',
      })
    }
  }
}

declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      options?: Record<string, unknown>
    ) => void
  }
}

