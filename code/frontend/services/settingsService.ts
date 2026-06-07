import { get } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, SiteSettings } from '@/types'

export async function getSettings(): Promise<ApiResponse<SiteSettings>> {
  return get<ApiResponse<SiteSettings>>(ENDPOINTS.SETTINGS)
}
