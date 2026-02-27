# Changelog — 2026-02-27

## PT Sessions parity pass (writing-plans guided)

### Objectives
- Replace placeholder-kit direction with a single, product-first PT Sessions experience.
- Match the structural/visual language of Jack’s existing dashboards (left rail, top system strip, dense card layout, timeline-heavy flow).
- Keep adaptability/template behavior inside the same product surface.
- Preserve SSOT messaging: user-provided context, custom metrics, non-medical-advice framing.
- Keep app build green and release-ready.

### Constraints
- No `/kits` routes/pages or kit-oriented navigation.
- Main route must remain real-user usable first.
- Marketing/teaser page must be secondary and must not dilute primary product UX.
- Keep implementation lightweight and reversible.

### UX parity acceptance criteria
- Top strip + left rail + card-based, high-density dashboard presentation.
- Session timeline controls active detail panel with status pills and progression signals.
- Rich sections present: metrics, findings, assignments, open questions, follow-ups, event timeline, safety/SSOT notes.
- Adaptability modes are selectable in-page and modify behavior framing without route branching.
- No user-facing references to “kits” as product deliverables.

### What changed
- Rebuilt `src/app/page.tsx` to a product-first PT Sessions dashboard architecture.
- Deleted kits concept (`src/app/kits/*` removed).
- Added secondary marketing/teaser route at `src/app/launch/page.tsx`.
- Reworked global styling (`src/app/globals.css`) for parity-oriented UI language.
- Updated app metadata (`src/app/layout.tsx`) and README copy to remove kit framing.

### Release checklist
- [x] Build passes (`npm run build`)
- [x] Git commit created
- [x] Pushed to `origin/main`
- [x] Vercel production deploy attempted
- [x] Updated listing screenshots generated

### How writing-plans framework influenced this release
- Explicit objective/constraint framing prevented scope drift when preferences changed mid-pass.
- Acceptance criteria drove concrete parity checks before finalizing UI.
- Release checklist shaped execution order (implement → verify → ship artifacts) and made final delivery auditable.
