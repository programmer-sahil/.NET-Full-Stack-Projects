import { ArrowLeft, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { studentsApi } from '../api/services'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'
import { formatDate } from '../utils/formatters'

export default function StudentDetailsPage() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const { data } = await studentsApi.getById(id)
        setStudent(data)
      } catch (apiError) {
        setError(getApiError(apiError))
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [id])

  if (loading) {
    return <LoadingSpinner label="Loading student details" />
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Student Details" description="View the selected student profile." />
      <ErrorMessage message={error} />

      {student ? (
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{student.fullName}</h2>
              <p className="mt-1 text-sm text-slate-500">{student.email}</p>
            </div>
            <Link to={`/students/${student.id}/edit`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <DetailItem label="Phone" value={student.phone} />
            <DetailItem label="Department" value={student.department} />
            <DetailItem label="Date of Birth" value={formatDate(student.dateOfBirth)} />
            <DetailItem label="Created At" value={formatDate(student.createdAt)} />
          </dl>

          <div className="mt-6">
            <Link to="/students" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4" />
              Back to Students
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
