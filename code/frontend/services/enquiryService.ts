import { post } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, EnquiryPayload } from '@/types'

export async function submitEnquiry(payload: EnquiryPayload): Promise<ApiResponse<unknown>> {
  return post<ApiResponse<unknown>>(ENDPOINTS.ENQUIRIES, payload)
}
