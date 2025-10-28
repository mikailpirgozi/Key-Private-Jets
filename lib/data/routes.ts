import { Route } from '@/types'

export const POPULAR_ROUTES: Route[] = [
  {
    id: '1',
    from: 'NYC',
    to: 'MIA',
    distance: 1280,
    flightTime: '2h 45m',
    slug: 'new-york-to-miami',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 28000, to: 35000 },
    },
    popular: true,
  },
  {
    id: '2',
    from: 'LAX',
    to: 'LAS',
    distance: 270,
    flightTime: '1h 10m',
    slug: 'los-angeles-to-las-vegas',
    pricing: {
      lightJet: { from: 3500, to: 5000 },
      midsizeJet: { from: 5500, to: 7500 },
      superMidsize: { from: 7500, to: 9500 },
      heavyJet: { from: 10000, to: 13000 },
    },
    popular: true,
  },
  {
    id: '3',
    from: 'NYC',
    to: 'LAX',
    distance: 2475,
    flightTime: '5h 30m',
    slug: 'new-york-to-los-angeles',
    pricing: {
      lightJet: { from: 25000, to: 32000 },
      midsizeJet: { from: 35000, to: 42000 },
      superMidsize: { from: 42000, to: 52000 },
      heavyJet: { from: 55000, to: 70000 },
    },
    popular: true,
  },
  {
    id: '4',
    from: 'CHI',
    to: 'NYC',
    distance: 740,
    flightTime: '2h 0m',
    slug: 'chicago-to-new-york',
    pricing: {
      lightJet: { from: 8000, to: 11000 },
      midsizeJet: { from: 12000, to: 15000 },
      superMidsize: { from: 16000, to: 20000 },
      heavyJet: { from: 22000, to: 28000 },
    },
    popular: true,
  },
  {
    id: '5',
    from: 'DAL',
    to: 'LAX',
    distance: 1240,
    flightTime: '2h 50m',
    slug: 'dallas-to-los-angeles',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 27000, to: 34000 },
    },
    popular: true,
  },
  {
    id: '6',
    from: 'MIA',
    to: 'NYC',
    distance: 1280,
    flightTime: '2h 50m',
    slug: 'miami-to-new-york',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 28000, to: 35000 },
    },
    popular: true,
  },
  {
    id: '7',
    from: 'SFO',
    to: 'LAX',
    distance: 340,
    flightTime: '1h 20m',
    slug: 'san-francisco-to-los-angeles',
    pricing: {
      lightJet: { from: 4500, to: 6000 },
      midsizeJet: { from: 6500, to: 8500 },
      superMidsize: { from: 9000, to: 11000 },
      heavyJet: { from: 12000, to: 15000 },
    },
    popular: true,
  },
  {
    id: '8',
    from: 'BOS',
    to: 'MIA',
    distance: 1260,
    flightTime: '3h 0m',
    slug: 'boston-to-miami',
    pricing: {
      lightJet: { from: 11000, to: 14000 },
      midsizeJet: { from: 15000, to: 19000 },
      superMidsize: { from: 20000, to: 25000 },
      heavyJet: { from: 27000, to: 34000 },
    },
    popular: true,
  },
]

export function getRouteBySlug(slug: string): Route | undefined {
  return POPULAR_ROUTES.find(route => route.slug === slug)
}

export function getRoutesBetweenCities(from: string, to: string): Route | undefined {
  return POPULAR_ROUTES.find(route => 
    (route.from === from && route.to === to) ||
    (route.from === to && route.to === from)
  )
}

export function getPopularRoutes(limit: number = 8): Route[] {
  return POPULAR_ROUTES.filter(route => route.popular).slice(0, limit)
}

