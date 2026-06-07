import { get, post, put, patch, del, postForm } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Property } from '@/types'

export const getProperties = (params?: Record<string, unknown>) =>
  get<ApiResponse<Property[]>>(ENDPOINTS.PROPERTIES, params)

export const getProperty = (id: number) =>
  get<ApiResponse<Property>>(ENDPOINTS.PROPERTY(id))

export const createProperty = (data: unknown) =>
  post<ApiResponse<Property>>(ENDPOINTS.PROPERTIES, data)

export const updateProperty = (id: number, data: unknown) =>
  put<ApiResponse<Property>>(ENDPOINTS.PROPERTY(id), data)

export const toggleProperty = (id: number) =>
  patch<ApiResponse<Property>>(ENDPOINTS.PROPERTY_TOGGLE(id))

export const deleteProperty = (id: number) =>
  del<ApiResponse<unknown>>(ENDPOINTS.PROPERTY(id))

export const uploadPropertyImages = (id: number, formData: FormData) =>
  postForm<ApiResponse<Property>>(ENDPOINTS.PROPERTY_IMAGES(id), formData)
