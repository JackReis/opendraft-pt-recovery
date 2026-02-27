#!/usr/bin/env node
import fs from 'fs';

const [,, inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/process-transcript.mjs <input.txt> <output.json>');
  process.exit(1);
}

const text = fs.readFileSync(inputPath, 'utf8');

const find = (re, fallback='[unknown]') => (text.match(re)?.[1] || fallback).trim();
const date = find(/Date:\s*([^\n]+)/i, 'YYYY-MM-DD');
const provider = find(/Provider:\s*([^\n]+)/i, '[PROVIDER_NAME]');
const pain = find(/pain[^\n]*?(\d+\s*(?:\/|out of)\s*10)/i, 'n/a').replace(/\s*out of\s*/i, '/');
const nextSession = find(/next session\s*([^\n\.]+)/i, 'n/a');

const assignments = [];
for (const line of text.split('\n')) {
  if (/keep|add|exercise|sets?|reps?|holds?/i.test(line) && /therapist:/i.test(line)) {
    assignments.push(line.replace(/^\s*Therapist:\s*/i, '').trim());
  }
}

const customMetrics = [];
for (const m of text.matchAll(/custom metric (?:called )?([a-zA-Z0-9_\-]+)/gi)) {
  customMetrics.push(m[1]);
}

const out = {
  session_id: `pt-${date}`,
  session_date: date,
  provider,
  metrics: {
    pain_after_drive: pain,
    custom_metrics: [...new Set(customMetrics)],
  },
  findings: [
    /stiffness/i.test(text) ? 'Stiffness reported' : 'No explicit stiffness note parsed'
  ],
  assignments,
  follow_ups: [...new Set(customMetrics)].map(m => `Track ${m} daily`),
  next_session: nextSession,
  notes: 'Auto-generated from transcript. Review before clinical use.',
  privacy: {
    sanitized_template: true,
    placeholders_expected: true
  }
};

fs.writeFileSync(outputPath, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${outputPath}`);
