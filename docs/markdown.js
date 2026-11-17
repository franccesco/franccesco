import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-toml.js';
import 'prismjs/components/prism-yaml.js';
// Pixel sizes of the files under assets/images, written by scripts/media-sizes.mjs.
import mediaSizes from './articles/media.json';

marked.setOptions({
  gfm: true,
});

// Images seen so far in the article being rendered.
let images = 0;

// Images and videos get their pixel size, so the page reserves their space
// before they load and the text below them does not jump. Every image after
// the first loads only when the reader gets near it. Videos are fetched and
// played when they scroll into view (see `enhance`), not all at once on load.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  const tag = node.nodeName;
  if (tag !== 'IMG' && tag !== 'VIDEO') return;
  const size = mediaSizes[node.getAttribute('src')];
  if (size) {
    node.setAttribute('width', size[0]);
    node.setAttribute('height', size[1]);
  }
  if (tag === 'IMG') {
    images += 1;
    node.setAttribute('decoding', 'async');
    if (images > 1) node.setAttribute('loading', 'lazy');
  } else {
    if (node.hasAttribute('autoplay')) node.setAttribute('data-autoplay', '');
    node.removeAttribute('autoplay');
    node.setAttribute('preload', 'none');
    node.setAttribute('playsinline', '');
  }
});

const nextTask = () => new Promise((resolve) => { setTimeout(resolve); });

// Parsing and sanitizing a long article each take a while on a phone, so they
// run as separate tasks and a tap in between is not held up.
async function render(markdown) {
  const parsed = marked.parse(markdown);
  await nextTask();
  images = 0;
  return DOMPurify.sanitize(parsed, {
    USE_PROFILES: { html: true },
  });
}

// Highlight one code block per task so a long article never blocks input.
async function highlight(container) {
  for (const block of container.querySelectorAll('pre code[class*="language-"]')) {
    if (!container.isConnected) return;
    Prism.highlightElement(block);
    await nextTask();
  }
}

// Play each looping clip while it is on screen and pause it when it leaves.
// Readers who ask for reduced motion start the clips themselves.
function playInView(container) {
  const videos = [...container.querySelectorAll('video[data-autoplay]')];
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (videos.length === 0 || still || typeof IntersectionObserver !== 'function') return () => {};
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        target.muted = true;
        target.play().catch(() => {});
      } else {
        target.pause();
      }
    }
  }, { rootMargin: '200px 0px' });
  videos.forEach((video) => observer.observe(video));
  return () => observer.disconnect();
}

// Run once the rendered article is in the DOM. Returns a cleanup function.
function enhance(container) {
  highlight(container);
  return playInView(container);
}

export { enhance, render };
