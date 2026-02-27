"use client";

import { useMemo, useState } from "react";

type SessionStatus = "completed" | "upcoming" | "in-review";
type Severity = "high" | "moderate" | "watch";
type TemplateMode = "baseline" | "travel-week" | "high-compliance";

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
    notes: ["Context references user-provided activity logs and check-in notes."],
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
    openQuestions: ["Which checkpoint should be primary for next-phase readiness?"],
    followUps: ["Bring updated context notes and custom metric snapshots."],
    notes: ["Schedule and goals are placeholders for demo use."],
    timeline: [
      { timestamp: "Planned", event: "Readiness assessment", owner: "PT" },
      { timestamp: "Planned", event: "Assignment progression decision", owner: "Both" },
    ],
  },
];

const statusClass: Record<SessionStatus, string> = {
  completed: "status-pill status-completed",
  upcoming: "status-pill status-upcoming",
  "in-review": "status-pill status-review",
};

const severityClass: Record<Severity, string> = {
  high: "severity-pill severity-high",
  moderate: "severity-pill severity-moderate",
  watch: "severity-pill severity-watch",
};

const templateModes: Record<TemplateMode, { title: string; summary: string; shifts: string[] }> = {
  baseline: {
    title: "Baseline Mode",
    summary: "Default PT session workflow focused on consistency and clean progression signals.",
    shifts: [
      "Standard assignment dosage",
      "Balanced metrics mix (pain, capacity, guarding)",
      "Weekly follow-up cadence",
    ],
  },
  "travel-week": {
    title: "Travel Week Adaptation",
    summary: "Same product surface, adapted dosage + checkpoints for travel and constrained environments.",
    shifts: [
      "Reduced-volume assignment variants",
      "Higher emphasis on morning settle + stiffness indicators",
      "Short-form check-ins to preserve continuity",
    ],
  },
  "high-compliance": {
    title: "High Compliance Sprint",
    summary: "Intensified cycle for users hitting high adherence and ready for finer progression decisions.",
    shifts: [
      "Increased progression checkpoints",
      "Expanded custom metrics for load and fatigue",
      "Twice-weekly clinician follow-up windows",
    ],
  },
};

function DeltaPill({ direction, delta }: { direction: "up" | "down" | "flat"; delta: string }) {
  const palette = {
    up: "delta-pill delta-up",
    down: "delta-pill delta-down",
    flat: "delta-pill delta-flat",
  } as const;

  return <span className={palette[direction]}>{delta}</span>;
}

