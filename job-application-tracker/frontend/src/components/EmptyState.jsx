import { Inbox } from 'lucide-react'

export default function EmptyState({ title, message, action }) {
  return (
    <div className="panel flex min-h-72 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-teal-400/10 text-teal-200">
        <Inbox size={28} aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {message ? <p className="mt-2 max-w-md text-sm text-slate-400">{message}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
