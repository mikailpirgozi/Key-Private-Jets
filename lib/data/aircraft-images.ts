/**
 * Aircraft category images from Unsplash
 * Premium private jets for each category
 */

export const AIRCRAFT_IMAGES = {
  'light-jets': {
    main: 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    thumb: 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Light private jet in flight',
    color: '#D4AF37',
  },
  'midsize-jets': {
    main: 'https://images.unsplash.com/photo-1583391733183-6ceee0b8e2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    thumb: 'https://images.unsplash.com/photo-1583391733183-6ceee0b8e2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Midsize private jet',
    color: '#E6C200',
  },
  'super-midsize-jets': {
    main: 'https://images.unsplash.com/photo-1550355291-bbee04a37971?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    thumb: 'https://images.unsplash.com/photo-1550355291-bbee04a37971?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Super midsize luxury jet',
    color: '#F0AD4E',
  },
  'heavy-jets': {
    main: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    alt: 'Heavy luxury private jet',
    color: '#FFD700',
  },
} as const

/**
 * City images for route cards
 * Each city code maps to iconic skylines and landmarks
 */
export const CITY_IMAGES: Record<string, string> = {
  'NYC': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'LAX': 'https://images.unsplash.com/photo-1579460979017-a8a6a5a8e496?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'MIA': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'LAS': 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'CHI': 'https://images.unsplash.com/photo-1576402187392-3901d3a8c869?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'DAL': 'https://images.unsplash.com/photo-1522869635100-ce306e08b86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'SFO': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'BOS': 'https://images.unsplash.com/photo-1599996410246-05798589b718?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'HOU': 'https://images.unsplash.com/photo-1599505667736-f4937fb33c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'DEN': 'https://images.unsplash.com/photo-1510784519987-3d71bcdd1f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'SEA': 'https://images.unsplash.com/photo-1606214174585-fe31582dc1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
  'MCI': 'https://images.unsplash.com/photo-1549144611-11a5f7a9a8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
}

/**
 * Get city image by city code
 * Used for route cards to display destination skylines
 */
export function getCityImage(cityCode: string): string {
  return CITY_IMAGES[cityCode] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500'
}

/**
 * Get aircraft image by category slug
 */
export function getAircraftImage(categorySlug: string) {
  const key = categorySlug as keyof typeof AIRCRAFT_IMAGES
  return AIRCRAFT_IMAGES[key] || AIRCRAFT_IMAGES['midsize-jets']
}

/**
 * Value icon images for About page
 * Representing key business values with premium imagery
 */
export const VALUE_IMAGES = {
  'safety': 'https://images.unsplash.com/photo-1552093917-db0afd45e916?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
  'quality': 'https://images.unsplash.com/photo-1505316714823-8ad7e4e4b300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
  'speed': 'https://images.unsplash.com/photo-1551632786-de41ec08fc6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
  'reach': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
} as const

/**
 * Empty leg deal images mapped to routes
 * Images of luxury aircraft and destinations for empty leg deals
 */
export const EMPTY_LEG_IMAGES: Record<string, string> = {
  'newyork-miami': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
  'losangeles-lasvegas': 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
  'chicago-newyork': 'https://images.unsplash.com/photo-1576402187392-3901d3a8c869?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
}

/**
 * Get value image by value type
 */
export function getValueImage(valueType: string): string {
  const image = VALUE_IMAGES[valueType as keyof typeof VALUE_IMAGES]
  return image || VALUE_IMAGES['quality']
}

/**
 * Get empty leg deal image by route
 */
export function getEmptyLegImage(routeKey: string): string {
  return EMPTY_LEG_IMAGES[routeKey] || 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
}
