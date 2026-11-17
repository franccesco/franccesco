import { render } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { Article } from './Article.jsx';
import { articleHref, Header, listHref, THEMES } from './Components.jsx';
import { Contact } from './Contact.jsx';
import { Landing } from './Landing.jsx';
import { Terminal } from './Terminal.jsx';

// index.html sets <html data-theme> from this key before first paint.
const THEME_STORAGE_KEY = 'fo:theme';

function useTheme() {
  const [theme, setThemeState] = useState(() => {
    const current = document.documentElement.dataset.theme;
    return THEMES.includes(current) ? current : THEMES[0];
  });

  const setTheme = useCallback((next) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in privacy modes; the in-memory choice still works.
    }
  }, []);

  return [theme, setTheme];
}

function useArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('articles/index.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`index.json ${response.status}`);
        return response.json();
      })
      .then(setArticles)
      .catch((error) => {
        if (error.name !== 'AbortError') setArticles([]);
      });
    return () => controller.abort();
  }, []);

  return articles;
}

// #/  ·  #/?topic=python&q=flask&page=2  ·  #/writing/<slug>  ·  #/contact
// The homepage holds the list of writing; its filter and page live in the query.
// "#/writing" was a page of its own once, and still opens the list.
function parseHash() {
  const [path, query = ''] = (window.location.hash || '').replace(/^#\/?/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'writing' && parts[1]) return { route: 'article', slug: parts[1] };
  if (parts[0] === 'contact') return { route: 'contact' };
  const params = new URLSearchParams(query);
  return {
    route: 'home',
    topic: params.get('topic') || '',
    q: params.get('q') || '',
    page: Math.max(1, parseInt(params.get('page'), 10) || 1),
  };
}

// Scroll positions by address, restored when the visitor comes back with the
// browser's back and forward buttons. A navigation the page starts itself sets
// `started`; a hash change without it is the browser moving through history.
const scrolls = new Map();
let started = false;
window.history.scrollRestoration = 'manual';

// With `replace` the new address takes the place of the current history entry.
function go(hash, replace = false) {
  if (hash === window.location.hash) return;
  started = true;
  if (replace) {
    window.history.replaceState(null, '', hash);
    window.dispatchEvent(new Event('hashchange'));
  } else {
    window.location.hash = hash;
  }
}

document.addEventListener('click', (event) => {
  // A click with a modifier key opens a new tab and leaves this one alone.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
  const link = event.target.closest?.('a[href^="#/"]');
  if (link && link.hash !== window.location.hash) started = true;
}, true);

const scrollBehavior = () =>
  (typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

// j / k: move focus through the entries on the page, or scroll when there are none.
// Past either end of the list, `turn` gets the chance to bring up the next page.
function moveEntry(direction, turn) {
  const entries = [...document.querySelectorAll('.entries:not(.ghost) [data-entry]')];
  if (entries.length === 0) {
    window.scrollBy({ top: direction * window.innerHeight * 0.5, behavior: scrollBehavior() });
    return;
  }
  const at = entries.indexOf(document.activeElement);
  const next = at < 0 ? (direction > 0 ? 0 : entries.length - 1) : at + direction;
  if (entries[next]) entries[next].focus();
  else turn(direction, direction > 0 ? 'first' : 'last');
}

function App() {
  const [theme, setTheme] = useTheme();
  const articles = useArticles();
  const [loc, setLoc] = useState(parseHash);
  const terminal = useRef(null);
  const pager = useRef(null);
  const address = useRef(window.location.hash);
  const restore = useRef(0);

  // The homepage as it was last seen, for the way back out of an article.
  const list = useRef('#/');
  if (loc.route === 'home') list.current = listHref(loc);

  useEffect(() => {
    const onHashChange = () => {
      scrolls.set(address.current, window.scrollY);
      address.current = window.location.hash;
      restore.current = started ? 0 : scrolls.get(address.current) || 0;
      started = false;
      setLoc(parseHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // A new page starts at the top, or where it was left when it is revisited
  // through history. Turning a page of the list is not a new page.
  useEffect(() => {
    window.scrollTo({ top: restore.current, behavior: 'instant' });
  }, [loc.route, loc.slug]);

  // Move to the next thing in reading order: +1 is older, -1 is newer. That is
  // the adjacent article while reading one, and the adjacent page of the list
  // on the homepage. Returns whether there was anywhere to go.
  const step = (offset, focus) => {
    if (loc.route === 'home') return pager.current.turnTo(pager.current.page + offset, focus);
    if (loc.route !== 'article') return false;
    const target = articles[articles.findIndex((a) => a.slug === loc.slug) + offset];
    if (target) go(articleHref(target.slug));
    return Boolean(target);
  };

  // The handler is re-pointed every render so it always sees current state.
  const keys = useRef(null);
  keys.current = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
    const actions = {
      h: () => go('#/'),
      c: () => go('#/contact'),
      t: () => setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]),
      j: () => moveEntry(1, step),
      k: () => moveEntry(-1, step),
      '[': () => step(-1),
      ']': () => step(1),
      g: () => window.scrollTo({ top: 0, behavior: scrollBehavior() }),
      G: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: scrollBehavior() }),
      '/': () => terminal.current.focus(),
      '?': () => terminal.current.run('help'),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  useEffect(() => {
    const onKeyDown = (event) => keys.current(event);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Header route={loc.route}/>
      {/* The homepage panes run edge to edge; every other page sits in the centered column. */}
      <main class={loc.route === 'home' ? 'home' : 'shell'}>
        {loc.route === 'article' ? <Article key={loc.slug} slug={loc.slug} articles={articles} back={list.current}/>
          : loc.route === 'contact' ? <Contact/>
            : <Landing articles={articles} loc={loc} go={go} pager={pager}/>}
      </main>
      <Terminal loc={loc} articles={articles} theme={theme} setTheme={setTheme}
                go={go} step={step} pager={pager} back={list.current} api={terminal}/>
    </>
  );
}

render(<App/>, document.getElementById('root'));

requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.remove('booting');
}));
