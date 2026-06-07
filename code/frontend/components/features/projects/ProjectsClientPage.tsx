'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProjects } from '@/services/projectService'
import { ProjectCard } from './ProjectCard'
import { InlineLoader } from '@/components/common/Loader'
import { LOCATIONS, PROJECT_STATUSES, BHK_TYPES } from '@/constants/site'
import type { Project, Pagination } from '@/types'

export function ProjectsClientPage() {
  const searchParams = useSearchParams()
  const [projects, setProjects] = useState<Project[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(() => searchParams.get('search') || '')
  const [city, setCity] = useState(() => searchParams.get('city') || '')
  const [status, setStatus] = useState(() => searchParams.get('status') || '')
  const [bhkType, setBhkType] = useState(() => searchParams.get('bhkType') || '')
  const [page, setPage] = useState(1)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getProjects({
        search: search || undefined,
        city: city || undefined,
        status: status || undefined,
        bhkType: bhkType || undefined,
        page,
        limit: 12,
      })
      setProjects(res.data)
      setPagination(res.pagination || null)
    } catch {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }, [search, city, status, bhkType, page])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const resetFilters = () => {
    setSearch('')
    setCity('')
    setStatus('')
    setBhkType('')
    setPage(1)
  }

  const hasFilters = search || city || status || bhkType

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="glass-card rounded-2xl p-4 mb-8 flex flex-wrap gap-3 items-end">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search projects…"
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>
        <select
          value={city}
          onChange={(e) => { setCity(e.target.value); setPage(1) }}
          className="input-field w-full sm:w-40 py-2.5 text-sm"
        >
          <option value="">All Cities</option>
          {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
          className="input-field w-full sm:w-44 py-2.5 text-sm"
        >
          <option value="">All Status</option>
          {PROJECT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select
          value={bhkType}
          onChange={(e) => { setBhkType(e.target.value); setPage(1) }}
          className="input-field w-full sm:w-32 py-2.5 text-sm"
        >
          <option value="">All BHK</option>
          {BHK_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-sm text-[#006d77] hover:text-[#005a63] font-medium py-2.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {pagination && (
        <p className="text-sm text-gray-500 mb-6">
          Showing {projects.length} of {pagination.total} projects
        </p>
      )}

      {loading ? (
        <InlineLoader />
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-2">No projects found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
          {hasFilters && (
            <button onClick={resetFilters} className="btn-primary mt-4">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 rounded-xl border border-[#83c5be]/40 flex items-center justify-center disabled:opacity-40 hover:bg-[#e6f4f5] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#006d77]" />
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className="w-10 h-10 rounded-xl border border-[#83c5be]/40 flex items-center justify-center disabled:opacity-40 hover:bg-[#e6f4f5] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#006d77]" />
          </button>
        </div>
      )}
    </div>
  )
}
