#!/usr/bin/env node
import { generateDualNotes, readJson, readText, writeJson } from './lib/notes-pipeline.mjs';

const [, , sessionJsonPath, outputNotesPath, transcriptPath] = process.argv;
if (!sessionJsonPath || !outputNotesPath) {
  console.error('Usage: node scripts/generate-dual-notes.mjs <session.json> <dual-notes.json> [transcript.txt]');
  process.exit(1);
}

const session = readJson(sessionJsonPath);
const transcript = transcriptPath ? readText(transcriptPath) : '';
const dualNotes = generateDualNotes(session, transcript);
writeJson(outputNotesPath, dualNotes);
console.log(`Wrote dual notes: ${outputNotesPath}`);
