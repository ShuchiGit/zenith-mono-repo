import { get, put } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, SiteSettings } from '@/types'

export const getSettings = () => get<ApiResponse<SiteSettings>>(ENDPOINTS.SETTINGS)

export const updateSettings = (settings: { key: string; value: string }[]) =>
  put<ApiResponse<unknown>>(ENDPOINTS.SETTINGS, { settings })
