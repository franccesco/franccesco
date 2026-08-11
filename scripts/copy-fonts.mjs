import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const target = resolve(root, 'docs/assets/fonts');

const files = [
  ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', 'geist-latin-wght-normal.woff2'],
  ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2', 'geist-mono-latin-wght-normal.woff2'],
  ['@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2', 'instrument-serif-latin-400-normal.woff2'],
  ['@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', 'instrument-serif-latin-400-italic.woff2'],
  ['@fontsource-variable/geist/LICENSE', 'OFL-1.1.txt'],
];

await mkdir(target, { recursive: true });

for (const [source, destination] of files) {
  const packagePath = resolve(root, 'node_modules', source);
  const destinationPath = resolve(target, destination);
  await mkdir(dirname(destinationPath), { recursive: true });
  await copyFile(packagePath, destinationPath);
}
