import { AppShell } from "@/components/AppShell";
import providersData from "@/data/providers-public.json";

export default function ProvidersPage() {
  return (
    <AppShell title="All Providers" subtitle="Supporting page depth matching session-notes navigation structure">
      <div className="grid gap-4 md:grid-cols-3">
        {providersData.systems.map((sys) => (
          <article key={sys.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">System</p>
            <h3 className="text-lg font-bold text-slate-900">{sys.name}</h3>
            <p className="text-sm text-slate-600">Color track: {sys.color}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {providersData.providers.map((p) => (
          <article key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">{p.name}</h3>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold uppercase text-slate-700">{p.status}</span>
            </div>
            <p className="text-sm text-slate-600">{p.credentials} · {p.specialty}</p>
            <p className="mt-2 text-sm text-slate-700">{p.organization}</p>
            <p className="text-xs text-slate-500">Frequency: {p.frequency}</p>
            <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-600">{p.notes}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
