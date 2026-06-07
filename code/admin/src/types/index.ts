export type ProjectStatus = 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE' | 'NEW_LAUNCH'
export type PropertyType = 'FLAT' | 'SHOP' | 'PLOT' | 'STUDIO_APARTMENT'
export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

export interface Admin {
  id: number
  email: string
  name: string
}

export interface Project {
  id: number
  name: string
  slug: string
  location: string
  sector?: string
  city: string
  bhkTypes: string
  priceMin: number
  priceMax: number
  status: ProjectStatus
  description?: string
  highlights: string[]
  amenities: string[]
  images: string[]
  coverImage?: string
  reraNumber?: string
  builderName?: string
  totalUnits?: number
  isActive: boolean
  isFeatured: boolean
  metaTitle?: string
  metaDesc?: string
  createdAt: string
  updatedAt: string
}

export interface Property {
  id: number
  name: string
  slug: string
  location: string
  sector?: string
  city: string
  bhkType: string
  price: number
  type: PropertyType
  status: ProjectStatus
  description?: string
  highlights: string[]
  images: string[]
  coverImage?: string
  carpetArea?: number
  superArea?: number
  floor?: number
  totalFloors?: number
  isActive: boolean
  isFeatured: boolean
  metaTitle?: string
  metaDesc?: string
  createdAt: string
  updatedAt: string
}

export interface Enquiry {
  id: number
  name: string
  phone: string
  email?: string
  message?: string
  source: string
  status: EnquiryStatus
  notes?: string
  projectId?: number
  propertyId?: number
  project?: { name: string }
  property?: { name: string }
  createdAt: string
  updatedAt: string
}

export interface Video {
  id: number
  title: string
  youtubeUrl: string
  youtubeId: string
  description?: string
  views?: string
  duration?: string
  publishedAt?: string
  isActive: boolean
  sortOrder: number
}

export interface SiteSettings {
  [key: string]: string | undefined
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  pagination?: Pagination
}
