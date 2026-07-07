import {
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import { formatDate } from '../utils/formatters.js'

export default function ApplicationCard({ application, onDelete }) {
  return (
    <article className="glass-card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-white">{application.companyName}</h3>
          <p className="mt-1 truncate text-sm text-slate-300">{application.jobRole}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300">
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-teal-200" aria-hidden="true" />
          <span className="truncate">{application.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <BriefcaseBusiness size={16} className="text-teal-200" aria-hidden="true" />
          <span className="truncate">{application.jobType}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={16} className="text-teal-200" aria-hidden="true" />
          <span>{formatDate(application.applicationDate)}</span>
        </p>
      </div>

      {application.notes ? (
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">{application.notes}</p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <Link to={`/applications/${application.id}/edit`} className="btn-secondary min-h-10 px-3">
          <Pencil size={16} aria-hidden="true" />
          Edit
        </Link>
        <button type="button" className="btn-danger" onClick={() => onDelete(application)}>
          <Trash2 size={16} aria-hidden="true" />
          Delete
        </button>
        {application.jobLink ? (
          <a
            href={application.jobLink}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary min-h-10 px-3"
            aria-label={`Open ${application.companyName} job link`}
          >
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}
