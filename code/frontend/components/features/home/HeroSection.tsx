'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { LOCATIONS } from '@/constants/site'
import type { SiteSettings } from '@/types'

interface HeroSectionProps {
  settings?: SiteSettings | null
}

export function HeroSection({ settings }: HeroSectionProps) {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (city) params.set('city', city)
    router.push(`/projects?${params.toString()}`)
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #006d77 0%, #005a63 40%, #003338 80%, #001f22 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, #83c5be 0%, transparent 40%), radial-gradient(circle at 85% 30%, #e29578 0%, transparent 40%)',
        }}
      />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center pt-16">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <MapPin className="w-4 h-4 text-[#e29578]" />
          <span className="text-white/90 text-sm font-medium">Delhi NCR's Most Trusted Realty</span>
        </div>

        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
          Find Your{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #83c5be, #e29578)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Dream Home
          </span>{' '}
          <br className="hidden sm:block" />
          in Delhi NCR
        </h1>

        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Discover premium residential projects and properties in Noida, Greater Noida &
          Ghaziabad. Expert guidance at every step.
        </p>

        <form
          onSubmit={handleSearch}
          className="glass-card rounded-2xl p-3 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, localities…"
              className="input-field pl-10"
            />
          </div>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field sm:w-44"
          >
            <option value="">All Cities</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary whitespace-nowrap">
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-14">
          {[
            { label: 'Projects', value: '50+' },
            { label: 'Happy Families', value: settings?.team_size || '2000+' },
            { label: 'Years Experience', value: settings?.years_of_excellence ? `${settings.years_of_excellence}+` : '10+' },
            { label: 'Sq. Ft. Sold', value: settings?.sqft_sold || '2M+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-[#83c5be] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-white/30" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  )
}
