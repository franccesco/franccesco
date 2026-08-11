import React from 'react';
import { createRoot } from 'react-dom/client';
import { Article } from './Article.jsx';
import { Contact } from './Contact.jsx';
import { Landing } from './Landing.jsx';
import { Writing } from './Writing.jsx';

const SITE = {
  monogram: 'dot',
  intro: 'compact',
  writingLayout: 'dense',
  bodyWeight: 400,
  measureCh: 62,
};

const THEME_STORAGE_KEY = 'fo:theme';
const isThemeChoice = (value) =>
  value === 'paper' || value === 'midnight' || value === 'system';

function useThemeChoice() {
  const [choice, setChoice] = React.useState(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      return isThemeChoice(stored) ? stored : 'system';
    } catch {
      return 'system';
    }
  });

  const update = React.useCallback((next) => {
    setChoice(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in privacy modes; the in-memory choice still works.
    }
  }, []);

  return [choice, update];
}

function useEffectiveTheme(choice) {
  const getSystem = () =>
    typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'midnight'
      : 'paper';
  const [system, setSystem] = React.useState(getSystem);

  React.useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystem(media.matches ? 'midnight' : 'paper');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return choice === 'system' ? system : choice;
}

function useArticles() {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
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

function routeFromHash() {
  const raw = (window.location.hash || '').replace(/^#\/?/, '').split('?')[0];
  const parts = raw.split('/').filter(Boolean);
  if (parts.length === 0 || parts[0] === 'home') return { route: 'home' };
  if (parts[0] === 'writing' && parts[1]) return { route: 'article', slug: parts[1] };
  if (parts[0] === 'writing') return { route: 'writing' };
  if (parts[0] === 'contact') return { route: 'contact' };
  return { route: 'home' };
}

function MultiPage({ effectiveTheme, themeChoice, onToggleTheme, articles }) {
  const [location, setLocation] = React.useState(routeFromHash);

  React.useEffect(() => {
    const onHashChange = () => setLocation(routeFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = React.useCallback((next) => {
    const target = next === 'home' ? '#/' : `#/${next}`;
    if (window.location.hash !== target) window.location.hash = target;
    setLocation({ route: next });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const openArticle = React.useCallback((slug) => {
    const target = `#/writing/${slug}`;
    if (window.location.hash !== target) window.location.hash = target;
    setLocation({ route: 'article', slug });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const shared = {
    theme: effectiveTheme,
    monogram: SITE.monogram,
    mode: 'multi',
    fontWeight: SITE.bodyWeight,
    measureCh: SITE.measureCh,
    route: location.route === 'article' ? 'writing' : location.route,
    onNavigate: navigate,
    onOpenArticle: openArticle,
    onToggleTheme,
    themeChoice,
    articles,
  };

  if (location.route === 'article') return <Article {...shared} slug={location.slug}/>;
  if (location.route === 'writing') return <Writing {...shared} layout={SITE.writingLayout}/>;
  if (location.route === 'contact') return <Contact {...shared}/>;
  return <Landing {...shared} intro={SITE.intro}/>;
}

function App() {
  const [themeChoice, setThemeChoice] = useThemeChoice();
  const effectiveTheme = useEffectiveTheme(themeChoice);
  const articles = useArticles();

  const onToggleTheme = React.useCallback(() => {
    setThemeChoice(
      themeChoice === 'paper'
        ? 'midnight'
        : themeChoice === 'midnight'
          ? 'system'
          : 'paper',
    );
  }, [themeChoice, setThemeChoice]);

  return (
    <MultiPage
      effectiveTheme={effectiveTheme}
      themeChoice={themeChoice}
      onToggleTheme={onToggleTheme}
      articles={articles}
    />
  );
}

createRoot(document.getElementById('root')).render(<App/>);

requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.remove('booting');
}));
