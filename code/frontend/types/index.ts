export type ProjectStatus = 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE' | 'NEW_LAUNCH'
export type PropertyType = 'FLAT' | 'SHOP' | 'PLOT' | 'STUDIO_APARTMENT'
export type EnquirySource =
  | 'hero'
  | 'project_detail'
  | 'property_detail'
  | 'sticky_widget'
  | 'contact_page'

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
  years_of_excellence?: string
  sqft_sold?: string
  inventory_sold_cr?: string
  team_size?: string
  phone?: string
  whatsapp?: string
  email?: string
  office_hours?: string
  address_noida?: string
  address_gzb?: string
  social_facebook?: string
  social_instagram?: string
  social_linkedin?: string
  social_youtube?: string
  social_whatsapp?: string
  gtm_id?: string
  meta_pixel_id?: string
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

export interface EnquiryPayload {
  name: string
  phone: string
  email?: string
  message?: string
  source: EnquirySource
  projectId?: number
  propertyId?: number
}

export interface ProjectFilters {
  city?: string
  status?: string
  bhkType?: string
  search?: string
  page?: number
  limit?: number
}

export interface PropertyFilters {
  city?: string
  status?: string
  type?: string
  bhkType?: string
  search?: string
  page?: number
  limit?: number
}
