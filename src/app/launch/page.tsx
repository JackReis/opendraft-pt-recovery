import Link from "next/link";

const githubUrl = "https://github.com/JackReis/opendraft-pt-recovery";
const openDraftListingUrl = "https://opendraft.example/listings/opendraft-pt-recovery";

export default function LaunchPage() {
  return (
    <main className="launch-wrap">
      <section className="launch-card">
        <div className="launch-content">
          <p className="eyebrow">OpenDraft • PT Sessions</p>
          <h1 style={{ margin: "0.4rem 0 0", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Product-grade PT recovery dashboard, ready for daily use
          </h1>
          <p className="muted" style={{ fontSize: "1.05rem", maxWidth: 760 }}>
            A single operational interface for session tracking, custom metrics, findings, assignments, and follow-through.
            Adaptability modes live in the same UI so the product stays coherent as context changes.
          </p>

          <div className="launch-cta">
            <Link className="btn-dark" href="/">
              Open Live PT Sessions App
            </Link>
            <Link className="btn-light" href="/learn-more">
              Learn More (Pipeline)
            </Link>
            <a className="btn-light" href={githubUrl} target="_blank" rel="noreferrer">
              View GitHub
            </a>
            <a className="btn-light" href={openDraftListingUrl} target="_blank" rel="noreferrer">
              OpenDraft Listing
            </a>
          </div>

          <div className="launch-preview">
            <div className="preview-frame">
              <p className="label">UI Preview</p>
              <h3>PT Timeline + Session Intelligence</h3>
              <p className="muted">
                Includes session timeline, in-session metrics, findings severity, assignment blocks, open questions, follow-up
                actions, event chronology, and SSOT safety messaging.
              </p>
              <div className="mode-chips">
                <span className="chip-active">Baseline Mode</span>
                <span className="chip">Travel Week Adaptation</span>
                <span className="chip">High Compliance Sprint</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
