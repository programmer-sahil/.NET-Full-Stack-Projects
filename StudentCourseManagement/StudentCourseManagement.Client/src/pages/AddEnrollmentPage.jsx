import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { coursesApi, enrollmentsApi, studentsApi } from '../api/services'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'

const initialForm = {
  studentId: '',
  courseId: '',
  grade: '',
}

export default function AddEnrollmentPage() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [studentsResponse, coursesResponse] = await Promise.all([studentsApi.getAll(), coursesApi.getAll()])
        setStudents(studentsResponse.data)
        setCourses(coursesResponse.data)
      } catch (error) {
        setApiError(getApiError(error))
      } finally {
        setLoading(false)
      }
    }

    loadOptions()
  }, [])

  const validate = () => {
    const nextErrors = {}
    if (!form.studentId) nextErrors.studentId = 'Student is required.'
    if (!form.courseId) nextErrors.courseId = 'Course is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setApiError('')

    if (!validate()) {
      return
    }

    setSaving(true)
    try {
      await enrollmentsApi.create({
        studentId: Number(form.studentId),
        courseId: Number(form.courseId),
        grade: form.grade.trim() || null,
      })
      navigate('/enrollments')
    } catch (error) {
      setApiError(getApiError(error))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading enrollment form" />
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Add Enrollment" description="Assign a student to a course." />
      <ErrorMessage message={apiError} />

      <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormSelect label="Student" name="studentId" value={form.studentId} onChange={handleChange} error={errors.studentId}>
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.fullName} ({student.email})
              </option>
            ))}
          </FormSelect>

          <FormSelect label="Course" name="courseId" value={form.courseId} onChange={handleChange} error={errors.courseId}>
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseCode} - {course.courseTitle}
              </option>
            ))}
          </FormSelect>

          <FormInput label="Grade Optional" name="grade" value={form.grade} onChange={handleChange} placeholder="A, B+, Pass" />
        </div>

        {!students.length || !courses.length ? (
          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Add at least one student and one course before creating enrollment records.
          </div>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link to="/enrollments" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <button type="submit" disabled={saving || !students.length || !courses.length} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Enrollment'}
          </button>
        </div>
      </form>
    </div>
  )
}
