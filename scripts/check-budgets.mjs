import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const budgets = [
  {
    path: 'docs/build/app.js',
    limit: 25 * 1024,
    measure: (contents) => gzipSync(contents).byteLength,
    label: 'homepage JavaScript (gzip)',
  },
  {
    path: 'docs/assets/portrait-400.webp',
    limit: 25 * 1024,
    measure: (contents) => contents.byteLength,
    label: '2x mobile portrait',
  },
];

let failed = false;

for (const budget of budgets) {
  const contents = await readFile(budget.path);
  const bytes = budget.measure(contents);
  const limitKb = (budget.limit / 1024).toFixed(1);
  const actualKb = (bytes / 1024).toFixed(1);

  console.log(`${budget.label}: ${actualKb} kB / ${limitKb} kB`);
  failed ||= bytes > budget.limit;
}

if (failed) {
  throw new Error('Performance budget exceeded');
}
