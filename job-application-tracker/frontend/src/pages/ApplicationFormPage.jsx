import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api, { getApiError } from '../api/axios.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Navbar from '../components/Navbar.jsx'
import { STATUS_OPTIONS, todayInputValue, toDateInputValue } from '../utils/formatters.js'

const initialForm = {
  companyName: '',
  jobRole: '',
  location: '',
  jobType: 'Full-time',
  applicationDate: todayInputValue(),
  status: 'Applied',
  notes: '',
  jobLink: '',
}

export default function ApplicationFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadApplication() {
      if (!isEdit) {
        return
      }

      setLoading(true)
      setError('')

      try {
        const { data } = await api.get(`/applications/${id}`)

        if (isMounted) {
          setForm({
            companyName: data.companyName || '',
            jobRole: data.jobRole || '',
            location: data.location || '',
            jobType: data.jobType || '',
            applicationDate: toDateInputValue(data.applicationDate),
            status: data.status || 'Applied',
            notes: data.notes || '',
            jobLink: data.jobLink || '',
          })
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

    loadApplication()

    return () => {
      isMounted = false
    }
  }, [id, isEdit])

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.companyName.trim() || !form.jobRole.trim() || !form.location.trim() || !form.jobType.trim()) {
      setError('Company name, job role, location, and job type are required.')
      return
    }

    const payload = {
      ...form,
      companyName: form.companyName.trim(),
      jobRole: form.jobRole.trim(),
      location: form.location.trim(),
      jobType: form.jobType.trim(),
      notes: form.notes.trim(),
      jobLink: form.jobLink.trim(),
    }

    setSaving(true)

    try {
      if (isEdit) {
        await api.put(`/applications/${id}`, payload)
      } else {
        await api.post('/applications', payload)
      }

      navigate('/applications', {
        state: { message: `Application ${isEdit ? 'updated' : 'added'} successfully.` },
      })
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="app-shell">
      <div className="page-wrap">
        <Navbar />

        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
              {isEdit ? 'Edit role' : 'Add role'}
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              {isEdit ? 'Update application' : 'New application'}
            </h1>
          </div>
          <Link to="/applications" className="btn-secondary w-full sm:w-auto">
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </Link>
        </section>

        {loading ? <LoadingSpinner label="Loading application" /> : null}

        {!loading ? (
          <form className="glass-card p-5 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
            {error ? (
              <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="field-label">Company name</span>
                <input
                  className="input-field"
                  name="companyName"
                  value={form.companyName}
                  onChange={updateField}
                  placeholder="Microsoft"
                  required
                />
              </label>
              <label>
                <span className="field-label">Job role</span>
                <input
                  className="input-field"
                  name="jobRole"
                  value={form.jobRole}
                  onChange={updateField}
                  placeholder=".NET Developer"
                  required
                />
              </label>
              <label>
                <span className="field-label">Location</span>
                <input
                  className="input-field"
                  name="location"
                  value={form.location}
                  onChange={updateField}
                  placeholder="Bengaluru / Remote"
                  required
                />
              </label>
              <label>
                <span className="field-label">Job type</span>
                <input
                  className="input-field"
                  name="jobType"
                  value={form.jobType}
                  onChange={updateField}
                  placeholder="Full-time"
                  required
                />
              </label>
              <label>
                <span className="field-label">Application date</span>
                <input
                  className="input-field"
                  name="applicationDate"
                  type="date"
                  value={form.applicationDate}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                <span className="field-label">Status</span>
                <select
                  className="input-field"
                  name="status"
                  value={form.status}
                  onChange={updateField}
                  required
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="md:col-span-2">
                <span className="field-label">Job link</span>
                <input
                  className="input-field"
                  name="jobLink"
                  type="url"
                  value={form.jobLink}
                  onChange={updateField}
                  placeholder="https://company.com/careers/role"
                />
              </label>
              <label className="md:col-span-2">
                <span className="field-label">Notes</span>
                <textarea
                  className="input-field min-h-32 resize-y"
                  name="notes"
                  value={form.notes}
                  onChange={updateField}
                  placeholder="Recruiter details, interview notes, follow-up reminders"
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link to="/applications" className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn-primary" disabled={saving}>
                <Save size={18} aria-hidden="true" />
                {saving ? 'Saving...' : 'Save application'}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </main>
  )
}
