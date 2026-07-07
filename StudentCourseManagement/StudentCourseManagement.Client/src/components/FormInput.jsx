export default function FormInput({ label, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        className={`min-h-11 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 ${
          error ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'
        }`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  )
}
