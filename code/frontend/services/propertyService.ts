import { get } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Property, PropertyFilters } from '@/types'

export async function getProperties(filters?: PropertyFilters): Promise<ApiResponse<Property[]>> {
  return get<ApiResponse<Property[]>>(ENDPOINTS.PROPERTIES, filters as Record<string, unknown>)
}

export async function getPropertyBySlug(slug: string): Promise<ApiResponse<Property>> {
  return get<ApiResponse<Property>>(ENDPOINTS.PROPERTY_BY_SLUG(slug))
}
