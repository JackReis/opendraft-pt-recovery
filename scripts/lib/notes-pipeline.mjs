import fs from 'fs';

export function readText(path) {
  return fs.readFileSync(path, 'utf8');
}

export function readJson(path) {
  return JSON.parse(readText(path));
}

export function writeJson(path, value) {
  fs.writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

export function parseTranscriptToSession(text) {
  const lines = text.split('\n');
  const find = (re, fallback = '[unknown]') => (text.match(re)?.[1] || fallback).trim();

  const sessionDate = find(/Date:\s*([^\n]+)/i, 'YYYY-MM-DD');
  const provider = find(/Provider:\s*([^\n]+)/i, '[PROVIDER_NAME]');
  const pain = find(/pain[^\n]*?(\d+\s*(?:\/|out of)\s*10)/i, 'n/a').replace(/\s*out of\s*/i, '/');
  const nextSession = find(/next session\s*([^\n\.]+)/i, 'n/a');

  const assignments = [];
  const findings = [];
  const customMetrics = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (/therapist:/i.test(line) && /(keep|add|exercise|sets?|reps?|holds?|track|capture)/i.test(line)) {
      assignments.push(line.replace(/^\s*Therapist:\s*/i, '').trim());
    }

    if (/patient:/i.test(line) && /(stiff|pain|fatigue|sleep|sensitive|guarding)/i.test(line)) {
      findings.push(line.replace(/^\s*Patient:\s*/i, '').trim());
    }

    for (const m of line.matchAll(/custom metric (?:called )?([a-zA-Z0-9_\-]+)/gi)) {
      customMetrics.push(m[1]);
    }
  }

  if (findings.length === 0) {
    findings.push(/stiffness/i.test(text) ? 'Stiffness reported in transcript context.' : 'No explicit symptom-context lines parsed.');
  }

  const dedupedMetrics = [...new Set(customMetrics)];
  const followUps = dedupedMetrics.map((m) => `Track ${m} daily and review trend before next session.`);

  return {
    session_id: `pt-${sessionDate}`,
    session_date: sessionDate,
    provider,
    source: 'transcript',
    metrics: {
      pain_after_drive: pain,
      custom_metrics: dedupedMetrics,
    },
    findings,
    assignments,
    follow_ups: followUps,
    next_session: nextSession,
    notes: 'Auto-generated from transcript. Human review required before clinical use.',
    privacy: {
      sanitized_template: true,
      placeholders_expected: true,
      non_diagnostic: true,
    },
  };
}

export function generateDualNotes(session, transcriptText = '') {
  const assignmentChecklist = (session.assignments || []).map((item, idx) => `${idx + 1}. ${item}`);
  const findings = session.findings || [];
  const metrics = session.metrics || {};
  const customMetrics = metrics.custom_metrics || [];

  const operational = {
    title: 'Operational Notes',
    priorities: [
      'Preserve consistency on current assignment block.',
      'Observe sensitivity signals during rotation/load transitions.',
      'Log daily custom metrics for progression decisions.',
    ],
    action_checklist: assignmentChecklist,
    follow_up_actions: session.follow_ups || [],
    blockers_or_watchouts: findings.slice(0, 3),
    next_session_prep: [
      `Bring trend snapshot for: ${customMetrics.length ? customMetrics.join(', ') : 'custom metrics TBD'}.`,
      `Confirm schedule: ${session.next_session || 'n/a'}.`,
    ],
  };

  const reflectiveNarrative = [
    `Session context from ${session.session_date} with provider ${session.provider}.`,
    findings.length
      ? `Observed themes: ${findings.join(' | ')}`
      : 'Observed themes: no explicit symptom-context notes found.',
    transcriptText && /travel|desk|sleep|stress/i.test(transcriptText)
      ? 'Context sensitivity present (lifestyle factors noted in transcript).'
      : 'Context sensitivity: monitor day-to-day variability and adherence conditions.',
    'This summary is non-diagnostic and intended for workflow reflection only.',
  ];

  const reflective = {
    title: 'Reflective Notes (Non-Diagnostic)',
    narrative_summary: reflectiveNarrative.join(' '),
    pattern_observations: findings,
    context_and_nuance: [
      'Different daily conditions can shift performance and comfort signals.',
      'Progress interpretation should include adherence, fatigue, and routine constraints.',
    ],
    review_prompt: 'What changed this week in routine, load, or recovery context that best explains the session pattern?',
  };

  return {
    generated_at: new Date().toISOString(),
    session_id: session.session_id,
    operational,
    reflective,
    safety: {
      non_diagnostic: true,
      human_review_required: true,
    },
  };
}

export function buildDashboardPayload(session, dualNotes) {
  return {
    generated_at: new Date().toISOString(),
    generated_from: {
      session_id: session.session_id,
      session_date: session.session_date,
      provider: session.provider,
    },
    dashboard: {
      headline: {
        title: 'Enhanced Session Intelligence',
        subtitle: 'Synced from canonical session + dual-notes pipeline',
      },
      session_snapshot: {
        findings: session.findings || [],
        assignments: session.assignments || [],
        follow_ups: session.follow_ups || [],
        next_session: session.next_session || 'n/a',
        metrics: session.metrics || {},
      },
      enhanced_notes: {
        operational: dualNotes.operational,
        reflective: dualNotes.reflective,
      },
      ssot_notice:
        'SSOT = canonical session JSON. Dashboard views are downstream projections and should not diverge from canonical source records.',
    },
  };
}
