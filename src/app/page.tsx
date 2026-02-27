import Image from "next/image";

const features = [
  "Transcript + photo ingestion into structured PT session records",
  "Source-of-truth JSON + markdown exports for durable history",
  "Trend dashboard for pain, pec engagement, compliance, and open questions",
  "Safe-save verification flow to reduce data-entry anxiety",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-4 inline-block rounded-full border border-emerald-400/40 px-4 py-1 text-sm text-emerald-300">
          OpenDraft Flagship • PT Recovery Intelligence
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          PT Recovery Command Center
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Turn therapy transcripts and exercise-sheet photos into a beautiful,
          reliable recovery dashboard with source-of-truth records and actionable
          next steps.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              {f}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <h2 className="mb-4 text-2xl font-semibold">Live PT Dashboard Preview</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-700 shadow-2xl shadow-emerald-900/20">
          <Image
            src="/pt-dashboard-shot.svg"
            alt="PT dashboard preview"
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
            alt="Blurred teaser of life dashboard"
            width={1600}
            height={900}
            className="h-auto w-full"
          />
        </div>
      </section>
    </main>
  );
}
