import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { studentsApi } from '../api/services'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import DataTable from '../components/DataTable'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'
import { formatDate } from '../utils/formatters'

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadStudents = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data } = await studentsApi.getAll(search)
      setStudents(data)
    } catch (apiError) {
      setError(getApiError(apiError))
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const timer = setTimeout(loadStudents, 300)
    return () => clearTimeout(timer)
  }, [loadStudents])

  const handleDelete = async () => {
    if (!selectedStudent) {
      return
    }

    setIsDeleting(true)
    setError('')

    try {
      await studentsApi.remove(selectedStudent.id)
      setSelectedStudent(null)
      await loadStudents()
    } catch (apiError) {
      setError(getApiError(apiError))
    } finally {
      setIsDeleting(false)
    }
  }

  const columns = [
    {
      key: 'fullName',
      header: 'Student',
      render: (student) => (
        <div>
          <p className="font-semibold text-slate-900">{student.fullName}</p>
          <p className="text-xs text-slate-500">{student.email}</p>
        </div>
      ),
    },
    { key: 'phone', header: 'Phone' },
    { key: 'department', header: 'Department' },
    { key: 'dateOfBirth', header: 'Birth Date', render: (student) => formatDate(student.dateOfBirth) },
    {
      key: 'actions',
      header: 'Actions',
      cellClassName: 'whitespace-nowrap',
      render: (student) => (
        <div className="flex items-center gap-2">
          <Link className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700" to={`/students/${student.id}`} title="View student">
            <Eye className="h-4 w-4" />
          </Link>
          <Link className="rounded-md p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700" to={`/students/${student.id}/edit`} title="Edit student">
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
            onClick={() => setSelectedStudent(student)}
            title="Delete student"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader title="Students" description="Manage student profiles and departments." actionLabel="Add Student" actionTo="/students/add" actionIcon={Plus} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-h-11 w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm shadow-sm focus:border-blue-500"
            placeholder="Search by name, email, or department"
          />
        </div>
      </div>

      <ErrorMessage message={error} />
      {loading ? <LoadingSpinner label="Loading students" /> : <DataTable columns={columns} data={students} emptyMessage="No students match your search." />}

      <ConfirmDeleteModal
        open={Boolean(selectedStudent)}
        title="Delete student"
        message={`Delete ${selectedStudent?.fullName || 'this student'} and related enrollments?`}
        onCancel={() => setSelectedStudent(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
