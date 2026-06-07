import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ProjectStatus } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(n: number): string {
  if (n >= 1) return `₹ ${n.toFixed(2)} Cr`
  return `₹ ${(n * 100).toFixed(0)} L`
}

export function getStatusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    UNDER_CONSTRUCTION: 'Under Construction',
    READY_TO_MOVE: 'Ready to Move',
    NEW_LAUNCH: 'New Launch',
  }
  return labels[status]
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
