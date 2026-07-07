import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="app-shell flex items-center">
      <section className="page-wrap">
        <div className="glass-card mx-auto max-w-lg p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Page not found</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            The page you opened does not exist.
          </p>
          <Link to="/dashboard" className="btn-primary mt-7">
            <Home size={18} aria-hidden="true" />
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  )
}
