/**
 * Aircraft category images from Unsplash
 * Used throughout the site for aircraft cards and route details
 */

export const AIRCRAFT_IMAGES = {
  'light-jets': {
    main: 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?w=400&h=300&fit=crop',
    alt: 'Light private jet in flight',
    color: '#D4AF37', // Gold accent
  },
  'midsize-jets': {
    main: 'https://images.unsplash.com/photo-1583391733183-6ceee0b8e2c0?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1583391733183-6ceee0b8e2c0?w=400&h=300&fit=crop',
    alt: 'Midsize private jet',
    color: '#E6C200',
  },
  'super-midsize-jets': {
    main: 'https://images.unsplash.com/photo-1550355291-bbee04a37971?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1550355291-bbee04a37971?w=400&h=300&fit=crop',
    alt: 'Super midsize luxury jet',
    color: '#F0AD4E',
  },
  'heavy-jets': {
    main: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    alt: 'Heavy luxury private jet',
    color: '#FFD700',
  },
} as const

/**
 * Route images - generic luxury aviation
 * Used for route cards to add visual interest
 */
export const ROUTE_IMAGES = [
  'https://images.unsplash.com/photo-1479966405531-bebdecea4cdb?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551632786-de41ec08fc6d?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1550355291-bbee04a37971?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1583391733183-6ceee0b8e2c0?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1583391733183-6ceee0b8e2c0?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop',
]

/**
 * Get route image by index - cycles through available images
 */
export function getRouteImage(index: number) {
  return ROUTE_IMAGES[index % ROUTE_IMAGES.length]
}

/**
 * Get aircraft image by category slug
 */
export function getAircraftImage(categorySlug: string) {
  const key = categorySlug as keyof typeof AIRCRAFT_IMAGES
  return AIRCRAFT_IMAGES[key] || AIRCRAFT_IMAGES['midsize-jets']
}
