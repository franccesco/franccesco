// Components.jsx — shared pieces for the site. All styling lives in site.css.

import { prefetch } from './content.js';
import { iconPaths } from './icons.js';

// Identity — change once, used everywhere.
const ME = {
  name: 'Francesco Orozco',
  role: 'AI Engineer & Data Scientist',
  company: 'Bloom Growth',
  host: 'thatai.dev',
  email: 'franccesco@thatai.dev',
  github: 'github.com/franccesco',
  twitter: '@franccesco',
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

// The homepage with its writing list filtered and turned to a page.
// Page 1 with no filter is plain "#/".
function listHref({ topic = '', q = '', page = 1 } = {}) {
  const params = new URLSearchParams();
  if (topic) params.set('topic', topic);
  if (q) params.set('q', q);
  if (page > 1) params.set('page', page);
  const query = params.toString();
  return query ? `#/?${query}` : '#/';
}

// Handlers for a link to an article: start loading it as soon as the visitor
// points at the link or moves keyboard focus to it.
const warm = (slug) => ({
  onPointerEnter: () => prefetch(slug),
  onFocus: () => prefetch(slug),
});

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
  ['contact', 'C', '#/contact'],
];

// Key hints at the right end of the tab bar: [keys, what they do].
// The entry keys are listed only on the homepage, which has the list of writing.
const ENTRY_HINTS = [['j k', 'next / previous entry'], ['enter', 'open'], ['[ ]', 'turn the page']];
const PAGE_HINTS = [['t', 'next theme'], ['?', 'keys and commands']];

// Header — a tab bar across the full width: brand, one tab per page, key hints.
function Header({ route }) {
  const hints = route === 'home' ? [...ENTRY_HINTS, PAGE_HINTS[0]] : PAGE_HINTS;
  return (
    <header class="top">
      <a class="brand" href="#/" aria-label={`${ME.name}, home`}>
        <span class="mono" aria-hidden="true">
          <span class="mono-f">f</span>
          <span class="mono-dot"/>
        </span>
        <span class="brand-host" aria-hidden="true">{ME.host}</span>
      </a>
      <nav class="nav" aria-label="Main">
        {NAV.map(([key, shortcut, href]) => (
          <a key={key} href={href} class={route === key ? 'on' : ''}
             aria-current={route === key ? 'page' : undefined}>
            <Key>{shortcut}</Key> <span>{key}</span>
          </a>
        ))}
      </nav>
      <div class="top-keys" aria-hidden="true">
        {hints.map(([keys, action]) => <span key={keys}><b>{keys}</b> {action}</span>)}
      </div>
    </header>
  );
}

// Profile links: [icon, label, href, text]. The terminal line shows them as
// icons; the homepage contact pane shows the label and text.
const SOCIALS = [
  ['mail', 'Email', `mailto:${ME.email}`, ME.email],
  ['git', 'GitHub', `https://${ME.github}`, ME.github],
  ['linkedin', 'LinkedIn', `https://${ME.linkedin}`, ME.linkedin],
  ['x', 'X', `https://twitter.com/${ME.twitter.replace('@', '')}`, ME.twitter],
];

// Entry — one line in a list of articles. `data-entry` makes it a j/k target.
function Entry({ article }) {
  return (
    <a class="entry" data-entry href={articleHref(article.slug)} {...warm(article.slug)}>
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
    <a class="feat" data-entry href={articleHref(article.slug)} {...warm(article.slug)}>
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

// `extra` adds class names to the list; `listRef` receives its element.
function EntryList({ articles, featureFirst = false, extra = '', listRef, ...rest }) {
  const [first, ...others] = articles;
  if (!first) return null;
  return (
    <div class={`entries ${extra}`} ref={listRef} {...rest}>
      {featureFirst ? <Featured article={first}/> : <Entry article={first}/>}
      {others.map((article) => <Entry key={article.slug} article={article}/>)}
    </div>
  );
}

export {
  ME, THEMES, TOPICS,
  articleHref, formatDate, listHref, warm,
  Entry, EntryList, Featured, Header, Key, Pixel, SOCIALS,
};
