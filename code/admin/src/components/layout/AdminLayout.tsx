import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Home,
  MessageSquare,
  Video,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const NAV = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: Building2 },
  { label: 'Properties', href: '/properties', icon: Home },
  { label: 'Enquiries', href: '/enquiries', icon: MessageSquare },
  { label: 'Videos', href: '/videos', icon: Video },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export function AdminLayout() {
  const { admin, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className="w-64 flex flex-col flex-shrink-0 overflow-y-auto" style={{ backgroundColor: '#001f22' }}>
        <div className="p-5 border-b border-white/10">
          <h1 className="text-white font-bold text-lg">Zenith Estate</h1>
          <p className="text-[#83c5be] text-xs mt-0.5">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#006d77] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon className="w-4.5 h-4.5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#006d77] flex items-center justify-center text-white text-sm font-bold">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
              <p className="text-white/40 text-xs truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
          <span>Zenith Estate</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
