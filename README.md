# PT Recovery Command Center

Product-first PT Sessions interface built with Next.js (React) for structured recovery tracking.

## What this project does

It turns session inputs into an operational PT workflow UI:
- session timeline and status progression
- in-session metrics and findings
- assignments and follow-ups
- open questions and event chronology
- adaptability modes in the same interface (single product surface)
- enhanced dual-notes sections synced from transcript pipeline

## Transcript -> Canonical Session -> Dual Notes -> Dashboard

This project uses a single-source-of-truth (SSOT) model:

1. Transcript input is parsed into canonical session JSON
2. Canonical session drives dual notes outputs:
   - operational notes (action-oriented)
   - reflective notes (context + nuance, non-diagnostic)
3. Session + notes are synced into dashboard JSON sections
4. UI renders dashboard projections from that synced structure

Learn More explainer: `/learn-more`

## Safety + scope

- This is a workflow/organization tool, not medical diagnosis.
- Context and metrics are user-provided and customizable.
- Always validate care decisions with qualified professionals.
- Public examples are sanitized and placeholder-safe.

## Buyer-facing input/output clarity

**What users provide**
- Session transcript text (sanitized)
- Optional context notes (schedule, travel, work constraints, sleep/fatigue context)
- Custom metric labels they define (for example: `morning_settle_minutes`)

**What users get**
- Canonical session JSON (structured source-of-truth record)
- Dual notes generated from that canonical record:
  - operational notes (actions, checklists, follow-ups)
  - reflective notes (context + nuance, explicitly non-diagnostic)
- Synced dashboard projections (timeline, findings, assignments, open questions, follow-through)

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

## End-to-end pipeline commands

```bash
# 1) Transcript -> canonical session JSON
npm run pipeline:session

# 2) Canonical session -> dual notes JSON
npm run pipeline:notes

# 3) Session + notes -> dashboard sync JSON
npm run pipeline:dashboard

# or run all three
npm run pipeline:all
```

Generated artifacts:
- `examples/output/generated-session.json`
- `examples/output/dual-notes.json`
- `src/data/dashboard-sync.json`

## Quality checks

```bash
npm test
npm run lint
npm run build
# combined basic checks
npm run check
```

## Routes

- `/` -> primary PT Sessions dashboard
- `/launch` -> lightweight teaser/marketing page
- `/learn-more` -> explainer for SSOT and transformation flow

## Live links

- Demo: https://opendraft-pt-recovery.vercel.app
- Repo: https://github.com/JackReis/opendraft-pt-recovery

## License

MIT
