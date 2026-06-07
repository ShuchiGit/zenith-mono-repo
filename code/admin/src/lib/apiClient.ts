import axios, { type AxiosError } from 'axios'
import { API_BASE_URL } from '@/constants/api'

const TOKEN_KEY = 'zenith_admin_token'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

interface ApiError {
  message: string
  errors?: { field: string; message: string }[]
  status: number
}

instance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message: string; errors?: { field: string; message: string }[] }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
    }
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors,
      status: error.response?.status || 500,
    }
    return Promise.reject(apiError)
  }
)

export const get = <T>(url: string, params?: Record<string, unknown>): Promise<T> =>
  instance.get(url, { params }) as unknown as Promise<T>

export const post = <T>(url: string, data?: unknown): Promise<T> =>
  instance.post(url, data) as unknown as Promise<T>

export const put = <T>(url: string, data?: unknown): Promise<T> =>
  instance.put(url, data) as unknown as Promise<T>

export const patch = <T>(url: string, data?: unknown): Promise<T> =>
  instance.patch(url, data) as unknown as Promise<T>

export const del = <T>(url: string): Promise<T> =>
  instance.delete(url) as unknown as Promise<T>

export const postForm = <T>(url: string, formData: FormData): Promise<T> =>
  instance.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }) as unknown as Promise<T>

export default instance
