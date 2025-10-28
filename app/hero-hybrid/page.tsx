'use client'

import { useState } from 'react'
import { Plane, MapPin, Calendar, Users, ArrowRight, Search, TrendingUp, Zap, Sparkles, Clock, Shield, Star } from 'lucide-react'

// Hybrid 1: Smart Search + Instant Quote Form (Best of Both)
function HybridDemo1() {
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

      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Premium Badge */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-500/20 via-gold-500/30 to-gold-500/20 border border-gold-500/40 rounded-full backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-gold-400 animate-pulse" />
              <span className="text-gradient-gold font-semibold text-sm">Premium Private Jet Charter</span>
              <Plane className="h-5 w-5 text-gold-400" />
            </div>
          </div>

          {/* Main Heading - Massive Typography from Demo 3 */}
          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-9xl font-bold leading-none mb-8">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Fly Private.
              </span>
              <span className="block text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)] animate-glow">
                Fly Now.
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-500" />
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-500" />
            </div>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI-powered search. Instant quotes. 500+ operators.
              <span className="block mt-2 text-gold-400 font-semibold">Your perfect flight awaits.</span>
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setSearchMode('search')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                searchMode === 'search'
                  ? 'bg-gradient-gold text-luxury-black'
                  : 'bg-luxury-black-lighter text-gray-400 border border-gold-500/30 hover:border-gold-500/50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Smart Search
              </span>
            </button>
            <button
              onClick={() => setSearchMode('form')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                searchMode === 'form'
                  ? 'bg-gradient-gold text-luxury-black'
                  : 'bg-luxury-black-lighter text-gray-400 border border-gold-500/30 hover:border-gold-500/50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Detailed Quote
              </span>
            </button>
          </div>

          {/* Smart Search Mode */}
          {searchMode === 'search' && (
            <div className="max-w-4xl mx-auto mb-12 animate-fadeIn">
              <div className="relative mb-8">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder='Try "New York to Miami tomorrow" or "Weekend trip for 4 people"...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-32 py-6 bg-white/10 backdrop-blur-xl border-2 border-gold-500/30 rounded-2xl text-white text-lg placeholder-gray-500 focus:border-gold-500 focus:outline-none focus:bg-white/15 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 btn-luxury px-8 py-3">
                  Search
                </button>
              </div>

              {/* Popular Routes */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gold-400" />
                    <h3 className="text-lg font-semibold text-white">Trending Routes Today</h3>
                  </div>
                  <span className="text-sm text-gray-400">Updated 5 min ago</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {popularRoutes.map((route, idx) => (
                    <button
                      key={idx}
                      className="group p-6 bg-luxury-black-lighter border border-gold-500/20 rounded-xl hover:border-gold-500/50 hover:bg-luxury-black-lighter/80 transition-all text-left relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                        {route.savings}
                      </div>
                      <div className="flex items-center gap-2 text-white font-semibold mb-2">
                        <MapPin className="h-4 w-4 text-gold-400" />
                        {route.from} → {route.to}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <Clock className="h-3 w-3" />
                        {route.time}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gradient-gold">{route.price}</div>
                        <div className="text-sm text-gray-400 group-hover:text-gold-400 transition-colors">
                          Book now →
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Form Mode */}
          {searchMode === 'form' && (
            <div className="max-w-4xl mx-auto mb-12 animate-fadeIn">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gold-500/30 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gold-400 mb-2">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="New York"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gold-400 mb-2">To</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Miami"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gold-400 mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gold-400 mb-2">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full btn-luxury py-4 text-lg font-semibold group mb-6">
                  <span className="flex items-center justify-center gap-2">
                    Get Instant Quote
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="pt-6 border-t border-gold-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Estimated price range:</span>
                    <span className="text-2xl font-bold text-gradient-gold">$11,000 - $35,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center luxury-card p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-gold rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-luxury-black" />
              </div>
              <div className="text-4xl font-bold text-gold-400 mb-2">500+</div>
              <div className="text-sm text-gray-400">Verified Operators</div>
            </div>
            <div className="text-center luxury-card p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-gold rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-luxury-black" />
              </div>
              <div className="text-4xl font-bold text-gold-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400">Concierge Support</div>
            </div>
            <div className="text-center luxury-card p-6 group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-gold rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-7 w-7 text-luxury-black" fill="currentColor" />
              </div>
              <div className="text-4xl font-bold text-gold-400 mb-2">4.9★</div>
              <div className="text-sm text-gray-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Hybrid 2: Split Screen with Smart Features
function HybridDemo2() {
  const [activeTab, setActiveTab] = useState<'instant' | 'empty-legs'>('instant')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Side - Hero Content */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
                <Sparkles className="h-4 w-4 text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Premium Private Aviation</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Fly Private.
                <span className="block text-gradient-gold mt-2">Fly Smart.</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AI-powered instant quotes from 500+ verified operators. 
                <span className="block mt-2 text-gold-400 font-semibold">
                  Your perfect flight is just seconds away.
                </span>
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">2min</div>
                  <div className="text-sm text-gray-400">Avg Quote Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">$2.5K</div>
                  <div className="text-sm text-gray-400">Starting Price</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 p-4 bg-luxury-black-lighter rounded-lg border border-gold-500/20">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-gold border-2 border-luxury-black" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-gold-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    <span className="text-white font-semibold">4.9/5</span> from 1,000+ flights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Quote Form */}
          <div className="flex items-center justify-center p-8 lg:p-16 bg-luxury-black/50 backdrop-blur-xl border-l border-gold-500/20">
            <div className="w-full max-w-lg">
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('instant')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'instant'
                      ? 'bg-gradient-gold text-luxury-black'
                      : 'bg-luxury-black-lighter text-gray-400 hover:text-white'
                  }`}
                >
                  Instant Quote
                </button>
                <button
                  onClick={() => setActiveTab('empty-legs')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'empty-legs'
                      ? 'bg-gradient-gold text-luxury-black'
                      : 'bg-luxury-black-lighter text-gray-400 hover:text-white'
                  }`}
                >
                  Empty Legs
                </button>
              </div>

              {activeTab === 'instant' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gold-400 mb-2">From</label>
                    <input
                      type="text"
                      placeholder="New York (JFK, TEB, LGA)"
                      className="w-full px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gold-400 mb-2">To</label>
                    <input
                      type="text"
                      placeholder="Miami (MIA, OPF, FXE)"
                      className="w-full px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gold-400 mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gold-400 mb-2">Passengers</label>
                      <select className="w-full px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button className="w-full btn-luxury py-4 text-lg font-semibold group">
                    <span className="flex items-center justify-center gap-2">
                      Get Instant Quote
                      <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </span>
                  </button>

                  <div className="p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Estimated Range:</span>
                      <span className="text-xl font-bold text-gradient-gold">$11K - $35K</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-6 bg-luxury-black-lighter border border-gold-500/30 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white font-semibold mb-1">New York → Miami</div>
                        <div className="text-sm text-gray-400">Tomorrow, 2:00 PM</div>
                      </div>
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Save 65%
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gradient-gold">$3,850</div>
                      <button className="btn-luxury px-6 py-2 text-sm">Book Now</button>
                    </div>
                  </div>

                  <div className="p-6 bg-luxury-black-lighter border border-gold-500/30 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white font-semibold mb-1">LA → Las Vegas</div>
                        <div className="text-sm text-gray-400">Today, 6:00 PM</div>
                      </div>
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        Save 70%
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gradient-gold">$1,350</div>
                      <button className="btn-luxury px-6 py-2 text-sm">Book Now</button>
                    </div>
                  </div>

                  <button className="w-full py-3 text-gold-400 border border-gold-500/30 rounded-lg hover:bg-gold-500/10 transition-all">
                    View All Empty Legs →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Hybrid 3: Ultra-Modern with Video + AI Search
function HybridDemo3() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showQuickQuote, setShowQuickQuote] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/80 to-luxury-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-500/20 via-gold-500/30 to-gold-500/20 border border-gold-500/40 rounded-full backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-gold-400 animate-pulse" />
              <span className="text-gradient-gold font-semibold text-sm">Premium Private Jet Charter</span>
              <Plane className="h-5 w-5 text-gold-400" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-9xl font-bold leading-none mb-8">
              <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Fly Private.
              </span>
              <span className="block text-gradient-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.5)] animate-glow">
                Fly Now.
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-500" />
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-500" />
            </div>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI-powered search. Instant quotes. 500+ operators.
              <span className="block mt-2 text-gold-400 font-semibold">Your perfect flight awaits.</span>
            </p>
          </div>

          {/* Mega Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-xl rounded-3xl" />
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-2 border border-gold-500/30 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gold-400 z-10" />
                    <input
                      type="text"
                      placeholder='Try "NYC to Miami tomorrow" or just "Miami"...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-16 pr-6 py-6 bg-transparent text-white text-xl placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <button className="btn-luxury px-10 py-5 text-lg font-semibold whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      Search
                      <Zap className="h-5 w-5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Quote Toggle */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowQuickQuote(!showQuickQuote)}
                className="text-gold-400 hover:text-gold-300 transition-colors text-sm font-medium"
              >
                {showQuickQuote ? '← Back to search' : 'Need detailed quote? Click here →'}
              </button>
            </div>
          </div>

          {/* Quick Quote Form (Collapsible) */}
          {showQuickQuote && (
            <div className="max-w-4xl mx-auto mb-12 animate-fadeIn">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-gold-500/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="From"
                    className="px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="To"
                    className="px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none"
                  />
                  <input
                    type="date"
                    className="px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none"
                  />
                  <select className="px-4 py-3 bg-luxury-black/50 border border-gold-500/30 rounded-lg text-white focus:border-gold-500 focus:outline-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num}>{num} passengers</option>
                    ))}
                  </select>
                </div>
                <button className="w-full btn-luxury py-4 text-lg">
                  Get Detailed Quote
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center luxury-card p-6 group">
              <div className="text-4xl font-bold text-gold-400 mb-2 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Operators</div>
            </div>
            <div className="text-center luxury-card p-6 group">
              <div className="text-4xl font-bold text-gold-400 mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Support</div>
            </div>
            <div className="text-center luxury-card p-6 group">
              <div className="text-4xl font-bold text-gold-400 mb-2 group-hover:scale-110 transition-transform">2min</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Quote</div>
            </div>
            <div className="text-center luxury-card p-6 group">
              <div className="text-4xl font-bold text-gold-400 mb-2 group-hover:scale-110 transition-transform">4.9★</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
const hybridDemos = [
  {
    id: 1,
    name: 'Smart Toggle (Search + Form)',
    description: 'Prepínanie medzi AI search a detailným formulárom. Trending routes s real-time dátami.',
    features: ['Toggle modes', 'AI search', 'Detailed form', 'Live trending routes', 'Savings badges']
  },
  {
    id: 2,
    name: 'Split Screen Premium',
    description: 'Split-screen s hero content vľavo a interaktívnym formulárom vpravo. Empty legs tab.',
    features: ['Split layout', 'Social proof', 'Empty legs', 'Quick stats', 'Instant/Empty toggle']
  },
  {
    id: 3,
    name: 'Ultra-Modern Mega Search',
    description: 'Obrovský search bar s možnosťou rozšíriť na detailný formulár. Video background.',
    features: ['Mega search bar', 'Collapsible form', 'Video background', '4-column stats', 'Glow effects']
  }
]

export default function HeroHybridPage() {
  const [activeDemo, setActiveDemo] = useState(1)

  const renderDemo = () => {
    switch (activeDemo) {
      case 1:
        return <HybridDemo1 />
      case 2:
        return <HybridDemo2 />
      case 3:
        return <HybridDemo3 />
      default:
        return <HybridDemo1 />
    }
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-luxury-black/95 backdrop-blur-lg border-b border-gold-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Hybrid Hero Demos (Best of Demo 1 + 5)</h1>
            <div className="flex gap-4">
              <a href="/hero-demos" className="text-gray-400 hover:text-gold-400 transition-colors">
                ← Original Demos
              </a>
              <a href="/" className="text-gold-400 hover:text-gold-300 transition-colors">
                Main Site →
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hybridDemos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  activeDemo === demo.id
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-gold-500/20 hover:border-gold-500/40 bg-luxury-black-lighter'
                }`}
              >
                <div className="font-semibold text-white mb-1 text-sm">
                  Hybrid {demo.id}
                </div>
                <div className="text-xs text-gold-400 mb-2">
                  {demo.name}
                </div>
                <div className="text-xs text-gray-400">
                  {demo.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="pt-48">
        {renderDemo()}
      </div>

      {/* Feature List */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-luxury-black/95 backdrop-blur-lg border-t border-gold-500/20 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-gray-400 text-sm font-semibold">Features:</span>
            {hybridDemos.find(d => d.id === activeDemo)?.features.map((feature, idx) => (
              <span key={idx} className="text-gold-400 text-sm">
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

