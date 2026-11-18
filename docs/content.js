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
  return Promise.all([source(slug), import('./markdown.js')]).then(async ([text, module]) => {
    markdown = module;
    if (!rendered.has(slug)) rendered.set(slug, await module.render(text));
    return rendered.get(slug);
  });
}

// The essay's HTML if it is already here, otherwise null.
const ready = (slug) => rendered.get(slug) ?? null;

// Start loading an essay the visitor is likely to open next.
const prefetch = (slug) => { loadArticle(slug).catch(() => {}); };

// Run on an essay once it is in the DOM: highlights its code and plays its
// clips while they are on screen. Returns a function that stops the clips.
const enhance = (container) => markdown?.enhance(container);

export { enhance, loadArticle, prefetch, ready };
