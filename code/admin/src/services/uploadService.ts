import { postForm } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse } from '@/types'

export const uploadImage = (file: File, folder: string) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('folder', folder)
  return postForm<ApiResponse<{ url: string; key: string }>>(ENDPOINTS.UPLOAD_IMAGE, formData)
}
