// Components.jsx — shared pieces for the site. All styling lives in site.css.

import { iconPaths } from './icons.js';

// Identity — change once, used everywhere.
const ME = {
  name: 'Francesco Orozco',
  role: 'AI Engineer & Data Scientist',
  company: 'Bloom Growth',
  host: 'thatai.dev',
  email: 'franccesco@thatai.dev',
  github: 'github.com/franccesco',
  twitter: '@__franccesco',
  linkedin: 'linkedin.com/in/franccesco',
};

const THEMES = ['dark', 'light', 'cream'];
const TOPICS = ['data', 'python', 'ruby', 'web', 'tools'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2025-04-01" → "Apr 01, 2025"
function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  return m ? `${MONTHS[m[2] - 1]} ${m[3]}, ${m[1]}` : iso || '';
}

const articleHref = (slug) => `#/writing/${slug}`;

// Pixel — a 12×12 bitmap icon from icons.js, drawn on whole pixels.
function Pixel({ name, size = 24 }) {
  const [ink, accent] = iconPaths(name);
  return (
    <svg class="px" viewBox="0 0 12 12" width={size} height={size}
         shape-rendering="crispEdges" aria-hidden="true">
      <path d={ink} fill="currentColor"/>
      {accent && <path class="px-accent" d={accent}/>}
    </svg>
  );
}

// Key — a keyboard shortcut hint, e.g. [H].
function Key({ children }) {
  return <span class="k" aria-hidden="true">[{children}]</span>;
}

const NAV = [
  ['home', 'H', '#/'],
  ['writing', 'W', '#/writing'],
  ['contact', 'C', '#/contact'],
];

function Header({ route }) {
  const current = route === 'article' ? 'writing' : route;
  return (
    <header class="top cols rule-below">
      <a class="brand" href="#/">
        <span class="mono-f" aria-hidden="true">f</span>
        <span class="mono-dot" aria-hidden="true"/>
        <span class="brand-name">{ME.name}</span>
      </a>
      <nav class="nav" aria-label="Main">
        {NAV.map(([key, shortcut, href]) => (
          <a key={key} href={href} class={current === key ? 'on' : ''}
             aria-current={current === key ? 'page' : undefined}>
            <Key>{shortcut}</Key> <span>{key}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

// Profile links shown in the terminal line: [icon, label, href].
const SOCIALS = [
  ['mail', 'Email', `mailto:${ME.email}`],
  ['git', 'GitHub', `https://${ME.github}`],
  ['linkedin', 'LinkedIn', `https://${ME.linkedin}`],
  ['x', 'X', `https://twitter.com/${ME.twitter.replace('@', '')}`],
];

// Entry — one line in a list of articles. `data-entry` makes it a j/k target.
function Entry({ article }) {
  return (
    <a class="entry" data-entry href={articleHref(article.slug)}>
      <Pixel name={article.icon}/>
      <span class="entry-date">{formatDate(article.date)}</span>
      <span class="entry-title"><span class="hl">{article.title}</span></span>
      <span class="entry-min">{article.minutes} min</span>
    </a>
  );
}

// Featured — the larger block used for the newest article.
function Featured({ article }) {
  return (
    <a class="feat" data-entry href={articleHref(article.slug)}>
      <span class="tile"><Pixel name={article.icon} size={72}/></span>
      <span class="feat-body">
        <span class="chips">
          <span class="chip chip-on">Latest</span>
          <span class="chip">{article.topic}</span>
          <span class="feat-min">{article.minutes} min</span>
        </span>
        <span class="feat-title">{article.title}</span>
        <span class="feat-dek">{article.description}</span>
        <span class="feat-date">{formatDate(article.date)}</span>
      </span>
    </a>
  );
}

function EntryList({ articles, featureFirst = false }) {
  const [first, ...rest] = articles;
  if (!first) return null;
  return (
    <div class="entries">
      {featureFirst ? <Featured article={first}/> : <Entry article={first}/>}
      {rest.map((article) => <Entry key={article.slug} article={article}/>)}
    </div>
  );
}

export {
  ME, THEMES, TOPICS,
  articleHref, formatDate,
  Entry, EntryList, Featured, Header, Key, Pixel, SOCIALS,
};
