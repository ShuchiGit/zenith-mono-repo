import { get, patch } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Enquiry, EnquiryStatus } from '@/types'

export const getEnquiries = (params?: Record<string, unknown>) =>
  get<ApiResponse<Enquiry[]>>(ENDPOINTS.ENQUIRIES, params)

export const getEnquiry = (id: number) =>
  get<ApiResponse<Enquiry>>(ENDPOINTS.ENQUIRY(id))

export const updateEnquiryStatus = (id: number, status: EnquiryStatus) =>
  patch<ApiResponse<Enquiry>>(ENDPOINTS.ENQUIRY_STATUS(id), { status })

export const updateEnquiryNotes = (id: number, notes: string) =>
  patch<ApiResponse<Enquiry>>(ENDPOINTS.ENQUIRY_NOTES(id), { notes })
