# PLAN: Dual Notes + Dashboard Sync

## Objective
Implement a reliable, public-safe pipeline that transforms transcript-derived session input into:
1) canonical session JSON (SSOT record)
2) dual notes outputs
   - operational notes (action-oriented)
   - reflective notes (context + nuance, non-diagnostic)
3) dashboard-ready JSON sections consumed by the product UI.

## Scope
- In scope:
  - Scripted pipeline under `scripts/`
  - Testable transformation logic
  - Dashboard sync output consumed by app
  - Learn More explainer page/section for flow clarity
  - README updates with end-to-end commands
- Out of scope:
  - Clinical inference/diagnosis
  - Storage/back-end infra beyond local JSON outputs
  - Advanced NLP/LLM dependencies

## Constraints
- Keep all examples sanitized/public-safe.
- Non-diagnostic language only.
- Deterministic CLI behavior.
- Preserve current app behavior while adding enhanced-data support.
- Keep implementation lightweight (Node stdlib + existing stack).

## Acceptance Criteria
1. Plan file exists with scope/constraints/acceptance/tasks/tests.
2. Scripts generate:
   - canonical session JSON from transcript
   - dual notes JSON from canonical/transcript
   - dashboard sync JSON combining session + notes
3. Dashboard UI displays enhanced notes sections from synced JSON.
4. Learn More page clearly explains:
   - transcript -> canonical session -> dual notes -> dashboard
   - SSOT model and review loop
5. Tests/checks run successfully.
6. README documents full command chain.
7. Changes committed and pushed to `origin/main`.

## Phased Tasks

### Phase 0 — Baseline + TDD-ish setup
- Add a small pure-function pipeline module for parsing/transforming.
- Add Node test suite (`node --test`) before/alongside CLI wiring.

### Phase 1 — Canonical session extraction
- Upgrade transcript processor to produce stable canonical fields:
  - session metadata
  - findings
  - assignments
  - follow-ups
  - custom metrics
  - safety/privacy metadata

### Phase 2 — Dual-notes generation
- Add script to emit:
  - operational notes: priorities, action checklist, blockers, next-session prep
  - reflective notes: narrative summary, observed patterns, context sensitivities
- Ensure neutral/non-diagnostic wording.

### Phase 3 — Dashboard sync
- Add script to merge canonical + dual notes into dashboard payload consumed by app.
- Include timestamp and traceability fields (`generated_from`).

### Phase 4 — Product/UI explainability
- Add Learn More route with Soleio-style concise visual flow blocks.
- Add links from app surfaces to Learn More.

### Phase 5 — Docs + verification
- Update README with end-to-end commands.
- Run lint, tests, and build.
- Commit + push.

## Test Strategy
- Unit-like tests on pure functions (Node built-in `node:test` + `assert`):
  - transcript parsing extracts expected fields
  - dual-notes generator returns both note families with required sections
  - dashboard sync injects enhanced note sections
- CLI smoke checks:
  - run each script against sanitized example
  - validate output files are created and parseable JSON
- Build checks:
  - `npm run lint`
  - `npm test`
  - `npm run build`

## Risks / Follow-up
- Regex parsing is deterministic but shallow; richer transcripts may need a stronger parser layer.
- Current UI sync reads local generated JSON; production-grade ingestion should be API-backed later.
