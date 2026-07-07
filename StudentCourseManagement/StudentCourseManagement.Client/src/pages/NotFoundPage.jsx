import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth()

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <section className="w-full max-w-lg rounded-md border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-bold uppercase text-blue-600">404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">The page you are looking for does not exist or has been moved.</p>
        <Link
          to={isAuthenticated ? '/' : '/login'}
          className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Home className="h-4 w-4" />
          {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
        </Link>
      </section>
    </main>
  )
}
