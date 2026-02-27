"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SessionStatus = "completed" | "upcoming" | "in-review";
type Severity = "high" | "moderate" | "watch";

type Session = {
  id: string;
  label: string;
  date: string;
  time: string;
  status: SessionStatus;
  provider: string;
  site: string;
  objective: string;
  metrics: {
    label: string;
    value: string;
    delta: string;
    direction: "up" | "down" | "flat";
  }[];
  findings: {
    title: string;
    detail: string;
    severity: Severity;
  }[];
  assignments: {
    title: string;
    dosage: string;
    confidence: string;
  }[];
  openQuestions: string[];
  followUps: string[];
  notes: string[];
  timeline: {
    timestamp: string;
    event: string;
    owner: string;
  }[];
};

const sessions: Session[] = [
  {
    id: "s4",
    label: "Session 4",
    date: "Feb 25, 2026",
    time: "5:00 PM",
    status: "in-review",
    provider: "Lead PT",
    site: "Performance Recovery Studio",
    objective: "Consolidate trunk stability gains and reduce shoulder compensation under load.",
    metrics: [
      { label: "mobility_bandwidth", value: "74", delta: "+6", direction: "up" },
      { label: "guarding_load", value: "38", delta: "-9", direction: "down" },
      { label: "breath_capacity", value: "8.1/10", delta: "+0.8", direction: "up" },
      { label: "pain_after_drive", value: "4/10", delta: "-1", direction: "down" },
    ],
    findings: [
      {
        title: "Scapular control improved during supported hangs",
        detail: "Observed steadier position through final two rounds when breath cadence remained slow.",
        severity: "watch",
      },
      {
        title: "Rotation remains sensitive past mid-range",
        detail: "Compensation appears when fatigue rises; keep anti-rotation emphasis in home program.",
        severity: "moderate",
      },
      {
        title: "Morning stiffness still impacts first activity block",
        detail: "Needs tighter warm-up sequencing before driving or long desk windows.",
        severity: "moderate",
      },
    ],
    assignments: [
      {
        title: "Isometric wall press + exhale hold",
        dosage: "3 sets x 5 reps, 20-second holds",
        confidence: "Form confidence: high",
      },
      {
        title: "Band-resisted step-outs (anti-rotation)",
        dosage: "2 sets x 8 steps each side",
        confidence: "Form confidence: medium",
      },
      {
        title: "Supported decompression hang",
        dosage: "4 rounds x 25 seconds",
        confidence: "Form confidence: medium",
      },
    ],
    openQuestions: [
      "Which at-home marker should trigger progression from supported to unsupported holds?",
      "Can seated travel days use a reduced assignment variant without losing momentum?",
      "Should weekly check-ins include a custom fatigue metric tied to sleep quality?",
    ],
    followUps: [
      "Share 2 short form-check clips before next visit.",
      "Capture daily custom metric `morning_settle_minutes` for 7 days.",
      "Re-score movement confidence after assignment block on Sunday.",
    ],
    notes: [
      "User-provided context indicates occasional desk-heavy days and variable sleep quality.",
      "This workspace tracks operational patterns and is not a medical diagnosis tool.",
    ],
    timeline: [
      { timestamp: "4:42 PM", event: "Baseline movement screen logged", owner: "PT" },
      { timestamp: "4:55 PM", event: "Assignment set A adjusted for breathing cadence", owner: "PT" },
      { timestamp: "5:11 PM", event: "Custom metric labels updated in-session", owner: "User" },
      { timestamp: "5:24 PM", event: "Follow-up capture plan confirmed", owner: "Both" },
    ],
  },
  {
    id: "s3",
    label: "Session 3",
    date: "Feb 18, 2026",
    time: "5:00 PM",
    status: "completed",
    provider: "Lead PT",
    site: "Performance Recovery Studio",
    objective: "Increase posterior chain engagement while reducing trunk extension default.",
    metrics: [
      { label: "mobility_bandwidth", value: "68", delta: "+5", direction: "up" },
      { label: "guarding_load", value: "47", delta: "-7", direction: "down" },
      { label: "breath_capacity", value: "7.3/10", delta: "+0.5", direction: "up" },
      { label: "recovery_consistency", value: "82%", delta: "+4", direction: "up" },
    ],
    findings: [
      {
        title: "Target muscles activated after cue sequence",
        detail: "Improvement only held when tempo stayed slow.",
        severity: "watch",
      },
      {
        title: "Compensation returned during loaded pulling",
        detail: "Load threshold reached too early; movement quality dipped.",
        severity: "moderate",
      },
    ],
    assignments: [
      {
        title: "Breath-led floor reset",
        dosage: "8 minutes each morning",
        confidence: "Form confidence: high",
      },
      {
        title: "Split-stance cable pull",
        dosage: "3 sets x 6 reps",
        confidence: "Form confidence: medium",
      },
    ],
    openQuestions: [
      "Can this week include one optional low-load day instead of a full rest day?",
      "What range should `guarding_load` stay within before progression?",
    ],
    followUps: [
      "Maintain daily metric logging.",
      "Review next plan after Wednesday check-in.",
    ],
    notes: [
      "Context references user-provided activity logs and check-in notes.",
    ],
    timeline: [
      { timestamp: "4:45 PM", event: "Session opened with comfort screen", owner: "PT" },
      { timestamp: "5:08 PM", event: "Posterior chain progression introduced", owner: "PT" },
      { timestamp: "5:29 PM", event: "Home protocol confirmed", owner: "Both" },
    ],
  },
  {
    id: "s5",
    label: "Session 5",
    date: "Mar 3, 2026",
    time: "5:00 PM",
    status: "upcoming",
    provider: "Lead PT",
    site: "Performance Recovery Studio",
    objective: "Validate rotational control tolerance and sequence next progression block.",
    metrics: [
      { label: "expected_readiness", value: "B+", delta: "flat", direction: "flat" },
      { label: "goal_checkpoints", value: "6", delta: "+1", direction: "up" },
      { label: "home_compliance_target", value: "85%", delta: "+3", direction: "up" },
      { label: "flags_to_watch", value: "2", delta: "-1", direction: "down" },
    ],
    findings: [
      {
        title: "Upcoming visit planning only",
        detail: "Findings populate after assessment and user notes are merged.",
        severity: "watch",
      },
    ],
    assignments: [
      {
        title: "Continue current assignment block",
        dosage: "Until next clinician review",
        confidence: "Form confidence: pending",
      },
    ],
    openQuestions: [
      "Which checkpoint should be primary for next-phase readiness?",
    ],
    followUps: [
      "Bring updated context notes and custom metric snapshots.",
    ],
    notes: [
      "Schedule and goals are placeholders for demo use.",
    ],
    timeline: [
      { timestamp: "Planned", event: "Readiness assessment", owner: "PT" },
      { timestamp: "Planned", event: "Assignment progression decision", owner: "Both" },
    ],
  },
];

