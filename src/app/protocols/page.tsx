import { AppShell } from "@/components/AppShell";
import sessions from "@/data/pt-sessions-public.json";

const active = sessions[0];

export default function ProtocolsPage() {
  return (
    <AppShell title="Protocols" subtitle="Clinical-style section structure with anonymized language">
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <h3 className="text-lg font-bold text-orange-900">Morning Protocol</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-orange-900">
            {active.protocol.morning.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <h3 className="text-lg font-bold text-red-900">Red Flags</h3>
          <div className="mt-3 space-y-2">
            {active.redFlags.map((r) => (
              <div key={r.symptom} className="rounded-lg border border-red-100 bg-white p-2">
                <p className="text-sm font-semibold text-slate-900">{r.symptom}</p>
                <p className="text-xs text-red-700">{r.action}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-lg font-bold text-slate-900">Care Team</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {active.careTeam.map((m) => (
            <div key={m.role + m.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{m.role}</p>
              <p className="font-semibold text-slate-900">{m.name}</p>
              {("org" in m && m.org) && <p className="text-xs text-slate-600">{m.org}</p>}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
