// Writes docs/articles/media.json: the pixel size of every image and video under
// docs/assets/images, keyed by the path articles use ("/assets/images/…").
// The article renderer puts these on <img> and <video> so the browser reserves
// their space before they load. Runs as part of `npm run build`; the file is
// only rewritten when a size changes.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

const docs = resolve(import.meta.dirname, '../docs');
const media = resolve(docs, 'assets/images');
const output = resolve(docs, 'articles/media.json');

// PNG: width and height are the first two fields of the IHDR chunk.
function pngSize(bytes) {
  if (bytes.readUInt32BE(0) !== 0x89504e47 || bytes.toString('latin1', 12, 16) !== 'IHDR') return null;
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

// EBML variable-length integer. Element sizes drop the length marker bit; ids keep it.
function vint(bytes, at, keepMarker) {
  let length = 1;
  while (length <= 8 && !(bytes[at] & (0x100 >> length))) length += 1;
  let value = keepMarker ? bytes[at] : bytes[at] & (0xff >> length);
  for (let n = 1; n < length; n += 1) value = value * 256 + bytes[at + n];
  return [value, length];
}

// WebM: walk Segment → Tracks → TrackEntry → Video for PixelWidth and PixelHeight.
const WEBM_PARENTS = new Set([0x18538067, 0x1654ae6b, 0xae, 0xe0]);
const PIXEL_WIDTH = 0xb0;
const PIXEL_HEIGHT = 0xba;

function webmSize(bytes) {
  let width = 0;
  let height = 0;
  const walk = (from, to) => {
    let at = from;
    while (at < to && !(width && height)) {
      const [id, idLength] = vint(bytes, at, true);
      const [size, sizeLength] = vint(bytes, at + idLength, false);
      const start = at + idLength + sizeLength;
      const end = Math.min(start + size, to);
      if (WEBM_PARENTS.has(id)) walk(start, end);
      else if (id === PIXEL_WIDTH) width = bytes.readUIntBE(start, size);
      else if (id === PIXEL_HEIGHT) height = bytes.readUIntBE(start, size);
      at = start + size;
    }
  };
  walk(0, bytes.length);
  return width && height ? [width, height] : null;
}

const readers = { png: pngSize, webm: webmSize };

const sizes = {};
const files = (await readdir(media, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => resolve(entry.parentPath, entry.name))
  .sort();

for (const file of files) {
  const read = readers[file.split('.').pop().toLowerCase()];
  if (!read) continue;
  const size = read(await readFile(file));
  if (!size) throw new Error(`Could not read the size of ${file}`);
  sizes[`/${relative(docs, file).split('\\').join('/')}`] = size;
}

const next = `${JSON.stringify(sizes, null, 2)}\n`;
const current = await readFile(output, 'utf8').catch(() => '');
if (next !== current) await writeFile(output, next);
