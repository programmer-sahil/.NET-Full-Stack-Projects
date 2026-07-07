import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileText,
  Plus,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api, { getApiError } from '../api/axios.js'
import DashboardCard from '../components/DashboardCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Navbar from '../components/Navbar.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { STATUS_OPTIONS, formatDate } from '../utils/formatters.js'

const statusConfig = {
  Applied: { key: 'appliedCount', color: 'bg-blue-400' },
  Interview: { key: 'interviewCount', color: 'bg-amber-300' },
  Selected: { key: 'selectedCount', color: 'bg-emerald-400' },
  Rejected: { key: 'rejectedCount', color: 'bg-red-400' },
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      setLoading(true)
      setError('')

      try {
        const [statsResponse, applicationsResponse] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/applications'),
        ])

        if (isMounted) {
          setStats(statsResponse.data)
          setApplications(applicationsResponse.data)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(getApiError(requestError))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const recentApplications = useMemo(() => applications.slice(0, 5), [applications])

  return (
    <main className="app-shell">
      <div className="page-wrap">
        <Navbar />

        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Application overview</h1>
          </div>
          <Link to="/applications/new" className="btn-primary w-full sm:w-auto">
            <Plus size={18} aria-hidden="true" />
            Add application
          </Link>
        </section>

        {loading ? <LoadingSpinner label="Loading dashboard" /> : null}

        {!loading && error ? (
          <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {!loading && !error && stats ? (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <DashboardCard
                icon={BriefcaseBusiness}
                label="Total applications"
                value={stats.totalApplications}
                accent="text-teal-200"
              />
              <DashboardCard
                icon={FileText}
                label="Applied"
                value={stats.appliedCount}
                accent="text-blue-200"
              />
              <DashboardCard
                icon={Clock3}
                label="Interview"
                value={stats.interviewCount}
                accent="text-amber-200"
              />
              <DashboardCard
                icon={CheckCircle2}
                label="Selected"
                value={stats.selectedCount}
                accent="text-emerald-200"
              />
              <DashboardCard
                icon={XCircle}
                label="Rejected"
                value={stats.rejectedCount}
                accent="text-red-200"
              />
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="glass-card p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="section-heading">Status split</h2>
                    <p className="muted mt-1">Live distribution</p>
                  </div>
                  <CircleDot className="text-teal-200" size={24} aria-hidden="true" />
                </div>

                <div className="space-y-4">
                  {STATUS_OPTIONS.map((status) => {
                    const value = stats[statusConfig[status].key]
                    const percentage = stats.totalApplications
                      ? Math.round((value / stats.totalApplications) * 100)
                      : 0

                    return (
                      <div key={status}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-300">{status}</span>
                          <span className="text-slate-400">{percentage}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-lg bg-slate-900">
                          <div
                            className={`h-full rounded-lg ${statusConfig[status].color}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="section-heading">Recent applications</h2>
                    <p className="muted mt-1">Latest activity</p>
                  </div>
                  <Link to="/applications" className="btn-secondary min-h-10 px-3">
                    View all
                  </Link>
                </div>

                {recentApplications.length ? (
                  <div className="space-y-3">
                    {recentApplications.map((application) => (
                      <article
                        key={application.id}
                        className="rounded-lg border border-white/10 bg-white/[0.05] p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">
                              {application.companyName}
                            </p>
                            <p className="mt-1 truncate text-sm text-slate-400">
                              {application.jobRole} - {formatDate(application.applicationDate)}
                            </p>
                          </div>
                          <StatusBadge status={application.status} />
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No applications yet"
                    message="Your newest applications will appear here."
                    action={
                      <Link to="/applications/new" className="btn-primary">
                        <Plus size={18} aria-hidden="true" />
                        Add application
                      </Link>
                    }
                  />
                )}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}
