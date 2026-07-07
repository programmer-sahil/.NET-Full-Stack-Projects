import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { coursesApi } from '../api/services'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import DataTable from '../components/DataTable'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadCourses = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data } = await coursesApi.getAll(search)
      setCourses(data)
    } catch (apiError) {
      setError(getApiError(apiError))
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const timer = setTimeout(loadCourses, 300)
    return () => clearTimeout(timer)
  }, [loadCourses])

  const handleDelete = async () => {
    if (!selectedCourse) {
      return
    }

    setIsDeleting(true)
    setError('')

    try {
      await coursesApi.remove(selectedCourse.id)
      setSelectedCourse(null)
      await loadCourses()
    } catch (apiError) {
      setError(getApiError(apiError))
    } finally {
      setIsDeleting(false)
    }
  }

  const columns = [
    {
      key: 'courseTitle',
      header: 'Course',
      render: (course) => (
        <div>
          <p className="font-semibold text-slate-900">{course.courseTitle}</p>
          <p className="text-xs font-semibold uppercase text-blue-600">{course.courseCode}</p>
        </div>
      ),
    },
    { key: 'credits', header: 'Credits' },
    { key: 'instructorName', header: 'Instructor' },
    {
      key: 'description',
      header: 'Description',
      render: (course) => <span className="line-clamp-2 max-w-md text-slate-600">{course.description || '-'}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      cellClassName: 'whitespace-nowrap',
      render: (course) => (
        <div className="flex items-center gap-2">
          <Link className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700" to={`/courses/${course.id}`} title="View course">
            <Eye className="h-4 w-4" />
          </Link>
          <Link className="rounded-md p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700" to={`/courses/${course.id}/edit`} title="Edit course">
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
            onClick={() => setSelectedCourse(course)}
            title="Delete course"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <PageHeader title="Courses" description="Create and manage available courses." actionLabel="Add Course" actionTo="/courses/add" actionIcon={Plus} />

      <div className="relative w-full sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-h-11 w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm shadow-sm focus:border-blue-500"
          placeholder="Search by title or code"
        />
      </div>

      <ErrorMessage message={error} />
      {loading ? <LoadingSpinner label="Loading courses" /> : <DataTable columns={columns} data={courses} emptyMessage="No courses match your search." />}

      <ConfirmDeleteModal
        open={Boolean(selectedCourse)}
        title="Delete course"
        message={`Delete ${selectedCourse?.courseTitle || 'this course'} and related enrollments?`}
        onCancel={() => setSelectedCourse(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
