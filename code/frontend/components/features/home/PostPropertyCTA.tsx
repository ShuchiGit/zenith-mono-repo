import Link from 'next/link'
import { Search, Phone, Home } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse & Shortlist',
    description:
      'Explore our curated portfolio of premium projects and properties across Delhi NCR.',
  },
  {
    icon: Phone,
    step: '02',
    title: 'Connect with Expert',
    description:
      'Our real estate advisors will guide you with market insights and help you compare options.',
  },
  {
    icon: Home,
    step: '03',
    title: 'Close the Deal',
    description: 'We manage all paperwork, legal checks, and registration — stress-free.',
  },
]

export function PostPropertyCTA() {
  return (
    <section className="section-padding bg-[#edf6f9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="section-title text-4xl">Your Journey to the Perfect Home</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">
            Three simple steps to find and secure your ideal property with Zenith Estate's expert
            guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="glass-card rounded-2xl p-8 text-center relative overflow-hidden group hover:shadow-[0_12px_40px_rgba(0,109,119,0.15)] transition-shadow duration-300">
              <div className="absolute top-4 right-4 font-heading text-5xl font-bold text-[#006d77]/5 group-hover:text-[#006d77]/10 transition-colors">
                {step}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#006d77] flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-xl text-[#006d77] mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/contact" className="btn-primary">
            Start Your Search
          </Link>
        </div>
      </div>
    </section>
  )
}
