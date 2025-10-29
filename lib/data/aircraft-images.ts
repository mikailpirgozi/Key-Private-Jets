/**
 * Aircraft category images from Unsplash
 * Premium private jets for each category
 */

export const AIRCRAFT_IMAGES = {
  'light-jets': {
    main: '/images/jets/light-jet.svg',
    thumb: '/images/jets/light-jet.svg',
    alt: 'Light private jet in flight',
    color: '#D4AF37',
  },
  'midsize-jets': {
    main: '/images/jets/midsize-jet.svg',
    thumb: '/images/jets/midsize-jet.svg',
    alt: 'Midsize private jet',
    color: '#E6C200',
  },
  'super-midsize-jets': {
    main: '/images/jets/super-midsize-jet.svg',
    thumb: '/images/jets/super-midsize-jet.svg',
    alt: 'Super midsize luxury jet',
    color: '#F0AD4E',
  },
  'heavy-jets': {
    main: '/images/jets/heavy-jet.svg',
    thumb: '/images/jets/heavy-jet.svg',
    alt: 'Heavy luxury private jet',
    color: '#FFD700',
  },
} as const

/**
 * City images for route cards
 * Each city code maps to iconic skylines and landmarks
 */
export const CITY_IMAGES: Record<string, string> = {
  'NYC': '/images/cities/nyc.svg',
  'LAX': '/images/cities/lax.svg',
  'MIA': '/images/cities/mia.svg',
  'LAS': '/images/cities/las.svg',
  'CHI': '/images/cities/chi.svg',
  'DAL': '/images/cities/dal.svg',
  'SFO': '/images/cities/sfo.svg',
  'BOS': '/images/cities/bos.svg',
  'HOU': '/images/cities/hou.svg',
  'DEN': '/images/cities/den.svg',
  'SEA': '/images/cities/sea.svg',
  'MCI': '/images/cities/mci.svg',
}

/**
 * Get city image by city code
 * Used for route cards to display destination skylines
 */
export function getCityImage(cityCode: string): string {
  return CITY_IMAGES[cityCode] || '/images/cities/default-city.svg'
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
  'safety': '/images/values/safety.svg',
  'quality': '/images/values/quality.svg',
  'speed': '/images/values/speed.svg',
  'reach': '/images/values/reach.svg',
} as const

/**
 * Empty leg deal images mapped to routes
 * Images of luxury aircraft and destinations for empty leg deals
 */
export const EMPTY_LEG_IMAGES: Record<string, string> = {
  'newyork-miami': '/images/cities/mia.svg',
  'losangeles-lasvegas': '/images/cities/las.svg',
  'chicago-newyork': '/images/cities/chi.svg',
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
  return EMPTY_LEG_IMAGES[routeKey] || '/images/jets/light-jet.svg'
}
