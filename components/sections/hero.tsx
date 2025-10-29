'use client'

import { useState } from 'react'
import { Plane, MapPin, Calendar, Users, ArrowRight, Search, TrendingUp, Sparkles, Clock, Shield, Star } from 'lucide-react'

export function Hero() {
  const [searchMode, setSearchMode] = useState<'search' | 'form'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [passengers, setPassengers] = useState('4')

  const popularRoutes = [
    { from: 'New York', to: 'Miami', price: '$11K', time: '2h 45m', savings: 'Save $3K' },
    { from: 'Los Angeles', to: 'Las Vegas', price: '$4.5K', time: '1h 15m', savings: 'Save $1.2K' },
    { from: 'Chicago', to: 'New York', price: '$9K', time: '2h 30m', savings: 'Save $2.5K' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-luxury-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge - Compact */}
          <div className="text-center mb-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500/20 via-gold-500/30 to-gold-500/20 border border-gold-500/40 rounded-full backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-gold-400 animate-pulse" />
              <span className="text-gradient-gold font-semibold text-xs">Premium Private Jet Charter</span>
              <Plane className="h-4 w-4 text-gold-400" />
            </div>
          </div>

          {/* Main Heading - Compact but Bold */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Private Jet Charter
              </span>
              <span className="block text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)] animate-glow">
                Instant Quotes
              </span>
            </h1>

            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
            </div>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get instant quotes from 500+ top private jet operators. Compare prices, book in minutes, fly within hours. Available 24/7 for charter flights worldwide.
              <span className="block mt-1 text-gold-400 font-semibold">Your perfect private aviation experience starts here.</span>
            </p>
          </div>

          {/* Toggle Buttons - Compact */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setSearchMode('search')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                searchMode === 'search'
                  ? 'bg-gradient-gold text-luxury-black'
                  : 'bg-luxury-black-lighter text-gray-400 border border-gold-500/30 hover:border-gold-500/50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Smart Search
              </span>
            </button>
            <button
              onClick={() => setSearchMode('form')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                searchMode === 'form'
                  ? 'bg-gradient-gold text-luxury-black'
                  : 'bg-luxury-black-lighter text-gray-400 border border-gold-500/30 hover:border-gold-500/50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Detailed Quote
              </span>
            </button>
          </div>

          {/* Smart Search Mode - Compact */}
          {searchMode === 'search' && (
            <div className="max-w-4xl mx-auto mb-8 animate-fadeIn">
              <div className="relative mb-6">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder='Try "New York to Miami tomorrow"...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-28 py-4 bg-white/10 backdrop-blur-xl border-2 border-gold-500/30 rounded-xl text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none focus:bg-white/15 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-luxury px-6 py-2.5 text-sm">
                  Search
                </button>
              </div>

              {/* Popular Routes - Compact */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gold-400" />
                    <h3 className="text-sm font-semibold text-white">Trending Routes</h3>
                  </div>
                  <span className="text-xs text-gray-500">Updated 5 min ago</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {popularRoutes.map((route, idx) => (
                    <button
                      key={idx}
                      className="group p-4 bg-luxury-black-lighter border border-gold-500/20 rounded-lg hover:border-gold-500/50 hover:bg-luxury-black-lighter/80 transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full border border-green-500/30">
                        {route.savings}
                      </div>
                      <div className="flex items-center gap-1.5 text-white font-semibold mb-1.5 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-gold-400" />
                        {route.from} → {route.to}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                        <Clock className="h-3 w-3" />
                        {route.time}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-gradient-gold">{route.price}</div>
                        <div className="text-xs text-gray-400 group-hover:text-gold-400 transition-colors">
                          Book →
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Form Mode - Compact */}
          {searchMode === 'form' && (
            <div className="max-w-4xl mx-auto mb-8 animate-fadeIn">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-gold-500/30 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <div className="relative">
                    <label className="block text-xs font-medium text-gold-400 mb-1.5">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="New York"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gold-400 mb-1.5">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Miami"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gold-400 mb-1.5">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gold-400 mb-1.5">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full btn-luxury py-3 text-sm font-semibold group mb-4">
                  <span className="flex items-center justify-center gap-2">
                    Get Instant Quote
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="pt-4 border-t border-gold-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Estimated range:</span>
                    <span className="text-xl font-bold text-gradient-gold">$11K - $35K</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Trust Indicators - Compact */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center luxury-card p-4 group">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-gold rounded-full mb-2 group-hover:scale-110 transition-transform">
                <Shield className="h-5 w-5 text-luxury-black" />
              </div>
              <div className="text-2xl font-bold text-gold-400 mb-1">500+</div>
              <div className="text-xs text-gray-400">Verified Operators</div>
            </div>
            <div className="text-center luxury-card p-4 group">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-gold rounded-full mb-2 group-hover:scale-110 transition-transform">
                <Clock className="h-5 w-5 text-luxury-black" />
              </div>
              <div className="text-2xl font-bold text-gold-400 mb-1">24/7</div>
              <div className="text-xs text-gray-400">Concierge Support</div>
            </div>
            <div className="text-center luxury-card p-4 group">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-gold rounded-full mb-2 group-hover:scale-110 transition-transform">
                <Star className="h-5 w-5 text-luxury-black" fill="currentColor" />
              </div>
              <div className="text-2xl font-bold text-gold-400 mb-1">4.9★</div>
              <div className="text-xs text-gray-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Smaller */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-gold-500/50 rounded-full flex items-start justify-center p-1.5 hover:border-gold-400 transition-colors duration-300">
          <div className="w-0.5 h-2 bg-gradient-gold rounded-full" />
        </div>
      </div>
    </section>
  )
}
