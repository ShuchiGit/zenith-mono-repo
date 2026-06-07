import { Award, Users, TrendingUp, Home } from 'lucide-react'
import type { SiteSettings } from '@/types'

interface AboutSectionProps {
  settings: SiteSettings | null
}

export function AboutSection({ settings }: AboutSectionProps) {
  const stats = [
    {
      icon: Award,
      value: settings?.years_of_excellence || '10+',
      label: 'Years of Excellence',
    },
    {
      icon: Home,
      value: settings?.sqft_sold || '5M+',
      label: 'Sq. Ft. Sold',
    },
    {
      icon: TrendingUp,
      value: settings?.inventory_sold_cr ? `₹${settings.inventory_sold_cr} Cr` : '₹500 Cr+',
      label: 'Inventory Sold',
    },
    {
      icon: Users,
      value: settings?.team_size || '50+',
      label: 'Team Members',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-3">
              About Zenith Estate
            </p>
            <h2 className="section-title text-4xl md:text-5xl leading-tight">
              Delhi NCR's Most Trusted Real Estate Partner
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-6">
              With over a decade of expertise in Delhi NCR's real estate market, Zenith Estate has
              helped thousands of families find their dream homes. Our deep market knowledge,
              transparent approach, and post-sale support set us apart.
            </p>
            <ul className="space-y-3">
              {[
                'Trusted by 2000+ happy families',
                'Exclusive access to premium projects',
                'End-to-end assistance from search to possession',
                'Expert legal & financial guidance',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-[#e6f4f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#006d77]" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#e6f4f5] flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#006d77]" />
                </div>
                <div className="font-heading text-3xl font-bold text-[#006d77] mb-1">{value}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
