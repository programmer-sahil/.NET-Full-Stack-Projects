const badgeStyles = {
  Applied: 'border-blue-400/30 bg-blue-500/15 text-blue-100',
  Interview: 'border-amber-400/30 bg-amber-500/15 text-amber-100',
  Selected: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100',
  Rejected: 'border-red-400/30 bg-red-500/15 text-red-100',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-lg border px-3 py-1 text-xs font-semibold ${
        badgeStyles[status] || 'border-slate-400/30 bg-slate-500/15 text-slate-100'
      }`}
    >
      {status}
    </span>
  )
}
