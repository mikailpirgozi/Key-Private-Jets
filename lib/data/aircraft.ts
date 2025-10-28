import { Aircraft } from '@/types'

export const AIRCRAFT_CATEGORIES: Aircraft[] = [
  {
    category: 'light-jets',
    name: 'Light Jets',
    models: ['Cessna Citation CJ3', 'Learjet 45', 'Phenom 300', 'Citation M2'],
    capacity: '4-7 passengers',
    range: '1,500-2,000 miles',
    speed: '400-450 mph',
    hourlyRate: { from: 2500, to: 4000 },
    features: [
      'Perfect for short to medium flights',
      'Cost-effective option',
      'Access to smaller airports',
      'Ideal for business travelers',
    ],
    idealFor: [
      'Regional business trips',
      'Weekend getaways',
      'Small groups',
      'Budget-conscious travelers',
    ],
    description: 'Light jets offer the perfect balance of comfort and economy for short to medium-range flights. Ideal for 4-7 passengers traveling regionally.',
    slug: 'light-jets',
  },
  {
    category: 'midsize-jets',
    name: 'Midsize Jets',
    models: ['Citation XLS', 'Hawker 900XP', 'Learjet 60', 'Citation Sovereign'],
    capacity: '6-8 passengers',
    range: '2,000-3,000 miles',
    speed: '450-500 mph',
    hourlyRate: { from: 4000, to: 6000 },
    features: [
      'Stand-up cabin',
      'Full galley',
      'Enclosed lavatory',
      'Cross-country capability',
    ],
    idealFor: [
      'Coast-to-coast flights',
      'Business groups',
      'Family vacations',
      'Extended trips',
    ],
    description: 'Midsize jets are the most popular choice worldwide, offering the best price-to-comfort ratio with stand-up cabins and transcontinental range.',
    slug: 'midsize-jets',
  },
  {
    category: 'super-midsize-jets',
    name: 'Super Midsize Jets',
    models: ['Challenger 300', 'Citation X', 'Gulfstream G200', 'Falcon 2000'],
    capacity: '8-10 passengers',
    range: '3,000-4,000 miles',
    speed: '500-600 mph',
    hourlyRate: { from: 5500, to: 8000 },
    features: [
      'Spacious stand-up cabin',
      'Long-range capability',
      'Premium amenities',
      'Faster cruise speeds',
    ],
    idealFor: [
      'International trips',
      'Large groups',
      'Executive travel',
      'Long-haul flights',
    ],
    description: 'Super midsize jets deliver exceptional range and speed, perfect for transcontinental and international flights with maximum comfort.',
    slug: 'super-midsize-jets',
  },
  {
    category: 'heavy-jets',
    name: 'Heavy Jets',
    models: ['Gulfstream G550', 'Global 6000', 'Falcon 7X', 'Challenger 605'],
    capacity: '10-16 passengers',
    range: '4,000-7,500+ miles',
    speed: '500-600 mph',
    hourlyRate: { from: 8000, to: 15000 },
    features: [
      'Ultra-luxurious cabins',
      'Full galley & crew',
      'Multiple living areas',
      'Global range capability',
    ],
    idealFor: [
      'International travel',
      'Large delegations',
      'Ultra-long flights',
      'Maximum luxury',
    ],
    description: 'Heavy jets represent the pinnacle of private aviation, offering unmatched luxury, range, and comfort for transcontinental and intercontinental travel.',
    slug: 'heavy-jets',
  },
]

export function getAircraftBySlug(slug: string): Aircraft | undefined {
  return AIRCRAFT_CATEGORIES.find(aircraft => aircraft.slug === slug)
}

export function getAircraftByCategory(category: string): Aircraft | undefined {
  return AIRCRAFT_CATEGORIES.find(aircraft => aircraft.category === category)
}

