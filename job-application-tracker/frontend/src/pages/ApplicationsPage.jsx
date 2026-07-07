import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api, { getApiError } from '../api/axios.js'
import ApplicationCard from '../components/ApplicationCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Navbar from '../components/Navbar.jsx'
import SearchFilterBar from '../components/SearchFilterBar.jsx'

export default function ApplicationsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(location.state?.message || '')

  useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true })
    }
  }, [location.pathname, location.state, navigate])

  const loadApplications = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const hasFilters = query.trim() || status
      const { data } = hasFilters
        ? await api.get('/applications/search', {
            params: { query: query.trim(), status },
          })
        : await api.get('/applications')

      setApplications(data)
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setLoading(false)
    }
  }, [query, status])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadApplications()
    }, 250)

    return () => window.clearTimeout(timer)
  }, [loadApplications])

  async function handleDelete(application) {
    const confirmed = window.confirm(`Delete application for ${application.companyName}?`)

    if (!confirmed) {
      return
    }

    try {
      await api.delete(`/applications/${application.id}`)
      setNotice('Application deleted successfully.')
      await loadApplications()
    } catch (requestError) {
      setError(getApiError(requestError))
    }
  }

  function clearFilters() {
    setQuery('')
    setStatus('')
  }

  return (
    <main className="app-shell">
      <div className="page-wrap">
        <Navbar />

        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
              Applications
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Tracked roles</h1>
          </div>
          <Link to="/applications/new" className="btn-primary w-full sm:w-auto">
            <Plus size={18} aria-hidden="true" />
            Add application
          </Link>
        </section>

        {notice ? (
          <div className="mb-5 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            {notice}
          </div>
        ) : null}

        <SearchFilterBar
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
          onClear={clearFilters}
        />

        {loading ? <LoadingSpinner label="Loading applications" /> : null}

        {!loading && error ? (
          <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {!loading && !error && applications.length === 0 ? (
          <EmptyState
            title="No applications found"
            message="Try a different search or add your first tracked role."
            action={
              <Link to="/applications/new" className="btn-primary">
                <Plus size={18} aria-hidden="true" />
                Add application
              </Link>
            }
          />
        ) : null}

        {!loading && !error && applications.length > 0 ? (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onDelete={handleDelete}
              />
            ))}
          </section>
        ) : null}
      </div>
    </main>
  )
}
