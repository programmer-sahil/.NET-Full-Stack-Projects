export default function LoadingSpinner({ label = 'Loading' }) {
  return (
    <div className="flex min-h-48 items-center justify-center">
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-slate-200">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal-200 border-t-transparent" />
        {label}
      </div>
    </div>
  )
}
