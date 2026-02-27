# FRONTEND-RESCUE-PLAN

## Goal
Fix readability/contrast regressions (especially dark-on-dark controls), align foreground/background color pairs with small shared tokens, and ship a polished accessible pass to production.

## Scope
- Primary routes: `/` (sessions), `/launch`, `/learn-more`
- Replicated/supporting routes: `/providers`, `/analytics`, `/protocols`
- Components/patterns: buttons, links, chips, badges, nav pills, timeline pills, cards, key text blocks

## Execution Plan
1. **Token pass (small, surgical)**
   - Add semantic color tokens in `src/app/globals.css` for text, surfaces, borders, primary/secondary controls, and status chips.
2. **Contrast/readability fixes**
   - Normalize CTA/button/link colors and focus states.
   - Ensure dark backgrounds always force high-contrast foreground text.
   - Improve muted text and chip/badge contrast where low-contrast values appear.
3. **Manual QA (key views/components)**
   - Validate nav pills, launch CTA row, mode chips, timeline active rows, status cards, and light cards across target routes.
4. **Automated sanity checks**
   - Run lint/check pipeline (`npm run check`) and production build (`npm run build`).
5. **Release + validation artifacts**
   - Commit + push to `origin/main`.
   - Deploy to Vercel production.
   - Capture fresh live screenshots.

## Acceptance Criteria
- No obvious dark-on-dark or low-contrast text failures in core UI controls.
- Primary + replicated routes render with consistent readable control states.
- Keyboard-focus visibility exists on interactive elements.
- `npm run check` and `npm run build` pass.
- Changes committed/pushed to `origin/main`, deployed to Vercel production.
- Fresh screenshots generated at:
  - `/tmp/openclaw/uploads/opendraft-pt-live-1.png`
  - `/tmp/openclaw/uploads/opendraft-pt-live-2.png`
