import Link from "next/link";

const kits = [
  {
    id: "starter-athlete",
    name: "Starter Athlete Kit",
    audience: "Single-user recovery tracking",
    includes: ["PT timeline", "custom metrics", "assignment tracker"],
  },
  {
    id: "care-team-lite",
    name: "Care Team Lite Kit",
    audience: "User + clinician collaboration",
    includes: ["shared follow-ups", "session summaries", "note export"],
  },
  {
    id: "ops-coach",
    name: "Ops Coach Kit",
    audience: "Performance staff + user",
    includes: ["multi-role tasks", "weekly risk scan", "protocol templates"],
  },
];

export default function KitsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Placeholder Kit Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold">Template Kits for New Users</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          These placeholders show how the PT Sessions dashboard adapts across audiences while preserving core timeline, metrics, and follow-up workflows.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {kits.map((kit) => (
            <article key={kit.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{kit.audience}</p>
              <h2 className="mt-2 text-xl font-semibold">{kit.name}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {kit.includes.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-100 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/kits/${kit.id}`}
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Open Placeholder
              </Link>
            </article>
          ))}
        </div>

        <Link href="/" className="mt-8 inline-flex text-sm font-medium text-slate-700 underline underline-offset-4">
          Return to PT Sessions
        </Link>
      </div>
    </main>
  );
}
