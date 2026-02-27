#!/usr/bin/env node
import { buildDashboardPayload, readJson, writeJson } from './lib/notes-pipeline.mjs';

const [, , sessionJsonPath, dualNotesPath, outputDashboardPath] = process.argv;
if (!sessionJsonPath || !dualNotesPath || !outputDashboardPath) {
  console.error('Usage: node scripts/update-dashboard-data.mjs <session.json> <dual-notes.json> <dashboard-sync.json>');
  process.exit(1);
}

const session = readJson(sessionJsonPath);
const dualNotes = readJson(dualNotesPath);
const payload = buildDashboardPayload(session, dualNotes);
writeJson(outputDashboardPath, payload);
console.log(`Wrote dashboard sync payload: ${outputDashboardPath}`);
