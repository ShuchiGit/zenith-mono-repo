import { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '@/services/settingsService'
import { InlineLoader } from '@/components/ui/Loader'
import { useToast } from '@/components/ui/Toast'

type FieldMeta = { label: string; hint: string; wide?: boolean }

interface SettingGroup {
  title: string
  subtitle: string
  keys: string[]
  fields: Record<string, FieldMeta>
}

const SETTING_GROUPS: SettingGroup[] = [
  {
    title: 'Stats & Numbers',
    subtitle: 'Shown on homepage hero section and About Us page',
    keys: ['years_of_excellence', 'sqft_sold', 'inventory_sold_cr', 'team_size'],
    fields: {
      years_of_excellence: { label: 'Years of Excellence', hint: 'Number only (e.g. 10). Displayed as "10+ Years"' },
      sqft_sold:           { label: 'Sq. Ft. Sold',        hint: 'e.g. 2M+ — shown as a stat counter on homepage' },
      inventory_sold_cr:   { label: 'Inventory Sold (₹ Cr)', hint: 'Number only (e.g. 500). Displayed as "₹500 Cr+"' },
      team_size:           { label: 'Happy Families',      hint: 'e.g. 2000+ — total families served' },
    },
  },
  {
    title: 'Contact Information',
    subtitle: 'Shown on Contact page, footer, and sticky enquiry widget',
    keys: ['phone', 'whatsapp', 'email', 'office_hours', 'address_noida', 'address_gzb'],
    fields: {
      phone:          { label: 'Phone Number',              hint: 'Include country code. e.g. +91 98100 00786' },
      whatsapp:       { label: 'WhatsApp Number',           hint: 'Used for WhatsApp chat button. Include country code.' },
      email:          { label: 'Email Address',             hint: 'Primary contact email shown to visitors' },
      office_hours:   { label: 'Office Hours',              hint: 'e.g. Mon–Sat: 10:00 AM – 7:30 PM' },
      address_noida:  { label: 'Noida Office Address',      hint: 'Full address shown on Contact page', wide: true },
      address_gzb:    { label: 'Ghaziabad Office Address',  hint: 'Full address shown on Contact page', wide: true },
    },
  },
  {
    title: 'Social Media',
    subtitle: 'Footer social icons — leave blank to hide the icon',
    keys: ['social_facebook', 'social_instagram', 'social_linkedin', 'social_youtube', 'social_whatsapp'],
    fields: {
      social_facebook:  { label: 'Facebook URL',  hint: 'e.g. https://facebook.com/yourpage' },
      social_instagram: { label: 'Instagram URL', hint: 'e.g. https://instagram.com/yourhandle' },
      social_linkedin:  { label: 'LinkedIn URL',  hint: 'e.g. https://linkedin.com/company/yourcompany' },
      social_youtube:   { label: 'YouTube URL',   hint: 'e.g. https://youtube.com/@yourchannel' },
      social_whatsapp:  { label: 'WhatsApp Link', hint: 'e.g. https://wa.me/919810000786 (no spaces or dashes in number)' },
    },
  },
  {
    title: 'Analytics & Tracking',
    subtitle: 'Paste your IDs here — leave blank to disable tracking',
    keys: ['gtm_id', 'meta_pixel_id'],
    fields: {
      gtm_id:        { label: 'Google Tag Manager ID', hint: 'e.g. GTM-XXXXXXX — added to <head> on every page' },
      meta_pixel_id: { label: 'Meta Pixel ID',         hint: 'e.g. 1234567890123 — enables Facebook/Instagram ad tracking' },
    },
  },
]

export function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    getSettings()
      .then((res) => setValues(res.data as unknown as Record<string, string>))
      .catch(() => toast('Failed to load settings', 'error'))
      .finally(() => setLoading(false))
  }, [toast])

  const handleSave = async () => {
    setSaving(true)
    try {
      const settings = Object.entries(values).map(([key, value]) => ({ key, value: value || '' }))
      await updateSettings(settings)
      toast('Settings saved successfully', 'success')
    } catch {
      toast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <InlineLoader />

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500 mt-0.5">Control all website content from here — changes reflect live on the site</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#006d77] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#005a63] disabled:opacity-60 transition-colors"
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map((group) => (
          <div key={group.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 text-base">{group.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{group.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {group.keys.map((key) => {
                const field = group.fields[key]
                return (
                  <div key={key} className={field?.wide ? 'md:col-span-2 xl:col-span-3' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field?.label || key}
                    </label>
                    <input
                      value={values[key] || ''}
                      onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                      placeholder={field?.hint}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/30 focus:border-[#006d77]/50 transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">{field?.hint}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#006d77] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#005a63] disabled:opacity-60 transition-colors"
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
