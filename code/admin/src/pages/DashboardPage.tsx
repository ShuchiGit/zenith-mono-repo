import { useEffect, useState } from 'react'
import { Building2, Home, MessageSquare, TrendingUp } from 'lucide-react'
import { getProjects } from '@/services/projectService'
import { getProperties } from '@/services/propertyService'
import { getEnquiries } from '@/services/enquiryService'
import { InlineLoader } from '@/components/ui/Loader'
import { formatDate } from '@/lib/utils'
import type { Enquiry } from '@/types'

interface Stats {
  projects: number
  properties: number
  enquiries: number
  newEnquiries: number
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      getProjects({ limit: 1 }),
      getProperties({ limit: 1 }),
      getEnquiries({ limit: 5 }),
      getEnquiries({ status: 'NEW', limit: 1 }),
    ]).then(([p, pr, e, ne]) => {
      setStats({
        projects: p.status === 'fulfilled' ? (p.value.pagination?.total || p.value.data.length) : 0,
        properties: pr.status === 'fulfilled' ? (pr.value.pagination?.total || pr.value.data.length) : 0,
        enquiries: e.status === 'fulfilled' ? (e.value.pagination?.total || e.value.data.length) : 0,
        newEnquiries: ne.status === 'fulfilled' ? (ne.value.pagination?.total || ne.value.data.length) : 0,
      })
      if (e.status === 'fulfilled') setRecentEnquiries(e.value.data.slice(0, 5))
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <InlineLoader />

  const cards = [
    { icon: Building2, label: 'Total Projects', value: stats?.projects ?? 0, color: '#006d77' },
    { icon: Home, label: 'Total Properties', value: stats?.properties ?? 0, color: '#006d77' },
    { icon: MessageSquare, label: 'Total Enquiries', value: stats?.enquiries ?? 0, color: '#006d77' },
    { icon: TrendingUp, label: 'New Enquiries', value: stats?.newEnquiries ?? 0, color: '#e29578' },
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">{label}</p>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-4.5 h-4.5" style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Enquiries</h3>
        </div>
        {recentEnquiries.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No enquiries yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Phone', 'Source', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentEnquiries.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-gray-900">{e.name}</td>
                  <td className="px-5 py-3 text-gray-600">{e.phone}</td>
                  <td className="px-5 py-3 text-gray-600 capitalize">{e.source.replace(/_/g, ' ')}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      e.status === 'NEW' ? 'bg-blue-100 text-blue-700' :
                      e.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
