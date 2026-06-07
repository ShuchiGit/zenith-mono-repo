import type { Metadata } from 'next'
import { PageHeader } from '@/components/common/PageHeader'
import { Award, Users, Target, Heart } from 'lucide-react'
import Link from 'next/link'
import { getSettings } from '@/services/settingsService'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Zenith Estate — Delhi NCR's trusted real estate consultancy with 10+ years of expertise in Noida, Greater Noida, and Ghaziabad.",
}

const values = [
  {
    icon: Award,
    title: 'Excellence',
    desc: 'We maintain the highest standards in every property recommendation and transaction.',
  },
  {
    icon: Target,
    title: 'Transparency',
    desc: 'Clear pricing, honest timelines, and straightforward communication at every step.',
  },
  {
    icon: Heart,
    title: 'Client First',
    desc: "Your dream home matters more than any transaction. We're partners in your journey.",
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Building communities and neighborhoods, not just selling properties.',
  },
]

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', exp: '15+ years in NCR realty' },
  { name: 'Priya Sharma', role: 'Head of Projects', exp: '10+ years in project sales' },
  { name: 'Amit Singh', role: 'Legal & Compliance', exp: '12+ years in property law' },
]

export default async function AboutPage() {
  let settings = null
  try {
    const res = await getSettings()
    settings = res.data
  } catch { /* use defaults */ }

  const statsGrid = [
    { value: settings?.years_of_excellence ? `${settings.years_of_excellence}+` : '10+', label: 'Years in Business' },
    { value: settings?.team_size || '2000+', label: 'Happy Families' },
    { value: settings?.inventory_sold_cr ? `₹${settings.inventory_sold_cr} Cr+` : '₹500 Cr+', label: 'Inventory Sold' },
    { value: settings?.sqft_sold || '2M+', label: 'Sq. Ft. Sold' },
  ]

  return (
    <>
      <PageHeader
        title="About Zenith Estate"
        subtitle="Delhi NCR's most trusted real estate consultancy, helping families find their perfect homes since 2014."
        breadcrumb="Who We Are"
      />

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="section-title text-4xl">A Decade of Trusted Service</h2>
              <p className="text-gray-600 leading-relaxed mt-4 mb-4">
                Founded in 2014, Zenith Estate began with a single mission: to make real estate buying
                transparent, trustworthy, and stress-free for every Indian family. What started as a
                small consultancy in Noida has grown into one of Delhi NCR's most respected real estate
                advisory firms.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Over the years, we have facilitated more than ₹500 crores in real estate transactions,
                helping over 2,000 families find their dream homes. Our deep relationships with
                developers, banks, and legal experts ensure our clients receive the best advice and
                deals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="btn-primary">Explore Projects</Link>
                <Link href="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {statsGrid.map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-[#006d77] mb-1">{s.value}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#edf6f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="section-title text-4xl">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#006d77] flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-lg text-[#006d77] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-3">Leadership</p>
            <h2 className="section-title text-4xl">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e6f4f5] flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-2xl text-[#006d77]">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-[#006d77] mb-1">{member.name}</h3>
                <p className="text-[#e29578] text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
