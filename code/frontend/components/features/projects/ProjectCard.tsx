import Link from 'next/link'
import { MapPin, BedDouble } from 'lucide-react'
import { getStatusLabel, getStatusBadgeClass, formatPriceRange } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23edf6f9" width="400" height="300"/%3E%3Ctext fill="%2383c5be" font-size="40" text-anchor="middle" x="200" y="160"%3E🏢%3C/text%3E%3C/svg%3E'

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.coverImage || project.images?.[0] || PLACEHOLDER

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_12px_40px_rgba(0,109,119,0.15)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#edf6f9]">
        <img
          src={image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={getStatusBadgeClass(project.status)}>
            {getStatusLabel(project.status)}
          </span>
        </div>
        {project.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#e29578] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-[#006d77] mb-2 group-hover:text-[#005a63] transition-colors line-clamp-1">
          {project.name}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-[#83c5be] flex-shrink-0" />
          <span className="line-clamp-1">{project.location}, {project.city}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <BedDouble className="w-4 h-4 text-[#83c5be]" />
            {project.bhkTypes}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-[#83c5be]/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
            <p className="font-heading text-[#006d77] font-semibold">
              {formatPriceRange(project.priceMin, project.priceMax)}
            </p>
          </div>
          <span className="text-[#006d77] text-sm font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )
}
