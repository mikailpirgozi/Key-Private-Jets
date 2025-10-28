import { Route } from '@/types'
import { PriceDisplay } from './price-display'
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface RouteCardProps {
  route: Route
}

export function RouteCard({ route }: RouteCardProps) {
  return (
    <Link href={`/routes/${route.slug}`} className="block group">
      <div className="luxury-card p-6 h-full flex flex-col relative overflow-hidden">
        {/* Gold accent corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-gold opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-playfair text-2xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
              {route.from}
            </h3>
            <ArrowRight className="h-6 w-6 text-gold-500 group-hover:translate-x-1 transition-transform duration-300" />
            <h3 className="font-playfair text-2xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
              {route.to}
            </h3>
          </div>
          
          {/* Decorative line */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </div>

        {/* Details */}
        <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-500" />
            <span>{route.distance} miles</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold-500" />
            <span>{route.flightTime}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <PriceDisplay
            from={route.pricing.lightJet.from}
            to={route.pricing.heavyJet.to}
            label="Starting from"
          />
        </div>

        {/* Hover effect button */}
        <div className="mt-4 flex items-center justify-center gap-2 py-3 bg-gold-500/10 border border-gold-500/30 rounded-lg text-gold-400 font-semibold group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300">
          <span>View Details</span>
          <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  )
}

