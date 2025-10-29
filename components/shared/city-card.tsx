import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Plane } from 'lucide-react'
import type { City } from '@/types'

interface CityCardProps {
  city: City
  className?: string
}

/**
 * Reusable city display card component
 * Used on charter pages and city listings
 */
export function CityCard({ city, className = '' }: CityCardProps) {
  return (
    <Card className={`group overflow-hidden border-primary-100 hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 ${className}`}>
      {/* City Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-900 to-primary-950">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="h-16 w-16 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
        </div>
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-playfair text-2xl font-bold text-white">
            {city.name}
          </h3>
          <p className="text-sm text-gray-300">
            {city.state}
          </p>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Plane className="h-4 w-4 text-gold-500" />
              <span>{city.airports.join(', ')}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {city.description}
        </p>

        <Button
          asChild
          className="w-full bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold"
        >
          <Link href={`/charter/${city.slug}`}>
            View Charter Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * Compact version for listings
 */
export function CityCardCompact({ city, className = '' }: CityCardProps) {
  return (
    <Link
      href={`/charter/${city.slug}`}
      className={`group block p-4 rounded-lg border border-primary-100 hover:border-gold-500/50 hover:shadow-lg transition-all ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-900 to-primary-950 flex items-center justify-center">
          <MapPin className="h-6 w-6 text-gold-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-primary-900 group-hover:text-gold-600 transition-colors">
            {city.name}
          </h4>
          <p className="text-sm text-gray-600 truncate">
            {city.state} • {city.airports[0]}
          </p>
        </div>
        <Plane className="h-5 w-5 text-gray-400 group-hover:text-gold-500 transition-colors flex-shrink-0" />
      </div>
    </Link>
  )
}

