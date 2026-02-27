# PT Recovery Command Center

Product-first PT Sessions interface built with Next.js (React) for structured recovery tracking.

## What this project does

It turns session inputs into an operational PT workflow UI:
- session timeline and status progression
- in-session metrics and findings
- assignments and follow-ups
- open questions and event chronology
- adaptability modes in the same interface (single product surface)

## Transcript → Notes process (important)

This project is designed around a structured input flow:

1. Capture session transcript/notes (and optional exercise photo evidence)
2. Normalize into date-based session records (canonical source-of-truth pattern)
3. Render operational views (timeline, findings, assignments, follow-ups, custom metrics)
4. Keep human review in the loop for low-confidence/inferred items

The UI demonstrates the workflow layer. Canonical records should live in structured session data (e.g., per-date JSON records).

## Safety + scope

- This is a workflow/organization tool, not medical diagnosis.
- Context and metrics are user-provided and customizable.
- Always validate clinical decisions with qualified professionals.

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Routes

- `/` → primary PT Sessions product experience
- `/launch` → lightweight teaser/marketing page

## Live links

- Demo: https://opendraft-pt-recovery.vercel.app
- Repo: https://github.com/JackReis/opendraft-pt-recovery

## License

MIT
