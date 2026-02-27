import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildDashboardPayload,
  generateDualNotes,
  parseTranscriptToSession,
} from '../scripts/lib/notes-pipeline.mjs';

const sampleTranscript = `[PT SESSION TRANSCRIPT - SANITIZED EXAMPLE]
Date: YYYY-MM-DD
Provider: [PROVIDER_NAME]

Therapist: Let's review pain and mobility from this week.
Patient: Pain after driving was about 4 out of 10.
Therapist: Good. Keep anti-rotation band work: 2 sets of 8 each side.
Therapist: Add wall press with exhale holds: 3 sets of 5, 20 second holds.
Patient: Morning stiffness still there.
Therapist: Capture a custom metric called morning_settle_minutes each day.
Therapist: Next session Tuesday at 5 PM.
`;

test('parseTranscriptToSession extracts canonical fields', () => {
  const session = parseTranscriptToSession(sampleTranscript);
  assert.equal(session.session_date, 'YYYY-MM-DD');
  assert.equal(session.provider, '[PROVIDER_NAME]');
  assert.equal(session.metrics.pain_after_drive, '4/10');
  assert.ok(session.assignments.length >= 2);
  assert.ok(session.findings.some((f) => /stiffness/i.test(f)));
  assert.ok(session.follow_ups.some((f) => /morning_settle_minutes/i.test(f)));
});

test('generateDualNotes outputs operational + reflective sections', () => {
  const session = parseTranscriptToSession(sampleTranscript);
  const dual = generateDualNotes(session, sampleTranscript);
  assert.equal(dual.session_id, session.session_id);
  assert.ok(Array.isArray(dual.operational.action_checklist));
  assert.ok(dual.reflective.narrative_summary.includes('non-diagnostic'));
  assert.equal(dual.safety.non_diagnostic, true);
});

test('buildDashboardPayload maps enhanced notes into dashboard sections', () => {
  const session = parseTranscriptToSession(sampleTranscript);
  const dual = generateDualNotes(session, sampleTranscript);
  const payload = buildDashboardPayload(session, dual);

  assert.equal(payload.generated_from.session_id, session.session_id);
  assert.ok(payload.dashboard.enhanced_notes.operational);
  assert.ok(payload.dashboard.enhanced_notes.reflective);
  assert.ok(/SSOT/i.test(payload.dashboard.ssot_notice));
});
