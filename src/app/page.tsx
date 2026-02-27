import Image from "next/image";

const features = [
  "Bring your own context: transcript, notes, and optional photo evidence",
  "Source-of-truth JSON + markdown exports for reliable history",
  "Custom metrics (example: pec_engagement) tracked as user-defined fields",
  "Safe-save verification flow to reduce data-entry uncertainty",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-4 inline-block rounded-full border border-emerald-400/40 px-4 py-1 text-sm text-emerald-300">
          OpenDraft Flagship • Recovery Intelligence Template
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          PT Recovery Command Center
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Convert recurring recovery notes into a clear dashboard and action plan.
          Built as a reusable template system: you provide context and metrics,
          the pipeline produces structured records and readable progress views.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              {f}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          <strong>Note:</strong> This is an organization/tracking system, not medical advice.
          Clinical context is user-provided and should be reviewed by a qualified professional.
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <h2 className="mb-4 text-2xl font-semibold">PT Dashboard Preview</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-700 shadow-2xl shadow-emerald-900/20">
          <Image
            src="/pt-dashboard-shot.svg"
            alt="PT dashboard preview with custom metrics and timeline"
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-4 text-2xl font-semibold">Life Dashboard Teaser</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-700 shadow-xl">
          <Image
            src="/life-dashboard-teaser-blur.svg"
            alt="Blurred teaser of upcoming life dashboard"
            width={1600}
            height={900}
            className="h-auto w-full"
          />
        </div>
      </section>
    </main>
  );
}
