# REPLICATION-NOTES

## Scope completed
Replicated the multi-page **session-notes-style** experience from `rib-recovery-dashboard` into `opendraft-pt-recovery` with anonymized/public-safe content, while preserving the existing transcript → canonical → dual-notes → dashboard sync pipeline.

## What was replicated

### Visual language + hierarchy
- Sticky top navigation with segmented page tabs
- Light slate background + white card surfaces
- Gradient hero card for active PT session
- Two-column card grids for concerns/assignments/questions/timeline
- Rich section stacking and nested content blocks
- Section labels/chips, status pills, and timeline row treatment

### Page structure and navigation depth
Replicated equivalent page set (not only a single dashboard):
- `/sessions` (main PT Sessions experience)
- `/providers` (all-providers style supporting page)
- `/analytics` (wellness/perma-v style supporting page)
- `/protocols` (protocols/red-flags/care-team depth page)
- Existing pages retained and integrated in nav:
  - `/launch`
  - `/learn-more`
- `/` now resolves to `/sessions`

### PT Sessions richness preserved
- Timeline/session selector in left rail
- Session-level concerns, assignments, questions, and event chronology
- Context-rich notes card sourced from pipeline output (`dashboard-sync.json`)
- Status/state semantics (completed, in-review, upcoming pattern)

## Anonymization applied
- Replaced personal/provider names with neutral placeholders (e.g., `Lead PT`, `Primary Provider`, `Support Coach`)
- Replaced direct contact details with placeholders (`[PUBLIC_CONTACT]`, `[CITY CLINIC ADDRESS]`)
- Removed personal medical history details and private narrative specifics
- Retained only generic, non-identifying, public-safe rehabilitation workflow language
- Preserved explicit non-diagnostic framing in UI and pipeline output usage

## Pipeline integration status
- Kept existing scripts unchanged and functional:
  - `pipeline:session`
  - `pipeline:notes`
  - `pipeline:dashboard`
- Re-ran full chain (`npm run pipeline:all`) and confirmed synced `src/data/dashboard-sync.json`
- Main sessions view consumes pipeline-generated reflective narrative for integrated SSOT continuity

## Intentional deviations
- Implemented in Next.js app-router style (project-native) rather than one-to-one React component port
- Used anonymized static public datasets (`*-public.json`) rather than copying source private JSON directly
- Supporting pages are productized equivalents, not pixel-identical clones

## Build/run verification
- `npm run build` ✅
- `npm run pipeline:all` ✅
- Local dev run for screenshot capture ✅

## Screenshots generated
- `/tmp/openclaw/uploads/opendraft-pt-live-1.png` (main sessions page)
- `/tmp/openclaw/uploads/opendraft-pt-live-2.png` (supporting providers page)
