import { AppShell } from "@/components/AppShell";
import data from "@/data/wellness-public.json";

export default function AnalyticsPage() {
  return (
    <AppShell title="Wellness Analytics" subtitle="PERMA-V + trend cards with public-safe placeholders">
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Overall" value={`${data.summary.overall_wellness_score}/10`} />
        <Metric label="Supplements" value={`${data.summary.supplement_adherence}%`} />
        <Metric label="Nutrition" value={`${data.summary.meal_adherence}%`} />
        <Metric label="Recovery" value={`${data.summary.recovery_progress}%`} />
      </div>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-bold">PERMA-V Snapshot</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {Object.entries(data.perma_v.dimensions).map(([k, v]) => (
            <div key={k} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{k.replaceAll("_", " ")}</p>
              <p className="text-xl font-bold text-slate-900">{v}/10</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-bold">Weekly Trend</h3>
        <div className="mt-3 space-y-2">
          {data.timeline.map((row) => (
            <div key={row.week} className="flex items-center justify-between rounded-lg border border-slate-100 p-2">
              <span className="text-sm text-slate-600">{row.week}</span>
              <span className="font-semibold text-slate-900">{row.score}</span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white shadow-lg">
      <p className="text-xs uppercase tracking-[0.14em] text-blue-200">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </article>
  );
}
