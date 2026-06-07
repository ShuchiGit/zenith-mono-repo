import { useEffect, useState, useCallback } from 'react'
import { Search, Eye } from 'lucide-react'
import { getEnquiries, updateEnquiryStatus, updateEnquiryNotes } from '@/services/enquiryService'
import { InlineLoader } from '@/components/ui/Loader'
import { Modal } from '@/components/ui/Modal'
import { useToast } from '@/components/ui/Toast'
import { formatDate } from '@/lib/utils'
import type { Enquiry, EnquiryStatus } from '@/types'

const STATUS_OPTIONS: EnquiryStatus[] = ['NEW', 'CONTACTED', 'CLOSED']

const statusColor: Record<EnquiryStatus, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  CLOSED: 'bg-green-100 text-green-700',
}

export function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [notes, setNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const { toast } = useToast()

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getEnquiries({
        search: search || undefined,
        status: statusFilter || undefined,
        limit: 50,
      })
      setEnquiries(res.data)
    } catch {
      toast('Failed to load enquiries', 'error')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter, toast])

  useEffect(() => { fetch() }, [fetch])

  const handleStatusChange = async (id: number, status: EnquiryStatus) => {
    try {
      const res = await updateEnquiryStatus(id, status)
      setEnquiries((prev) => prev.map((e) => e.id === id ? res.data : e))
      if (selected?.id === id) setSelected(res.data)
      toast('Status updated', 'success')
    } catch {
      toast('Failed to update status', 'error')
    }
  }

  const handleSaveNotes = async () => {
    if (!selected) return
    setSavingNotes(true)
    try {
      const res = await updateEnquiryNotes(selected.id, notes)
      setEnquiries((prev) => prev.map((e) => e.id === selected.id ? res.data : e))
      setSelected(res.data)
      toast('Notes saved', 'success')
    } catch {
      toast('Failed to save notes', 'error')
    } finally {
      setSavingNotes(false)
    }
  }

  const openDetail = (e: Enquiry) => {
    setSelected(e)
    setNotes(e.notes || '')
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Enquiries</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, phone…" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none">
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? <InlineLoader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Phone', 'Source', 'Project/Property', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">{e.name}</td>
                    <td className="px-4 py-3 text-gray-600">{e.phone}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{e.source.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{e.project?.name || e.property?.name || '—'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e.id, ev.target.value as EnquiryStatus)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:outline-none ${statusColor[e.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(e.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => openDetail(e)} className="p-1.5 text-gray-400 hover:text-[#006d77] hover:bg-[#e6f4f5] rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {enquiries.length === 0 && <p className="text-center text-gray-400 py-12">No enquiries found</p>}
          </div>
        )}
      </div>

      {selected && (
        <Modal open title={`Enquiry: ${selected.name}`} onClose={() => setSelected(null)} size="md">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Name', value: selected.name },
                { label: 'Phone', value: selected.phone },
                { label: 'Email', value: selected.email || '—' },
                { label: 'Source', value: selected.source },
                { label: 'Status', value: selected.status },
                { label: 'Date', value: formatDate(selected.createdAt) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            {selected.message && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p className="text-xs text-gray-400 mb-1">Message</p>
                <p className="text-gray-700">{selected.message}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Internal Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none"
                placeholder="Add notes…"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={handleSaveNotes} disabled={savingNotes} className="px-4 py-2 text-sm text-white bg-[#006d77] rounded-lg hover:bg-[#005a63] disabled:opacity-60 transition-colors">
                {savingNotes ? 'Saving…' : 'Save Notes'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
