export default function DashboardCard({ icon: Icon, label, value, accent = 'text-teal-200' }) {
  return (
    <article className="glass-card p-5 transition hover:-translate-y-0.5 hover:border-white/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`rounded-lg border border-white/10 bg-white/[0.07] p-3 ${accent}`}>
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}
