import { Link } from 'react-router-dom'

export default function PageHeader({ title, description, actionLabel, actionTo, actionIcon: ActionIcon }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>

      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700"
        >
          {ActionIcon ? <ActionIcon className="h-4 w-4" /> : null}
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
