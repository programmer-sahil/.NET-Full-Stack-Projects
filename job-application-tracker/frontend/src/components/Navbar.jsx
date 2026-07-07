import { BriefcaseBusiness, LayoutDashboard, ListChecks, LogOut, Plus } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Applications', icon: ListChecks },
  { to: '/applications/new', label: 'Add', icon: Plus },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="mb-6 rounded-lg border border-white/10 bg-slate-950/70 px-4 py-4 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-400 text-slate-950 shadow-glow">
            <BriefcaseBusiness size={24} aria-hidden="true" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">Job Application Tracker</p>
            <p className="text-sm text-slate-400">{user?.fullName || 'Portfolio Project'}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-teal-400 text-slate-950'
                      : 'border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.09]',
                  ].join(' ')
                }
              >
                <Icon size={17} aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
          <button type="button" className="btn-secondary min-h-10 px-3" onClick={handleLogout}>
            <LogOut size={17} aria-hidden="true" />
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}
