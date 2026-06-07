import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ProjectStatus } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(n: number | string): string {
  const v = Number(n)
  if (v >= 1) return `₹ ${v.toFixed(2)} Cr`
  return `₹ ${(v * 100).toFixed(0)} L`
}

export function formatPriceRange(min: number | string, max: number | string): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`
}

export function getStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    UNDER_CONSTRUCTION: 'Under Construction',
    READY_TO_MOVE: 'Ready to Move',
    NEW_LAUNCH: 'New Launch',
  }
  return labels[status]
}

export function getStatusBadgeClass(status: ProjectStatus): string {
  const classes: Record<ProjectStatus, string> = {
    UNDER_CONSTRUCTION: 'status-badge-under-construction',
    READY_TO_MOVE: 'status-badge-ready-to-move',
    NEW_LAUNCH: 'status-badge-new-launch',
  }
  return classes[status]
}

export function extractYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : ''
}
