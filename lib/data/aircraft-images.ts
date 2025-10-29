/**
 * Aircraft category images from Unsplash
 * Premium private jets for each category
 */

export const AIRCRAFT_IMAGES = {
  'light-jets': {
    main: 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?w=800&h=600&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?w=400&h=300&fit=crop',
    alt: 'Light private jet in flight',
    color: '#D4AF37',
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
 * City images for route cards
 * Each city code maps to iconic skylines and landmarks
 */
export const CITY_IMAGES: Record<string, string> = {
  'NYC': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop',
  'LAX': 'https://images.unsplash.com/photo-1579460979017-a8a6a5a8e496?w=800&h=500&fit=crop',
  'MIA': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  'LAS': 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=800&h=500&fit=crop',
  'CHI': 'https://images.unsplash.com/photo-1576402187392-3901d3a8c869?w=800&h=500&fit=crop',
  'DAL': 'https://images.unsplash.com/photo-1522869635100-ce306e08b86d?w=800&h=500&fit=crop',
  'SFO': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=500&fit=crop',
  'BOS': 'https://images.unsplash.com/photo-1599996410246-05798589b718?w=800&h=500&fit=crop',
  'HOU': 'https://images.unsplash.com/photo-1599505667736-f4937fb33c33?w=800&h=500&fit=crop',
  'DEN': 'https://images.unsplash.com/photo-1510784519987-3d71bcdd1f11?w=800&h=500&fit=crop',
  'SEA': 'https://images.unsplash.com/photo-1606214174585-fe31582dc1d4?w=800&h=500&fit=crop',
  'MCI': 'https://images.unsplash.com/photo-1549144611-11a5f7a9a8d5?w=800&h=500&fit=crop',
}

/**
 * Get city image by city code
 * Used for route cards to display destination skylines
 */
export function getCityImage(cityCode: string): string {
  return CITY_IMAGES[cityCode] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop'
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
export const VALUE_IMAGES: Record<string, string> = {
  'safety': 'https://images.unsplash.com/photo-1552093917-db0afd45e916?w=400&h=400&fit=crop',
  'quality': 'https://images.unsplash.com/photo-1505316714823-8ad7e4e4b300?w=400&h=400&fit=crop',
  'speed': 'https://images.unsplash.com/photo-1551632786-de41ec08fc6d?w=400&h=400&fit=crop',
  'reach': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=400&fit=crop',
}

/**
 * Empty leg deal images mapped to routes
 * Images of luxury aircraft and destinations for empty leg deals
 */
export const EMPTY_LEG_IMAGES: Record<string, string> = {
  'newyork-miami': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  'losangeles-lasvegas': 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=600&h=400&fit=crop',
  'chicago-newyork': 'https://images.unsplash.com/photo-1576402187392-3901d3a8c869?w=600&h=400&fit=crop',
}

/**
 * Get value image by value type
 */
export function getValueImage(valueType: string): string {
  return VALUE_IMAGES[valueType] || VALUE_IMAGES['quality']
}

/**
 * Get empty leg deal image by route
 */
export function getEmptyLegImage(routeKey: string): string {
  return EMPTY_LEG_IMAGES[routeKey] || 'https://images.unsplash.com/photo-1540962351516-ee8131d9ed72?w=600&h=400&fit=crop'
}
