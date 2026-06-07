import { get } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Project, ProjectFilters } from '@/types'

export async function getProjects(filters?: ProjectFilters): Promise<ApiResponse<Project[]>> {
  return get<ApiResponse<Project[]>>(ENDPOINTS.PROJECTS, filters as Record<string, unknown>)
}

export async function getFeaturedProjects(): Promise<ApiResponse<Project[]>> {
  return get<ApiResponse<Project[]>>(ENDPOINTS.PROJECTS_FEATURED)
}

export async function getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  return get<ApiResponse<Project>>(ENDPOINTS.PROJECT_BY_SLUG(slug))
}