const statusClass: Record<SessionStatus, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  upcoming: "bg-sky-100 text-sky-700",
  "in-review": "bg-amber-100 text-amber-700",
};

const severityClass: Record<Severity, string> = {
  high: "border-rose-300 bg-rose-50 text-rose-700",
  moderate: "border-amber-300 bg-amber-50 text-amber-700",
  watch: "border-teal-300 bg-teal-50 text-teal-700",
};

function DeltaPill({ direction, delta }: { direction: "up" | "down" | "flat"; delta: string }) {
  const palette = {
    up: "bg-emerald-100 text-emerald-700",
    down: "bg-sky-100 text-sky-700",
    flat: "bg-slate-200 text-slate-700",
  } as const;

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${palette[direction]}`}>{delta}</span>;
}

export default function Home() {
  const [activeId, setActiveId] = useState(sessions[0].id);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeId) ?? sessions[0],
    [activeId],
  );

  const headlineMetrics = useMemo(() => {
    return [
      { label: "active_cycle", value: "Week 6 of 12", detail: "Current protocol block" },
      { label: "session_completion", value: "3 / 4", detail: "Sessions attended this cycle" },
      { label: "assignment_adherence", value: "84%", detail: "Last 10-day completion" },
      { label: "custom_metrics", value: "11", detail: "User-defined metric fields" },
    ];
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dcfce7,_#f8fafc_40%,_#e2e8f0)] text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="inline-flex rounded-full border border-emerald-300 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          OpenDraft Recovery Experience
        </p>
        <div className="mt-4 grid gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">PT Sessions Dashboard Template</h1>
            <p className="mt-3 max-w-3xl text-base text-slate-700 md:text-lg">
              A marketing-friendly first impression with production-style product depth: dense timeline history, session cards, custom metrics, findings, and operational follow-through.
            </p>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Demo fixtures are intentionally seeded for presentation. In production workflows, session facts should come from canonical records (for example: <code>pt/sessions/YYYY-MM-DD.json</code>) to preserve SSOT integrity.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link href="/kits" className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700">
                View Placeholder Kits
              </Link>
              <span className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-600">
                User-provided context notes only
              </span>
            </div>
          </div>
          <div className="grid gap-3">
            {headlineMetrics.map((metric) => (
              <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
                <p className="text-sm text-slate-600">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-14 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">PT Sessions Timeline</h2>
          <p className="mb-4 text-sm text-slate-600">Select a session to inspect findings, assignments, and follow-up details.</p>
          <div className="space-y-3">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveId(session.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  activeId === session.id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white hover:border-slate-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{session.label}</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${activeId === session.id ? "bg-white/20 text-white" : statusClass[session.status]}`}>
                    {session.status}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${activeId === session.id ? "text-slate-200" : "text-slate-600"}`}>
                  {session.date} at {session.time}
                </p>
                <p className={`text-xs ${activeId === session.id ? "text-slate-300" : "text-slate-500"}`}>{session.site}</p>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{activeSession.label}</p>
                <h2 className="mt-1 text-3xl font-semibold">{activeSession.objective}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {activeSession.provider} • {activeSession.site} • {activeSession.date}, {activeSession.time}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[activeSession.status]}`}>{activeSession.status}</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {activeSession.metrics.map((metric) => (
                <article key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-xl font-semibold">{metric.value}</p>
                  <div className="mt-2">
                    <DeltaPill direction={metric.direction} delta={metric.delta} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Session Findings</h3>
              <div className="mt-4 space-y-3">
                {activeSession.findings.map((finding) => (
                  <div key={finding.title} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium">{finding.title}</p>
                      <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${severityClass[finding.severity]}`}>
                        {finding.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{finding.detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Assignments</h3>
              <div className="mt-4 space-y-3">
                {activeSession.assignments.map((assignment, index) => (
                  <div key={assignment.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-500">#{index + 1}</p>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-slate-600">{assignment.dosage}</p>
                    <p className="mt-1 text-xs text-slate-500">{assignment.confidence}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Open Questions</h3>
              <ol className="mt-4 space-y-3 text-sm text-slate-700">
                {activeSession.openQuestions.map((question, index) => (
                  <li key={question} className="rounded-2xl border border-slate-200 p-4">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    {question}
                  </li>
                ))}
              </ol>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Follow-Ups</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {activeSession.followUps.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Session Event Timeline</h3>
              <div className="mt-4 space-y-3">
                {activeSession.timeline.map((event) => (
                  <div key={`${event.timestamp}-${event.event}`} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                    <div className="min-w-20 rounded-lg bg-slate-900 px-2 py-1 text-center text-xs font-semibold text-white">{event.timestamp}</div>
                    <div>
                      <p className="font-medium">{event.event}</p>
                      <p className="text-xs text-slate-500">Owner: {event.owner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Context & Safety Notes</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {activeSession.notes.map((note) => (
                  <li key={note} className="rounded-2xl border border-slate-200 bg-emerald-50 p-4">
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
