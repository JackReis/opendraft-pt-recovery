# opendraft-pt-recovery — Replication Blueprint

## Scope
Explore-only parity map from:
- `/Users/jack.reis/Documents/rib-recovery-dashboard`
- `/Users/jack.reis/Documents/=notes`

Goal: replicate UX structure, style motifs, modules, and data hooks (with anonymization) into `opendraft-pt-recovery`.

---

## 1) User-facing routes/pages to replicate

## A. React app shell (`/`)
Single-page app with top nav switches between 4 major views:
1. **Rib Recovery** (`activeView: recovery`) → `src/RecoveryDashboard.js`
2. **All Providers** (`activeView: healthcare`) → `src/HealthcareDashboard.js`
3. **Wellness Analytics** (`activeView: analytics`) → `src/WellnessAnalytics.js`
4. **PT Session** (`activeView: pt-session`) → `src/PTSessionPlan.js`

## B. Static life dashboard route (`/life-dashboard/`)
- File: `public/life-dashboard/index.html`
- Canonical source copy in notes: `=notes/claude/dashboards/life-dashboard-feb-2026.html`
- Distinct visual system (dark neon dashboard look).

## C. Data endpoints (not pages, but required for parity)
- `public/api/*.json` (core: `wellness.json`, `appointments.json`, `recovery-progress.json`, `supplement-tracking.json`, `meal-adherence.json`, `perma-v-history.json`, `cpap-sleep.json`, `tracker-status.json`, `unified.json`, `index.json`)

---

## 2) Per-page parity map (style + modules + data dependencies)

## 2.1 Rib Recovery (main React view)
**File:** `src/RecoveryDashboard.js`

**Visual style tokens / motifs**
- Tailwind slate base: `bg-slate-50`, white cards, soft borders (`border-slate-200`), rounded-xl.
- Accent gradients: blue/indigo for high-priority banners (`from-blue-600 to-indigo-700`).
- Functional color coding:
  - Orange: morning protocol
  - Emerald: supplements/adherence success
  - Blue: hydration/status
  - Indigo: rehab exercises
  - Red/amber: risk and red flags
- Layout: fixed left desktop sidebar + mobile menu overlay; card grid; actionable tiles.

**Key sections/cards/modules**
- Internal tabs: `dashboard`, `morning`, `plan`, `clinical`, `index`
- Dashboard tab:
  - Current phase card
  - Daily adherence multi-progress card
  - Remodeling-phase context card
  - PT session timeline CTA banner
  - Daily tracker widget (pain slider, instability counter, save)
  - Quick access guide cards
- Morning tab: checklist cards with rationale chips
- Plan tab: exercise cards + rehab principles
- Clinical tab: embedded `ClinicalProtocols`
- Index tab: expandable knowledge glossary by category

**Data dependencies/files**
- `src/data/pt-sessions.json` (latest/next session banners)
- `/api/tracker-status.json` (supplements, hydration, rehab done)
- Local component constants for protocol/index text
- `src/components/ClinicalProtocols.js`

---

## 2.2 All Providers (Healthcare Dashboard)
**File:** `src/HealthcareDashboard.js`

**Visual style tokens / motifs**
- Same slate/white shell as main app; sticky white header.
- Blue primary actions (`bg-blue-600` active states).
- Information density via cards + grouped sections.

**Key sections/cards/modules**
- Header + `ViewSwitcher`
- Three subviews:
  1. **OverviewView** (all providers + status summary counters)
  2. **SystemView** (providers grouped by body system)
  3. **FrequencyView** (providers grouped by cadence/urgency)
- `ProviderCard` module with expandable notes, contact links, appointment row, insurance footer.

**Data dependencies/files**
- `src/data/providers.json` (providers, systems, frequencies)
- Components:
  - `src/components/ViewSwitcher.js`
  - `src/components/OverviewView.js`
  - `src/components/SystemView.js`
  - `src/components/FrequencyView.js`
  - `src/components/ProviderCard.js`

---

## 2.3 Wellness Analytics
**File:** `src/WellnessAnalytics.js`

**Visual style tokens / motifs**
- KPI-first dashboard look: gradient score hero, metric category cards, alert banners.
- Tabbed analytics surface (`trends`, `permaV`, `schedule`).
- Chart-centric white panels with subtle borders.

**Key sections/cards/modules**
- Score hero card + trend icon
- Category cards (nutrition/recovery/medical/supplements)
- Highlights + concerns banners
- Trends tab: 4 chart panels
- PERMA-V tab:
  - Current assessment panel
  - therapy context panel
  - assessment history list
  - interactive check-in module + chart
- Schedule tab: appointments + today status + recovery timeline

**Data dependencies/files**
- API fetches:
  - `/api/wellness.json`
  - `/api/supplement-tracking.json`
  - `/api/meal-adherence.json`
  - `/api/recovery-progress.json`
  - `/api/appointments.json`
  - `/api/perma-v-history.json`
- Charts: `src/components/WellnessCharts.js`
- PERMA-V check-in: `src/components/PermaVCheckin.js`
- Question model: `src/data/perma-v-questions.json`
- localStorage keys: `wellnessReportHistory`, `permaVHistory`

---

## 2.4 PT Session
**File:** `src/PTSessionPlan.js`

