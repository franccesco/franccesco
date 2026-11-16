// Writes a `minutes` reading-time estimate into docs/articles/index.json for every entry.
// Runs as part of `npm run build`; the file is only rewritten when an estimate changes.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const WORDS_PER_MINUTE = 220;
const articles = resolve(import.meta.dirname, '../docs/articles');
const indexPath = resolve(articles, 'index.json');

const source = await readFile(indexPath, 'utf8');
const index = JSON.parse(source);

for (const entry of index) {
  const markdown = await readFile(resolve(articles, `${entry.slug}.md`), 'utf8');
  const words = markdown.split(/\s+/).filter(Boolean).length;
  entry.minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const next = `${JSON.stringify(index, null, 2)}\n`;
if (next !== source) await writeFile(indexPath, next);
