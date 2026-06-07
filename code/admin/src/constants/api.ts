export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1'

export const ENDPOINTS = {
  LOGIN: '/admin/login',
  REFRESH: '/admin/refresh',
  ME: '/admin/me',
  PASSWORD: '/admin/password',

  PROJECTS: '/projects',
  PROJECT: (id: number) => `/projects/${id}`,
  PROJECT_TOGGLE: (id: number) => `/projects/${id}/toggle`,
  PROJECT_IMAGES: (id: number) => `/projects/${id}/images`,

  PROPERTIES: '/properties',
  PROPERTY: (id: number) => `/properties/${id}`,
  PROPERTY_TOGGLE: (id: number) => `/properties/${id}/toggle`,
  PROPERTY_IMAGES: (id: number) => `/properties/${id}/images`,

  ENQUIRIES: '/enquiries',
  ENQUIRY: (id: number) => `/enquiries/${id}`,
  ENQUIRY_STATUS: (id: number) => `/enquiries/${id}/status`,
  ENQUIRY_NOTES: (id: number) => `/enquiries/${id}/notes`,

  VIDEOS: '/videos',
  VIDEO: (id: number) => `/videos/${id}`,
  VIDEO_ORDER: (id: number) => `/videos/${id}/order`,

  SETTINGS: '/settings',
  UPLOAD_IMAGE: '/upload/image',
} as const
