"use client";

import { AppShell } from "@/components/AppShell";
import sessionData from "@/data/pt-sessions-public.json";
import dashboardSync from "@/data/dashboard-sync.json";
import { useMemo, useState } from "react";

export default function SessionsPage() {
  const [activeId, setActiveId] = useState(sessionData[0].id);
  const active = useMemo(() => sessionData.find((s) => s.id === activeId) ?? sessionData[0], [activeId]);

  return (
    <AppShell title="PT Sessions" subtitle="Session-notes style dashboard with anonymized public-safe content">
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">PT Timeline</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">Session History</h3>
          <div className="mt-4 space-y-2">
            {sessionData.map((s) => (
              <button key={s.id} onClick={() => setActiveId(s.id)} className={`w-full rounded-xl border p-3 text-left ${active.id === s.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-800"}`}>
                <div className="flex items-center justify-between"><span className="font-semibold">{s.label}</span><span className="text-xs uppercase">{s.status}</span></div>
                <p className="text-xs opacity-80">{s.date} • {s.time}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-[0.18em] text-blue-200">Current Session</p>
            <h2 className="mt-1 text-2xl font-bold">{active.label} · {active.provider.name}</h2>
            <p className="text-sm text-blue-100">{active.provider.organization} • {active.date}, {active.time}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Primary Concerns</h3>
              <div className="mt-3 space-y-2">
                {active.concerns.map((c) => (
                  <div key={c.priority} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-sm font-semibold">{c.priority}. {c.title}</p>
                    <p className="text-xs text-slate-600">{c.detail}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Assignments</h3>
              <div className="mt-3 space-y-2">
                {active.exercises.map((e) => (
                  <div key={e.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-sm font-semibold">{e.name}</p>
                    <p className="text-xs text-slate-600">{e.detail}</p>
                    <p className="text-xs font-semibold text-indigo-700">{e.sets}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Open Questions</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                {active.questions.map((q) => <li key={q}>{q}</li>)}
              </ol>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Session Event Timeline</h3>
              <div className="mt-3 space-y-2">
                {active.timeline.map((t) => (
                  <div key={t.timestamp + t.event} className="grid grid-cols-[82px_minmax(0,1fr)] gap-2 rounded-xl border border-slate-100 p-2">
                    <span className="rounded-md bg-slate-900 px-2 py-1 text-center text-xs font-bold text-white">{t.timestamp}</span>
                    <p className="text-sm text-slate-700">{t.event} <span className="text-xs text-slate-500">({t.owner})</span></p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="font-bold text-emerald-900">Pipeline-integrated notes (from dashboard-sync.json)</h3>
            <p className="mt-2 text-sm text-emerald-800">{dashboardSync.dashboard.enhanced_notes.reflective.narrative_summary}</p>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
