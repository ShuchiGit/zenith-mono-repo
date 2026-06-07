import { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '@/services/settingsService'
import { InlineLoader } from '@/components/ui/Loader'
import { useToast } from '@/components/ui/Toast'

const SETTING_GROUPS = [
  {
    title: 'Stats',
    keys: ['years_of_excellence', 'sqft_sold', 'inventory_sold_cr', 'team_size'],
    labels: {
      years_of_excellence: 'Years of Excellence',
      sqft_sold: 'Sq. Ft. Sold',
      inventory_sold_cr: 'Inventory Sold (Cr)',
      team_size: 'Team Size',
    },
  },
  {
    title: 'Contact',
    keys: ['phone', 'whatsapp', 'email', 'office_hours', 'address_noida', 'address_gzb'],
    labels: {
      phone: 'Phone Number',
      whatsapp: 'WhatsApp Number',
      email: 'Email Address',
      office_hours: 'Office Hours',
      address_noida: 'Noida Office Address',
      address_gzb: 'Ghaziabad Office Address',
    },
  },
  {
    title: 'Social Media',
    keys: ['social_facebook', 'social_instagram', 'social_linkedin', 'social_youtube', 'social_whatsapp'],
    labels: {
      social_facebook: 'Facebook URL',
      social_instagram: 'Instagram URL',
      social_linkedin: 'LinkedIn URL',
      social_youtube: 'YouTube URL',
      social_whatsapp: 'WhatsApp URL',
    },
  },
  {
    title: 'Analytics',
    keys: ['gtm_id', 'meta_pixel_id'],
    labels: { gtm_id: 'Google Tag Manager ID', meta_pixel_id: 'Meta Pixel ID' },
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
      toast('Settings saved', 'success')
    } catch {
      toast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <InlineLoader />

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button onClick={handleSave} disabled={saving} className="bg-[#006d77] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#005a63] disabled:opacity-60 transition-colors">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map((group) => (
          <div key={group.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">{group.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.keys.map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {(group.labels as unknown as Record<string, string>)[key] || key}
                  </label>
                  <input
                    value={values[key] || ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/30"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
