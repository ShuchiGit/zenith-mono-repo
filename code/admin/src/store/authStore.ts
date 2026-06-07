import { create } from 'zustand'
import { get, post } from '@/lib/apiClient'
import { ENDPOINTS } from '@/constants/api'
import type { Admin, ApiResponse } from '@/types'

const TOKEN_KEY = 'zenith_admin_token'

interface AuthState {
  admin: Admin | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const res = await post<ApiResponse<{ accessToken: string; admin: Admin }>>(ENDPOINTS.LOGIN, {
        email,
        password,
      })
      localStorage.setItem(TOKEN_KEY, res.data.accessToken)
      set({ admin: res.data.admin })
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ admin: null })
    window.location.href = '/login'
  },

  fetchMe: async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return
    try {
      const res = await get<ApiResponse<Admin>>(ENDPOINTS.ME)
      set({ admin: res.data })
    } catch {
      localStorage.removeItem(TOKEN_KEY)
    }
  },
}))