**Visual style tokens / motifs**
- Strong session narrative format: collapsible themed sections.
- Blue/indigo gradient hero header, status pills.
- Severity and urgency color chips (critical/high/moderate).

**Key sections/cards/modules**
- Session selector timeline (`Current Plan` + session pills)
- Header with provider/date/time/location
- Expandable sections:
  - Quick context
  - Since last session
  - Session findings + prescribed exercises
  - Primary concerns
  - Current protocol
  - Phase exercises
  - Questions
  - Red flags + decompression reset
  - Session notes (persistent)
  - Care team

**Data dependencies/files**
- `src/data/pt-sessions.json`
- localStorage key: `pt-session-notes`

---

## 2.5 Static Life Dashboard (`/life-dashboard/`)
**Files:**
- Deployed: `rib-recovery-dashboard/public/life-dashboard/index.html`
- Source-of-truth backup in notes: `=notes/claude/dashboards/life-dashboard-feb-2026.html`

**Visual style tokens / motifs**
- Dark theme with custom palette object (`C`) and neon accents.
- Dense executive dashboard with tab strip:
  - `Overview`, `This Week`, `Energy`, `Systems`, `Recovery`, `Sleep`, `Wellbeing`
- Highly custom inline-styled React-in-HTML architecture.

**Key sections/cards/modules**
- Tabbed static dashboard layout
- PERMA-V radar + history + therapy themes/homework
- Sleep tab/card integration
- Status badges and progress bars

**Data dependencies/files**
- `fetch('/api/cpap-sleep.json')` in sleep components
- Embedded PERMA-V object plus API-backed sleep metrics
- Sync relationship with notes copy (`life-dashboard-feb-2026.html`)

---

## 3) Deploy-critical `=notes` source files feeding rib-recovery-dashboard

Highest-impact files to preserve in replication pipeline:

1. **Life dashboard source copy**
   - `=notes/claude/dashboards/life-dashboard-feb-2026.html`
   - Feeds parity for `/public/life-dashboard/index.html`.

2. **API generator (primary automation)**
   - `=notes/scripts/generate_wellness_api_json.py`
   - Generates static JSON endpoints in `=notes/public/api/`.

3. **Regeneration wrapper**
   - `=notes/scripts/regenerate_wellness_json.sh`
   - One-command refresh for wellness API snapshot files.

4. **Tracker-to-dashboard bridge**
   - `=notes/claude/scripts/rib-recovery-tracker.py`
   - Writes runtime status to:
     - `=notes/claude/.rib-recovery-status.json`
     - `rib-recovery-dashboard/public/api/tracker-status.json`

5. **API payload directory (copy/sync source)**
   - `=notes/public/api/*.json`
   - Core payloads mirrored/deployed to dashboard API.

6. **PT structured source + dashboard export script**
   - `=notes/pt/sessions/*.json`
   - `=notes/claude/scripts/pt-dashboard-generate.sh`
   - Generates `=notes/pt/exports/PT-DASHBOARD-DATA.md` and informs PT session data flow.

---

## 4) Page parity checklist (build target)

- [ ] `/` shell with 4 top-level views and responsive mobile nav behavior
- [ ] Rib Recovery page with 5 internal tabs and full card set
- [ ] Healthcare Dashboard with all 3 grouping modes and provider card behaviors
- [ ] Wellness Analytics with 3 tabs, 4 trend charts, report export, alerts, PERMA-V modules
- [ ] PT Session page with section accordion architecture and note persistence
- [ ] `/life-dashboard/` static dark-themed tabbed dashboard parity
- [ ] API contracts in place for all consumed endpoints
- [ ] localStorage feature parity (`wellnessReportHistory`, `permaVHistory`, `pt-session-notes`)

---

## 5) Anonymization checklist (for opendraft portability)

- [ ] Replace personal names (patient, family, therapists, providers) with role labels or pseudonyms
- [ ] Replace direct phone/email/address fields with placeholders
- [ ] Remove explicit surgery dates/PHI-level timeline granularity unless clinically required
- [ ] Remove references to specific counselor notes, personal homework phrasing, spiritual private notes
- [ ] Replace location identifiers (city/street/clinic names) with abstract region labels
- [ ] Convert exact appointment timestamps to relative cadence where possible
- [ ] Strip repo/usernames and machine absolute paths from UI + exported data
- [ ] Keep metric structures and trend logic, but sanitize narrative text blobs

---

## 6) Suggested replication order
1. Establish API schema + mock payloads (same keys as current endpoints)
2. Rebuild React shell and 4 main views with layout/color parity
3. Port chart modules and PERMA-V interaction
4. Port PT session architecture and data model
5. Port static `/life-dashboard/` dark dashboard
6. Run anonymization pass and fixture-based regression check

---

## 7) Top parity-critical components
1. **Wellness API contract** (`/api/wellness.json` + companion endpoints)
2. **RecoveryDashboard adherence + tracker integration** (`/api/tracker-status.json`)
3. **PTSessionPlan structured session renderer** (`pt-sessions.json` model)
4. **Healthcare provider grouping system** (`providers/systems/frequencies` + ProviderCard)
5. **Life Dashboard dark static experience** (`/life-dashboard/` + CPAP hook)
