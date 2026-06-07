import { get, post, put, patch, del, postForm } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { ApiResponse, Project } from '@/types'

export const getProjects = (params?: Record<string, unknown>) =>
  get<ApiResponse<Project[]>>(ENDPOINTS.PROJECTS, params)

export const getProject = (id: number) =>
  get<ApiResponse<Project>>(ENDPOINTS.PROJECT(id))

export const createProject = (data: unknown) =>
  post<ApiResponse<Project>>(ENDPOINTS.PROJECTS, data)

export const updateProject = (id: number, data: unknown) =>
  put<ApiResponse<Project>>(ENDPOINTS.PROJECT(id), data)

export const toggleProject = (id: number) =>
  patch<ApiResponse<Project>>(ENDPOINTS.PROJECT_TOGGLE(id))

export const deleteProject = (id: number) =>
  del<ApiResponse<unknown>>(ENDPOINTS.PROJECT(id))

export const uploadProjectImages = (id: number, formData: FormData) =>
  postForm<ApiResponse<Project>>(ENDPOINTS.PROJECT_IMAGES(id), formData)

export const deleteProjectImage = (id: number, imageKey: string) =>
  del<ApiResponse<Project>>(ENDPOINTS.PROJECT_IMAGES(id) + `?imageKey=${encodeURIComponent(imageKey)}`)
