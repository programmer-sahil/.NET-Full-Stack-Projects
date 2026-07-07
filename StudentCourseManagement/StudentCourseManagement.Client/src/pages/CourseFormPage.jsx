import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { coursesApi } from '../api/services'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'

const initialForm = {
  courseCode: '',
  courseTitle: '',
  credits: 3,
  instructorName: '',
  description: '',
}

export default function CourseFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  const title = useMemo(() => (isEdit ? 'Edit Course' : 'Add Course'), [isEdit])

  useEffect(() => {
    if (!isEdit) {
      return
    }

    const loadCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id)
        setForm({
          courseCode: data.courseCode,
          courseTitle: data.courseTitle,
          credits: data.credits,
          instructorName: data.instructorName,
          description: data.description || '',
        })
      } catch (error) {
        setApiError(getApiError(error))
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [id, isEdit])

  const validate = () => {
    const nextErrors = {}
    if (!form.courseCode.trim()) nextErrors.courseCode = 'Course code is required.'
    if (!form.courseTitle.trim()) nextErrors.courseTitle = 'Course title is required.'
    if (!Number(form.credits) || Number(form.credits) < 1) nextErrors.credits = 'Credits must be at least 1.'
    if (Number(form.credits) > 8) nextErrors.credits = 'Credits cannot be more than 8.'
    if (!form.instructorName.trim()) nextErrors.instructorName = 'Instructor name is required.'
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
      const payload = {
        ...form,
        credits: Number(form.credits),
      }

      const { data } = isEdit ? await coursesApi.update(id, payload) : await coursesApi.create(payload)
      navigate(`/courses/${data.id}`)
    } catch (error) {
      setApiError(getApiError(error))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading course" />
  }

  return (
    <div className="space-y-5">
      <PageHeader title={title} description="Maintain course catalog information." />
      <ErrorMessage message={apiError} />

      <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Course Code" name="courseCode" value={form.courseCode} onChange={handleChange} error={errors.courseCode} placeholder="CS101" />
          <FormInput label="Course Title" name="courseTitle" value={form.courseTitle} onChange={handleChange} error={errors.courseTitle} placeholder="Introduction to Programming" />
          <FormInput label="Credits" name="credits" type="number" min="1" max="8" value={form.credits} onChange={handleChange} error={errors.credits} />
          <FormInput label="Instructor Name" name="instructorName" value={form.instructorName} onChange={handleChange} error={errors.instructorName} placeholder="Dr. Meera Iyer" />
          <label className="block md:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500"
              placeholder="Short course summary"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link to="/courses" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <button type="submit" disabled={saving} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </form>
    </div>
  )
}
