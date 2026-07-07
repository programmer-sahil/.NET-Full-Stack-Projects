import { Search, SlidersHorizontal, X } from 'lucide-react'
import { STATUS_OPTIONS } from '../utils/formatters.js'

export default function SearchFilterBar({ query, status, onQueryChange, onStatusChange, onClear }) {
  return (
    <div className="panel mb-6 grid gap-3 p-4 lg:grid-cols-[1fr_220px_auto] lg:items-center">
      <label className="relative block">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
        <input
          className="input-field pl-10"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search company, role, location, job type"
        />
      </label>

      <label className="relative block">
        <SlidersHorizontal
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
        <select
          className="input-field appearance-none pl-10"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className="btn-secondary" onClick={onClear}>
        <X size={17} aria-hidden="true" />
        Clear
      </button>
    </div>
  )
}
