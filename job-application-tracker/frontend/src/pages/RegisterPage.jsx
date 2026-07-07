import { BriefcaseBusiness, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { getApiError } from '../api/axios.js'
import { useAuth } from '../context/useAuth.js'

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await api.post('/auth/register', form)
      login(data)
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-shell flex items-center">
      <section className="page-wrap grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-amber-300 text-slate-950 shadow-glow">
            <BriefcaseBusiness size={30} aria-hidden="true" />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
            CV-ready full stack project
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Track every opportunity with confidence.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            Built with React, ASP.NET Core, JWT authentication, EF Core, and SQLite.
          </p>
        </div>

        <form className="glass-card mx-auto w-full max-w-md p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Create account</h2>
            <p className="mt-2 text-sm text-slate-400">Start your tracker.</p>
          </div>

          {error ? (
            <div className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <div className="space-y-5">
            <label>
              <span className="field-label">Full name</span>
              <input
                className="input-field"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              <span className="field-label">Email</span>
              <input
                className="input-field"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              <span className="field-label">Password</span>
              <input
                className="input-field"
                name="password"
                type="password"
                minLength={6}
                value={form.password}
                onChange={updateField}
                placeholder="Minimum 6 characters"
                required
              />
            </label>
          </div>

          <button type="submit" className="btn-primary mt-7 w-full" disabled={loading}>
            <UserPlus size={18} aria-hidden="true" />
            {loading ? 'Creating...' : 'Register'}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already registered?{' '}
            <Link className="font-semibold text-teal-200 hover:text-teal-100" to="/login">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
