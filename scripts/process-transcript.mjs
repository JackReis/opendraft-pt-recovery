#!/usr/bin/env node
import { parseTranscriptToSession, readText, writeJson } from './lib/notes-pipeline.mjs';

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/process-transcript.mjs <input.txt> <output-session.json>');
  process.exit(1);
}

const transcript = readText(inputPath);
const session = parseTranscriptToSession(transcript);
writeJson(outputPath, session);
console.log(`Wrote canonical session: ${outputPath}`);
