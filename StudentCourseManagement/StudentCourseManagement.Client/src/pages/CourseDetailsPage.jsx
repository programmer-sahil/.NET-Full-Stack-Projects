import { ArrowLeft, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { coursesApi } from '../api/services'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'
import { formatDate } from '../utils/formatters'

export default function CourseDetailsPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id)
        setCourse(data)
      } catch (apiError) {
        setError(getApiError(apiError))
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [id])

  if (loading) {
    return <LoadingSpinner label="Loading course details" />
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Course Details" description="View course catalog details." />
      <ErrorMessage message={error} />

      {course ? (
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-blue-600">{course.courseCode}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">{course.courseTitle}</h2>
              <p className="mt-1 text-sm text-slate-500">{course.description || 'No description added.'}</p>
            </div>
            <Link to={`/courses/${course.id}/edit`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <DetailItem label="Credits" value={course.credits} />
            <DetailItem label="Instructor" value={course.instructorName} />
            <DetailItem label="Created At" value={formatDate(course.createdAt)} />
          </dl>

          <div className="mt-6">
            <Link to="/courses" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-md bg-slate-50 p-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  )
}
