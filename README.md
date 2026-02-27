# OpenDraft PT Sessions Demo

OpenDraft template demonstrating a PT session dashboard UX: timeline, findings, assignments, follow-ups, and kit placeholders.

## Listing Readiness (truthful current state)

- **GitHub URL:** `https://github.com/JackReis/opendraft-pt-recovery`
- **Live demo URL:** `https://opendraft-pt-recovery.vercel.app`
- **Screenshots available:**
  - `public/pt-dashboard-shot.png` (1600x900)
  - `public/life-dashboard-teaser-blur.png` (1600x900)
- **ZIP package:** not committed in-repo. Create from repo root when needed:
  - `zip -r opendraft-pt-recovery.zip . -x "node_modules/*" ".next/*" ".git/*"`

## Trust / Safety Positioning

- This project is a **UI/demo template**, not a medical device and not a diagnostic tool.
- Any PT context shown is **demo or user-provided context notes**.
- `custom metrics` means user-defined tracking labels/fields (not clinically validated scoring).
- Wording avoids compliance/security guarantees (for example, no HIPAA/safe-storage certification claims).

## SSOT Alignment

To match vault-first SSOT principles from PT docs:

- Keep canonical session facts in records such as `pt/sessions/YYYY-MM-DD.json`.
- Treat this app as a **view layer** over canonical data, not the system of record.
- Avoid maintaining conflicting copies of session truth inside UI components.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build Validation

```bash
npm run build
```
