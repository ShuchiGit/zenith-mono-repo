export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1'

export const ENDPOINTS = {
  PROJECTS: '/projects',
  PROJECTS_FEATURED: '/projects/featured',
  PROJECT_BY_SLUG: (slug: string) => `/projects/${slug}`,
  PROPERTIES: '/properties',
  PROPERTY_BY_SLUG: (slug: string) => `/properties/${slug}`,
  ENQUIRIES: '/enquiries',
  VIDEOS: '/videos',
  SETTINGS: '/settings',
} as const
