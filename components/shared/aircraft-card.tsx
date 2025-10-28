import { Aircraft } from '@/types'
import { PriceDisplay } from './price-display'
import { Users, Gauge, MapPin, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface AircraftCardProps {
  aircraft: Aircraft
}

export function AircraftCard({ aircraft }: AircraftCardProps) {
  return (
    <Link href={`/aircraft/${aircraft.slug}`} className="block group">
      <div className="luxury-card p-6 h-full flex flex-col relative overflow-hidden">
        {/* Gold accent corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-gold opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
        
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-playfair text-2xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
            {aircraft.name}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">{aircraft.description}</p>
          
          {/* Decorative line */}
          <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mt-4" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col items-center gap-2 p-3 bg-luxury-black-lighter border border-gold-500/20 rounded-lg group-hover:border-gold-500/40 transition-colors duration-300">
            <Users className="h-5 w-5 text-gold-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">Capacity</span>
            <span className="font-bold text-white">{aircraft.capacity}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-luxury-black-lighter border border-gold-500/20 rounded-lg group-hover:border-gold-500/40 transition-colors duration-300">
            <MapPin className="h-5 w-5 text-gold-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">Range</span>
            <span className="font-bold text-white">{aircraft.range}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-luxury-black-lighter border border-gold-500/20 rounded-lg group-hover:border-gold-500/40 transition-colors duration-300">
            <Gauge className="h-5 w-5 text-gold-500" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">Speed</span>
            <span className="font-bold text-white">{aircraft.speed}</span>
          </div>
        </div>
        
        {/* Models */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Popular Models</p>
          <div className="flex flex-wrap gap-2">
            {aircraft.models.slice(0, 3).map((model) => (
              <span 
                key={model} 
                className="px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs text-gold-400 font-medium"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
        
        {/* Price */}
        <div className="mt-auto mb-4">
          <PriceDisplay
            from={aircraft.hourlyRate.from}
            to={aircraft.hourlyRate.to}
            label="Hourly Rate"
          />
        </div>

        {/* Hover effect button */}
        <div className="flex items-center justify-center gap-2 py-3 bg-gold-500/10 border border-gold-500/30 rounded-lg text-gold-400 font-semibold group-hover:bg-gold-500/20 group-hover:border-gold-400/50 transition-all duration-300">
          <span>Learn More</span>
          <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  )
}

