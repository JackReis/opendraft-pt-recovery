import Link from "next/link";

export default async function KitDetailPage({
  params,
}: {
  params: Promise<{ kitId: string }>;
}) {
  const { kitId } = await params;

  const sampleSections = [
    "Session timeline with status and owner",
    "Custom metric tiles mapped to user vocabulary",
    "Findings, assignments, open questions, follow-ups",
    "Export-safe notes for clinician review",
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Kit Placeholder</p>
        <h1 className="mt-2 text-3xl font-semibold">{kitId.replaceAll("-", " ")} configuration</h1>
        <p className="mt-3 text-slate-700">
          This is a dummy adaptation page showing how the same PT Sessions architecture can be skinned and preconfigured for a new user profile.
        </p>

        <div className="mt-6 grid gap-3">
          {sampleSections.map((section) => (
            <div key={section} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              {section}
            </div>
          ))}
        </div>

        <div className="mt-7 flex gap-4 text-sm">
          <Link href="/kits" className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white">
            Back to kits
          </Link>
          <Link href="/" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
