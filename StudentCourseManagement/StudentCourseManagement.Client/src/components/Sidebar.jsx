import { BookOpen, GraduationCap, LayoutDashboard, Users, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Students', to: '/students', icon: Users },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Enrollments', to: '/enrollments', icon: GraduationCap },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation overlay"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div>
            <p className="text-base font-bold text-slate-950">Student CMS</p>
            <p className="text-xs font-medium text-slate-500">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-md bg-slate-50 p-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Default Admin</p>
            <p className="mt-1 break-all">admin@studentcms.com</p>
          </div>
        </div>
      </aside>
    </>
  )
}
