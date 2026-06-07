import { post } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse } from '@/types'

export async function changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<unknown>> {
  return post<ApiResponse<unknown>>(ENDPOINTS.PASSWORD, { currentPassword, newPassword })
}
