import { get } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Video } from '@/types'

export async function getVideos(): Promise<ApiResponse<Video[]>> {
  return get<ApiResponse<Video[]>>(ENDPOINTS.VIDEOS)
}
