import { get, post, put, patch, del } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Video } from '@/types'

export const getVideos = () => get<ApiResponse<Video[]>>(ENDPOINTS.VIDEOS)

export const createVideo = (data: unknown) => post<ApiResponse<Video>>(ENDPOINTS.VIDEOS, data)

export const updateVideo = (id: number, data: unknown) =>
  put<ApiResponse<Video>>(ENDPOINTS.VIDEO(id), data)

export const updateVideoOrder = (id: number, sortOrder: number) =>
  patch<ApiResponse<Video>>(ENDPOINTS.VIDEO_ORDER(id), { sortOrder })

export const deleteVideo = (id: number) => del<ApiResponse<unknown>>(ENDPOINTS.VIDEO(id))
