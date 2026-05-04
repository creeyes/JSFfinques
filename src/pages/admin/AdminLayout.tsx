import { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../lib/api'
import {
  LayoutDashboard, Building2, FileText, Users, MessageSquare, LogOut,
} from 'lucide-react'

const NAV = [
  { to: '/admin/dashboard',     label: 'Dashboard',   short: 'Panel',   icon: LayoutDashboard },
  { to: '/admin/propiedades',   label: 'Propiedades', short: 'Props.',  icon: Building2 },
  { to: '/admin/blog',          label: 'Blog',        short: 'Blog',    icon: FileText },
  { to: '/admin/autores',       label: 'Autores',     short: 'Autores', icon: Users },
  { to: '/admin/mensajes',      label: 'Mensajes',    short: 'Msgs.',   icon: MessageSquare },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isLoggedIn()) navigate('/admin/login')
  }, [navigate])

  function handleLogout() {
    auth.logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex w-56 bg-stone-900 flex-col shrink-0">
        <div className="px-5 py-6 border-b border-stone-700">
          <p className="text-xs tracking-widest text-stone-400 uppercase">Admin</p>
          <p className="text-white font-bold text-lg leading-tight">JSF Finques</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-stone-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content — extra bottom padding on mobile for the tab bar */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom tab bar — mobile only */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-stone-900 border-t border-stone-700 z-50 flex">
        {NAV.map(({ to, short, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-amber-400' : 'text-stone-400'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[9px] font-medium">{short}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-stone-400"
        >
          <LogOut size={20} />
          <span className="text-[9px] font-medium">Salir</span>
        </button>
      </nav>
    </div>
  )
}
