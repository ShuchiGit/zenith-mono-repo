import type { Metadata } from 'next'
import { PageHeader } from '@/components/common/PageHeader'
import { ContactForm } from './ContactForm'
import { getSettings } from '@/services/settingsService'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Zenith Estate for expert real estate advice in Delhi NCR. Call, WhatsApp, or visit our offices in Noida and Ghaziabad.',
}

export default async function ContactPage() {
  let settings = null
  try {
    const res = await getSettings()
    settings = res.data
  } catch {
    // use defaults
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: settings?.phone || '+91 98765 43210',
      href: `tel:${settings?.phone || '+919876543210'}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings?.email || 'info@zenithestate.in',
      href: `mailto:${settings?.email || 'info@zenithestate.in'}`,
    },
    {
      icon: MapPin,
      label: 'Noida Office',
      value: settings?.address_noida || 'Sector 150, Noida, UP 201310',
      href: undefined,
    },
    {
      icon: Clock,
      label: 'Office Hours',
      value: settings?.office_hours || 'Mon–Sat: 10 AM – 7 PM',
      href: undefined,
    },
  ]

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We're here to help. Reach out and our team will get back to you within 30 minutes."
        breadcrumb="Get in Touch"
      />

      <section className="section-padding bg-[#edf6f9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-3xl mb-6">Let's Talk</h2>
              <ContactForm />
            </div>

            <div className="space-y-5">
              <h2 className="section-title text-3xl mb-6">Find Us</h2>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#006d77] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-[#006d77] font-medium hover:text-[#005a63] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-700 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
