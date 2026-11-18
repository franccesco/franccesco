// content.js — fetches essays and keeps them for the rest of the visit.
// An essay that was prefetched, or read before, is on screen the moment it opens.

let markdown = null;          // the lazy parser and highlighter chunk, once loaded
const sources = new Map();    // slug → promise of the markdown text
const rendered = new Map();   // slug → sanitized HTML

function source(slug) {
  if (!sources.has(slug)) {
    const request = fetch(`articles/${slug}.md`)
      .then((response) => (response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}`))));
    // A failed request is forgotten so the next attempt starts over.
    request.catch(() => sources.delete(slug));
    sources.set(slug, request);
  }
  return sources.get(slug);
}

// Resolves to the essay's HTML.
function loadArticle(slug) {
  return Promise.all([source(slug), import('./markdown.js')]).then(([text, module]) => {
    markdown = module;
    if (!rendered.has(slug)) rendered.set(slug, module.render(text));
    return rendered.get(slug);
  });
}

// The essay's HTML if it is already here, otherwise null.
const ready = (slug) => rendered.get(slug) ?? null;

// Start loading an essay the visitor is likely to open next.
const prefetch = (slug) => { loadArticle(slug).catch(() => {}); };

const highlight = (container) => markdown?.highlight(container);

export { highlight, loadArticle, prefetch, ready };
