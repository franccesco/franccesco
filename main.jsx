import { render } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { Article } from './Article.jsx';
import { articleHref, Header, THEMES } from './Components.jsx';
import { Contact } from './Contact.jsx';
import { Landing } from './Landing.jsx';
import { Terminal } from './Terminal.jsx';
import { Writing } from './Writing.jsx';

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

// #/  ·  #/writing?topic=python&q=flask  ·  #/writing/<slug>  ·  #/contact
function parseHash() {
  const [path, query = ''] = (window.location.hash || '').replace(/^#\/?/, '').split('?');
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'writing' && parts[1]) return { route: 'article', slug: parts[1] };
  if (parts[0] === 'writing') {
    const params = new URLSearchParams(query);
    return { route: 'writing', topic: params.get('topic') || '', q: params.get('q') || '' };
  }
  if (parts[0] === 'contact') return { route: 'contact' };
  return { route: 'home' };
}

const go = (hash) => { window.location.hash = hash; };

const scrollBehavior = () =>
  (typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

// j / k: move focus through the entries on the page, or scroll when there are none.
function moveEntry(direction) {
  const entries = [...document.querySelectorAll('[data-entry]')];
  if (entries.length === 0) {
    window.scrollBy({ top: direction * window.innerHeight * 0.5, behavior: scrollBehavior() });
    return;
  }
  const at = entries.indexOf(document.activeElement);
  const next = at < 0
    ? (direction > 0 ? 0 : entries.length - 1)
    : Math.max(0, Math.min(entries.length - 1, at + direction));
  entries[next].focus();
}

function App() {
  const [theme, setTheme] = useTheme();
  const articles = useArticles();
  const [loc, setLoc] = useState(parseHash);
  const terminal = useRef(null);

  useEffect(() => {
    const onHashChange = () => setLoc(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [loc.route, loc.slug]);

  // Move to the adjacent article: +1 is older, -1 is newer.
  const step = (offset) => {
    if (loc.route !== 'article') return;
    const target = articles[articles.findIndex((a) => a.slug === loc.slug) + offset];
    if (target) go(articleHref(target.slug));
  };

  // The handler is re-pointed every render so it always sees current state.
  const keys = useRef(null);
  keys.current = (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
    const actions = {
      h: () => go('#/'),
      w: () => go('#/writing'),
      c: () => go('#/contact'),
      t: () => setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]),
      j: () => moveEntry(1),
      k: () => moveEntry(-1),
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
        {loc.route === 'article' ? <Article key={loc.slug} slug={loc.slug} articles={articles}/>
          : loc.route === 'writing' ? <Writing articles={articles} loc={loc} onSearch={() => terminal.current.focus('grep ')}/>
            : loc.route === 'contact' ? <Contact/>
              : <Landing articles={articles}/>}
      </main>
      <Terminal loc={loc} articles={articles} theme={theme} setTheme={setTheme}
                go={go} step={step} api={terminal}/>
    </>
  );
}

render(<App/>, document.getElementById('root'));

requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.remove('booting');
}));
