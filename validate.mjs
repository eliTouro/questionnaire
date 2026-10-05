// Checks every question bank: 4 options, 4 explanations, a valid answer index, no duplicate questions.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.join(import.meta.dirname, 'js', 'questions');
let failed = false;
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js'))) {
  const bank = (await import(pathToFileURL(path.join(dir, file)).href)).default;
  const problems = [];
  const spread = [0, 0, 0, 0];
  const seen = new Set();
  bank.forEach((q, i) => {
    const ok = q.q && q.options?.length === 4 && q.why?.length === 4 && q.answer >= 0 && q.answer < 4
      && q.why.every((w) => w && w.length >= 15);
    if (!ok) problems.push(`#${i} malformed`);
    else spread[q.answer]++;
    const key = q.q + (q.code ?? "");
    if (seen.has(key)) problems.push(`#${i} duplicate`);
    seen.add(key);
  });
  if (bank.length < 20) problems.push('fewer than 20 questions');
  if (problems.length) failed = true;
  console.log(file.padEnd(24), String(bank.length).padStart(3), spread.join('/'), problems.join('; ') || 'ok');
}
process.exit(failed ? 1 : 0);
