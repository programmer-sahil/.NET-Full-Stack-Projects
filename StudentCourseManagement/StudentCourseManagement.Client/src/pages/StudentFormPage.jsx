import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { studentsApi } from '../api/services'
import ErrorMessage from '../components/ErrorMessage'
import FormInput from '../components/FormInput'
import LoadingSpinner from '../components/LoadingSpinner'
import PageHeader from '../components/PageHeader'
import { getApiError } from '../utils/errors'
import { toDateInputValue } from '../utils/formatters'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  dateOfBirth: '',
}

export default function StudentFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  const title = useMemo(() => (isEdit ? 'Edit Student' : 'Add Student'), [isEdit])

  useEffect(() => {
    if (!isEdit) {
      return
    }

    const loadStudent = async () => {
      try {
        const { data } = await studentsApi.getById(id)
        setForm({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          department: data.department,
          dateOfBirth: toDateInputValue(data.dateOfBirth),
        })
      } catch (error) {
        setApiError(getApiError(error))
      } finally {
        setLoading(false)
      }
    }

    loadStudent()
  }, [id, isEdit])

  const validate = () => {
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.'
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required.'
    if (!form.department.trim()) nextErrors.department = 'Department is required.'
    if (!form.dateOfBirth) nextErrors.dateOfBirth = 'Date of birth is required.'
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
        dateOfBirth: form.dateOfBirth,
      }

      const { data } = isEdit ? await studentsApi.update(id, payload) : await studentsApi.create(payload)
      navigate(`/students/${data.id}`)
    } catch (error) {
      setApiError(getApiError(error))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading student" />
  }

  return (
    <div className="space-y-5">
      <PageHeader title={title} description="Keep student contact and academic details up to date." />
      <ErrorMessage message={apiError} />

      <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="Rahul Sharma" />
          <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="student@example.com" />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+91 9876543210" />
          <FormInput label="Department" name="department" value={form.department} onChange={handleChange} error={errors.department} placeholder="Computer Science" />
          <FormInput label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link to="/students" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <button type="submit" disabled={saving} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  )
}
