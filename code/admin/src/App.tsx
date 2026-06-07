import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ToastProvider } from '@/components/ui/Toast'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectFormPage } from '@/pages/ProjectFormPage'
import { PropertiesPage } from '@/pages/PropertiesPage'
import { PropertyFormPage } from '@/pages/PropertyFormPage'
import { EnquiriesPage } from '@/pages/EnquiriesPage'
import { VideosPage } from '@/pages/VideosPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { useAuthStore } from '@/store/authStore'
import { PageLoader } from '@/components/ui/Loader'

function ProtectedRouteWrapper() {
  const { admin, fetchMe } = useAuthStore()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetchMe().finally(() => setReady(true))
  }, [fetchMe])

  if (!ready) return <PageLoader />
  if (!admin) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRouteWrapper />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/new" element={<ProjectFormPage />} />
              <Route path="/projects/:id/edit" element={<ProjectFormPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/new" element={<PropertyFormPage />} />
              <Route path="/properties/:id/edit" element={<PropertyFormPage />} />
              <Route path="/enquiries" element={<EnquiriesPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