export default function Home() {
  const [activeId, setActiveId] = useState(sessions[0].id);
  const [mode, setMode] = useState<TemplateMode>("baseline");

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeId) ?? sessions[0],
    [activeId],
  );

  const headlineMetrics = [
    { label: "current_cycle", value: "Week 6 of 12", detail: "Protocol progression block" },
    { label: "session_completion", value: "3 / 4", detail: "Sessions attended this cycle" },
    { label: "assignment_adherence", value: "84%", detail: "Last 10-day completion" },
    { label: "custom_metrics", value: "11", detail: "User-defined metric fields" },
  ];

  const selectedMode = templateModes[mode];

  return (
    <main className="app-shell">
      <header className="top-strip">
        <div className="container top-strip-inner">
          <h1>Healthcare Management System</h1>
          <div className="entity-switcher">
            <span className="chip-active">PT Session</span>
            <span className="chip">All Providers</span>
            <span className="chip">Wellness Analytics</span>
          </div>
        </div>
      </header>

      <div className="container body-grid">
        <aside className="left-rail panel">
          <div className="rail-head">
            <p className="eyebrow">OpenDraft</p>
            <h2>PT Sessions</h2>
            <p>Product-first session intelligence + workflow continuity.</p>
          </div>

          <nav className="rail-nav">
            <button className="rail-nav-active">Dashboard</button>
            <button>Sessions</button>
            <button>Metrics</button>
            <button>Follow-Ups</button>
            <button>Context Notes</button>
          </nav>

          <div className="panel status-card">
            <p className="label">Current Cycle</p>
            <p className="value">Month 2 / 3</p>
            <p className="muted">Phase: Active Mobility + Stability</p>
          </div>
        </aside>

        <section className="main-col">
          <div className="panel hero-panel">
            <div>
              <p className="eyebrow">PT Session Experience</p>
              <h2>Single product surface with built-in adaptability modes</h2>
              <p className="muted mt-2">
                No separate kit pages. Adaptation lives inside the same operational session dashboard to keep UI flow, data model,
                and user mental model consistent.
              </p>
            </div>
          </div>

          <div className="metric-grid">
            {headlineMetrics.map((metric) => (
              <article key={metric.label} className="panel metric-card">
                <p className="label">{metric.label}</p>
                <p className="value-lg">{metric.value}</p>
                <p className="muted">{metric.detail}</p>
              </article>
            ))}
          </div>

          <div className="panel mode-panel">
            <div className="mode-header">
              <h3>Template / Adaptability Mode</h3>
              <p className="muted">Same interface, adjustable behavior profile.</p>
            </div>
            <div className="mode-chips">
              {(Object.keys(templateModes) as TemplateMode[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={mode === key ? "chip-active" : "chip"}
                >
                  {templateModes[key].title}
                </button>
              ))}
            </div>
            <div className="mode-detail">
              <p className="value">{selectedMode.title}</p>
              <p className="muted">{selectedMode.summary}</p>
              <ul>
                {selectedMode.shifts.map((shift) => (
                  <li key={shift}>{shift}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="content-grid">
            <aside className="panel timeline-list">
              <h3>PT Timeline</h3>
              <p className="muted">Select session to inspect metrics, findings, and follow-through.</p>
              <div className="stack">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setActiveId(session.id)}
                    className={activeId === session.id ? "timeline-item active" : "timeline-item"}
                  >
                    <div className="row-between">
                      <span>{session.label}</span>
                      <span className={activeId === session.id ? "status-pill status-selected" : statusClass[session.status]}>
                        {session.status}
                      </span>
                    </div>
                    <p>{session.date} • {session.time}</p>
                    <p className="muted-sm">{session.site}</p>
                  </button>
                ))}
              </div>
            </aside>

            <div className="stack">
              <article className="panel">
                <div className="row-between wrap">
                  <div>
                    <p className="eyebrow">{activeSession.label}</p>
                    <h3>{activeSession.objective}</h3>
                    <p className="muted">
                      {activeSession.provider} • {activeSession.site} • {activeSession.date}, {activeSession.time}
                    </p>
                  </div>
                  <span className={statusClass[activeSession.status]}>{activeSession.status}</span>
                </div>

                <div className="mini-metric-grid">
                  {activeSession.metrics.map((metric) => (
                    <article key={metric.label} className="mini-metric">
                      <p className="label">{metric.label}</p>
                      <p className="value">{metric.value}</p>
                      <DeltaPill direction={metric.direction} delta={metric.delta} />
                    </article>
                  ))}
                </div>
              </article>

              <section className="split-grid">
                <article className="panel">
                  <h3>Findings</h3>
                  <div className="stack mt-2">
                    {activeSession.findings.map((finding) => (
                      <div key={finding.title} className="info-card">
                        <div className="row-between">
                          <p>{finding.title}</p>
                          <span className={severityClass[finding.severity]}>{finding.severity}</span>
                        </div>
                        <p className="muted">{finding.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="panel">
                  <h3>Assignments</h3>
                  <div className="stack mt-2">
                    {activeSession.assignments.map((assignment, index) => (
                      <div key={assignment.title} className="info-card">
                        <p className="label">#{index + 1}</p>
                        <p>{assignment.title}</p>
                        <p className="muted">{assignment.dosage}</p>
                        <p className="muted-sm">{assignment.confidence}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </section>

              <section className="split-grid">
                <article className="panel">
                  <h3>Open Questions</h3>
                  <ol className="stack mt-2">
                    {activeSession.openQuestions.map((question, index) => (
                      <li key={question} className="info-card">
                        <strong>{index + 1}.</strong> {question}
                      </li>
                    ))}
                  </ol>
                </article>

                <article className="panel">
                  <h3>Follow-Ups</h3>
                  <ul className="stack mt-2">
                    {activeSession.followUps.map((item) => (
                      <li key={item} className="info-card">{item}</li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className="split-grid-wide">
                <article className="panel">
                  <h3>Session Event Timeline</h3>
                  <div className="stack mt-2">
                    {activeSession.timeline.map((event) => (
                      <div key={`${event.timestamp}-${event.event}`} className="timeline-event">
                        <span>{event.timestamp}</span>
                        <div>
                          <p>{event.event}</p>
                          <p className="muted-sm">Owner: {event.owner}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="panel safety-notes">
                  <h3>SSOT + Safety Messaging</h3>
                  <ul className="stack mt-2">
                    {activeSession.notes.map((note) => (
                      <li key={note} className="info-card success">{note}</li>
                    ))}
                    <li className="info-card success">
                      SSOT: care decisions are informed by user-provided context + custom metrics in this app. Not medical advice.
                    </li>
                  </ul>
                </article>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
