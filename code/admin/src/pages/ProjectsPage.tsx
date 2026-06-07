import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { getProjects, deleteProject, toggleProject } from '@/services/projectService'
import { InlineLoader } from '@/components/ui/Loader'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useToast } from '@/components/ui/Toast'
import { getStatusLabel, formatDate } from '@/lib/utils'
import type { Project } from '@/types'

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getProjects({ search: search || undefined, limit: 50 })
      setProjects(res.data)
    } catch {
      toast('Failed to load projects', 'error')
    } finally {
      setLoading(false)
    }
  }, [search, toast])

  useEffect(() => { fetch() }, [fetch])

  const handleToggle = async (id: number) => {
    try {
      await toggleProject(id)
      setProjects((prev) => prev.map((p) => p.id === id ? { ...p, isActive: !p.isActive } : p))
      toast('Project status updated', 'success')
    } catch {
      toast('Failed to update status', 'error')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteProject(deleteId)
      setProjects((prev) => prev.filter((p) => p.id !== deleteId))
      toast('Project deleted', 'success')
    } catch {
      toast('Failed to delete project', 'error')
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Link
          to="/projects/new"
          className="flex items-center gap-2 bg-[#006d77] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a63] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006d77]/30"
            />
          </div>
        </div>

        {loading ? <InlineLoader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'City', 'BHK', 'Status', 'Active', 'Updated', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{p.name}</div>
                      <div className="text-gray-400 text-xs">{p.location}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.city}</td>
                    <td className="px-4 py-3 text-gray-600">{p.bhkTypes}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        p.status === 'READY_TO_MOVE' ? 'bg-[#83c5be]/20 text-[#006d77]' :
                        p.status === 'NEW_LAUNCH' ? 'bg-[#ffddd2] text-[#e29578]' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {getStatusLabel(p.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggle(p.id)}>
                        {p.isActive
                          ? <ToggleRight className="w-6 h-6 text-[#006d77]" />
                          : <ToggleLeft className="w-6 h-6 text-gray-300" />
                        }
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(p.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/projects/${p.id}/edit`} className="p-1.5 text-gray-400 hover:text-[#006d77] hover:bg-[#e6f4f5] rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {projects.length === 0 && (
              <p className="text-center text-gray-400 py-12">No projects found</p>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        loading={deleting}
      />
    </div>
  )
}
