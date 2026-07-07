import { Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { enrollmentsApi } from '../api/services'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import DataTable from '../components/DataTable'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'
import { formatDateTime } from '../utils/formatters'

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadEnrollments = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data } = await enrollmentsApi.getAll()
      setEnrollments(data)
    } catch (apiError) {
      setError(getApiError(apiError))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEnrollments()
  }, [loadEnrollments])

  const handleDelete = async () => {
    if (!selectedEnrollment) {
      return
    }

    setIsDeleting(true)
    setError('')

    try {
      await enrollmentsApi.remove(selectedEnrollment.id)
      setSelectedEnrollment(null)
      await loadEnrollments()
    } catch (apiError) {
      setError(getApiError(apiError))
    } finally {
      setIsDeleting(false)
    }
  }

  const columns = [
    {
      key: 'studentName',
      header: 'Student',
      render: (enrollment) => <span className="font-semibold text-slate-900">{enrollment.studentName}</span>,
    },
    {
      key: 'courseTitle',
      header: 'Course',
      render: (enrollment) => (
        <div>
          <p className="font-semibold text-slate-900">{enrollment.courseTitle}</p>
          <p className="text-xs font-semibold uppercase text-blue-600">{enrollment.courseCode}</p>
        </div>
      ),
    },
    { key: 'grade', header: 'Grade', render: (enrollment) => enrollment.grade || '-' },
    { key: 'enrollmentDate', header: 'Enrollment Date', render: (enrollment) => formatDateTime(enrollment.enrollmentDate) },
    {
      key: 'actions',
      header: 'Actions',
      cellClassName: 'whitespace-nowrap',
      render: (enrollment) => (
        <button
          type="button"
          className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
          onClick={() => setSelectedEnrollment(enrollment)}
          title="Delete enrollment"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader title="Enrollments" description="Assign students to courses and view active records." actionLabel="Add Enrollment" actionTo="/enrollments/add" actionIcon={Plus} />
      <ErrorMessage message={error} />
      {loading ? <LoadingSpinner label="Loading enrollments" /> : <DataTable columns={columns} data={enrollments} emptyMessage="No enrollment records found." />}

      <ConfirmDeleteModal
        open={Boolean(selectedEnrollment)}
        title="Delete enrollment"
        message={`Remove ${selectedEnrollment?.studentName || 'this student'} from ${selectedEnrollment?.courseTitle || 'this course'}?`}
        onCancel={() => setSelectedEnrollment(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
