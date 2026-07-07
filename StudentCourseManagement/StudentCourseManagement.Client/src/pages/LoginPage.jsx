import { GraduationCap, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'
import { useAuth } from '../context/useAuth'

export default function LoginPage() {
  const { login, isAuthLoading, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    email: 'admin@studentcms.com',
    password: 'Admin@123',
  })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Email and password are required.')
      return
    }

    try {
      await login(form)
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <section className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950">Student CMS</h1>
            <p className="text-sm text-slate-500">Admin sign in</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="admin@studentcms.com"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="Enter password"
          />

          <button
            type="submit"
            disabled={isAuthLoading}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LockKeyhole className="h-4 w-4" />
            {isAuthLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-5 rounded-md bg-slate-50 p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">Default credentials</p>
          <p className="mt-1">admin@studentcms.com / Admin@123</p>
        </div>
      </section>
    </main>
  )
}
