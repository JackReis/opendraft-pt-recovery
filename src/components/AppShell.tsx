"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/sessions", label: "PT Sessions" },
  { href: "/providers", label: "All Providers" },
  { href: "/analytics", label: "Wellness Analytics" },
  { href: "/protocols", label: "Protocols" },
  { href: "/learn-more", label: "Pipeline" },
];

export function AppShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-[min(1240px,calc(100%-1.25rem))] items-center justify-between gap-3 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">OpenDraft Recovery</p>
            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <Link href="/launch" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Listing
          </Link>
        </div>
        <div className="mx-auto flex w-[min(1240px,calc(100%-1.25rem))] gap-2 overflow-auto pb-3">
          {tabs.map((tab) => {
            const active = pathname === tab.href || (tab.href === "/sessions" && pathname === "/");
            return (
              <Link key={tab.href} href={tab.href} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${active ? "bg-slate-900 text-white" : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"}`}>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </header>
      <div className="mx-auto w-[min(1240px,calc(100%-1.25rem))] py-6">{children}</div>
    </main>
  );
}
