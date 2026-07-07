import { BookOpen, GraduationCap, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dashboardApi } from '../api/services'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { getApiError } from '../utils/errors'
import { formatDateTime } from '../utils/formatters'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await dashboardApi.getStats()
        setStats(data)
      } catch (apiError) {
        setError(getApiError(apiError))
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return <LoadingSpinner label="Loading dashboard" />
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of students, courses, and course assignments." />
      <ErrorMessage message={error} />

      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard title="Total Students" value={stats.totalStudents} icon={Users} tone="blue" />
            <StatCard title="Total Courses" value={stats.totalCourses} icon={BookOpen} tone="emerald" />
            <StatCard title="Total Enrollments" value={stats.totalEnrollments} icon={GraduationCap} tone="slate" />
          </div>

          <section className="rounded-md border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-950">Recent Enrollments</h2>
            </div>

            {stats.recentEnrollments?.length ? (
              <div className="divide-y divide-slate-100">
                {stats.recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{enrollment.studentName}</p>
                      <p className="text-sm text-slate-500">{enrollment.courseTitle}</p>
                    </div>
                    <p className="text-sm text-slate-500">{formatDateTime(enrollment.enrollmentDate)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5">
                <EmptyState title="No enrollments yet" message="Recent course assignments will appear here after you enroll students." />
              </div>
            )}
          </section>
        </>
      ) : null}
    </div>
  )
}
