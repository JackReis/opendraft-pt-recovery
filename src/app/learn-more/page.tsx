import Link from "next/link";

export default function LearnMorePage() {
  return (
    <main className="launch-wrap">
      <section className="launch-card">
        <div className="launch-content">
          <p className="eyebrow">Learn More • Pipeline + SSOT</p>
          <h1 style={{ margin: "0.4rem 0 0" }}>How transcript input becomes dashboard intelligence</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Clear flow, single source of truth: every dashboard view is downstream of the canonical session record.
          </p>

          <div className="stack" style={{ marginTop: 16 }}>
            <div className="info-card">
              <p className="label">Step 1</p>
              <h3>Transcript to Canonical Session JSON</h3>
              <p className="muted">Sanitized transcript text is parsed into a structured session object (metadata, findings, assignments, follow-ups, metrics).</p>
            </div>
            <div className="info-card">
              <p className="label">Step 2</p>
              <h3>Canonical Session to Dual Notes</h3>
              <p className="muted">Generate two non-diagnostic note families: operational (actions) and reflective (context + nuance).</p>
            </div>
            <div className="info-card">
              <p className="label">Step 3</p>
              <h3>Session + Dual Notes to Dashboard Sync JSON</h3>
              <p className="muted">A sync payload maps enhanced sections into UI-ready structures for dashboard rendering.</p>
            </div>
            <div className="info-card success">
              <p><strong>SSOT model:</strong> Canonical session JSON is authoritative. Notes and dashboard data are projections. If mismatched, regenerate from canonical source.</p>
            </div>
          </div>

          <div className="launch-cta">
            <Link className="btn-dark" href="/">Open Dashboard</Link>
            <Link className="btn-light" href="/launch">Launch Page</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
