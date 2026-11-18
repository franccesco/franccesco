// Landing.jsx — homepage: five tiled panes that fill one screen on a desktop.
// Portrait and about share the top left, work sits under them, and writing and
// contact share the right column. The writing pane lists every entry, a page
// at a time, filtered by `?topic=` and `?q=` in the hash.

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import { EntryList, Key, listHref, ME, Pixel, SOCIALS } from './Components.jsx';

// Pane — one tile: a title bar with an optional item at its right end, the
// content, and an optional bar along the bottom.
// `active` marks the pane the j / k keys act on.
function Pane({ name, label, note, meta, foot, active = false, paneRef, children }) {
  return (
    <section class={`pane pane-${name}${active ? ' pane-on' : ''}`} aria-label={label} ref={paneRef}>
      <div class="pane-head">
        <span class="pane-name">{name}</span>
        {note}
        {meta}
      </div>
      <div class="pane-body">{children}</div>
      {foot}
    </section>
  );
}

// The width from which the panes are tiled; site.css stacks them below it.
const TILED = '(min-width: 1181px)';

// Entries per page while the panes are stacked and the pane is as tall as its
// list: the page that opens with the featured entry, then every other page.
const FEATURED_PAGE = 5;
const PLAIN_PAGE = 8;

function fixedPages(count, featured) {
  const pages = [];
  for (let start = 0; start < count;) {
    const end = Math.min(count, start + (featured && start === 0 ? FEATURED_PAGE : PLAIN_PAGE));
    pages.push([start, end]);
    start = end;
  }
  return pages;
}

// Fill each page with as many rows as fit in `room` pixels, and at least one.
function fittedPages(heights, room) {
  const pages = [];
  let start = 0;
  let used = 0;
  heights.forEach((height, n) => {
    if (n > start && used + height > room) {
      pages.push([start, n]);
      start = n;
      used = 0;
    }
    used += height;
  });
  if (heights.length > 0) pages.push([start, heights.length]);
  return pages;
}

function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// Splits `list` into pages, each a [start, end) range of it.
// While the panes are tiled the writing pane has a fixed height, so the pages
// are measured: an unseen copy of the whole list (the "ghost") is laid out at
// the same width, and its row heights decide how many rows each page holds.
// The pages are measured again whenever the pane is resized or text reflows.
function usePages(list, featured) {
  const tiled = useMedia(TILED);
  const box = useRef(null);
  const ghost = useRef(null);
  const [fitted, setFitted] = useState(null);

  useLayoutEffect(() => {
    if (!tiled || !ghost.current) {
      setFitted(null);
      return undefined;
    }
    const measure = () => {
      const heights = [...ghost.current.children].map((row) => row.offsetHeight);
      // One pixel is kept for the rule under the last row.
      const next = fittedPages(heights, box.current.clientHeight - 1);
      setFitted((current) => (String(current) === String(next) ? current : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box.current);
    observer.observe(ghost.current);
    return () => observer.disconnect();
  }, [tiled, list, featured]);

  return { tiled, box, ghost, pages: (tiled && fitted) || fixedPages(list.length, featured) };
}

// The bar under the list: newer entries to the left, older to the right.
function PageBar({ page, count, hrefFor, onTurn }) {
  const link = (to, label) => (to >= 1 && to <= count
    ? <a href={hrefFor(to)} onClick={(event) => { event.preventDefault(); onTurn(to); }}>{label}</a>
    : <a class="off" role="link" aria-disabled="true">{label}</a>);
  return (
    <nav class="pane-foot" aria-label="Pages of writing">
      {link(page - 1, <><Key>[</Key> Newer</>)}
      <span aria-live="polite">Page {page} / {count}</span>
      {link(page + 1, <>Older <Key>]</Key></>)}
    </nav>
  );
}

// WritingPane — every entry, a page at a time.
// `loc` carries the filter and page from the hash; `go(hash, replace)` navigates;
// `pager` is filled in so that keys and terminal commands can turn pages.
function WritingPane({ articles, loc, go, pager }) {
  const { topic, q } = loc;
  const list = useMemo(() => {
    const query = q.toLowerCase();
    return articles.filter((a) =>
      (!topic || a.topic === topic)
      && (!query || `${a.title} ${a.description}`.toLowerCase().includes(query)));
  }, [articles, topic, q]);
  const filtered = Boolean(topic || q);

  const { tiled, box, ghost, pages } = usePages(list, !filtered);
  const count = Math.max(1, pages.length);
  const page = Math.min(loc.page, count);
  const [start, end] = pages[page - 1] || [0, 0];

  const pane = useRef(null);
  const focusNext = useRef(null);
  const shown = useRef(null);
  const moved = useRef(false);

  const hrefFor = (to) => listHref({ topic, q, page: to });
  // Turning a page replaces the address, so the back button leaves the list
  // in one step. `focus` is "first" or "last": the entry to select afterwards.
  const turnTo = (to, focus = null) => {
    if (to < 1 || to > count || to === page) return false;
    focusNext.current = focus;
    go(hrefFor(to), true);
    return true;
  };
  pager.current = { page, count, turnTo };

  // After the list changes: select the entry the j / k keys asked for, and on
  // a stacked layout bring the top of the pane back into view.
  const view = `${topic}|${q}|${page}`;
  // The list the pane opens with appears at once; every list after it fades in.
  if (shown.current !== null && shown.current !== view) moved.current = true;
  useEffect(() => {
    const first = shown.current === null;
    shown.current = view;
    if (first) return;
    const top = pane.current.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) pane.current.scrollIntoView({ block: 'start' });
    if (focusNext.current) {
      const entries = pane.current.querySelectorAll('.entries:not(.ghost) [data-entry]');
      entries[focusNext.current === 'last' ? entries.length - 1 : 0]?.focus({ preventScroll: true });
      focusNext.current = null;
    }
  }, [view]);

  return (
    <Pane name="writing" label="Writing" active paneRef={pane}
          note={filtered && (
            <span class="pane-filter">
              <span>{[topic && `ls ${topic}`, q && `grep "${q}"`].filter(Boolean).join(' | ')}</span>
              <a class="more" href="#/">clear</a>
            </span>
          )}
          meta={list.length > 0 && (
            <span class="pane-range">{start + 1}–{end} of {list.length}</span>
          )}
          foot={count > 1 && <PageBar page={page} count={count} hrefFor={hrefFor} onTurn={turnTo}/>}>
      <div class="list" ref={box}>
        {articles.length > 0 && list.length === 0 && (
          <p class="status">No entries match. Type <b>ls</b> to list everything.</p>
        )}
        {/* Keyed by what it shows, so a new page is a new list and fades in. */}
        <EntryList key={view} articles={list.slice(start, end)}
                   featureFirst={!filtered && start === 0} extra={moved.current ? 'swap' : ''}/>
        {tiled && (
          <EntryList articles={list} featureFirst={!filtered} extra="ghost"
                     listRef={ghost} aria-hidden="true"/>
        )}
      </div>
    </Pane>
  );
}

function Job({ when, role, where, note }) {
  return (
    <div class="job">
      <div class="job-when"><Pixel name="case" size={12}/><span>{when}</span></div>
      <div class="job-role">{role} <span class="job-where">· {where}</span></div>
      <p class="job-note">{note}</p>
    </div>
  );
}

function Landing({ articles, loc, go, pager }) {
  return (
    <div class="panes">
      <div class="panes-left">
        <div class="panes-top">
          <Pane name="portrait" label="Portrait">
            {/* index.html preloads this image; keep its srcset and sizes the same as these. */}
            <img class="photo" src="assets/portrait-400.webp"
                 srcset="assets/portrait-320.webp 320w, assets/portrait-400.webp 400w, assets/portrait-640.webp 640w, assets/portrait-800.webp 800w"
                 sizes="(max-width: 600px) 100vw, (max-width: 820px) 40vw, 384px"
                 width="400" height="500" decoding="async" fetchpriority="high" alt={ME.name}/>
          </Pane>

          <Pane name="about" label="About">
            <p class="prompt" aria-hidden="true"><span>$</span> whoami</p>
            <h1 class="home-name">{ME.name}</h1>
            <p class="home-role">{ME.role} at {ME.company}.</p>
            <p class="bio">
              I build <em class="serif">agentic systems</em> for complex problems. Right now
              that&rsquo;s <em>Scout</em> — an agent at <strong>Bloom Growth</strong> people can
              delegate their work to, 24/7. Before agents, a few years on the data underneath:
              pipelines, models, and the decisions that run on top.
            </p>
            <a class="btn" href="#/contact">
              <Key>C</Key>Let&rsquo;s connect<span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </Pane>
        </div>

        <Pane name="work" label="What I’ve worked on" meta={<span>2019 — now</span>}>
          <p class="note">
            Mostly behind the scenes — work for companies, not personal projects. Happy to talk
            about any of it.
          </p>
          <div class="jobs">
            <Job when="2019 — now" role="Data Scientist & AI Engineer" where="Bloom Growth"
              note="Started in analytics and machine learning — pulling insight out of product data, unifying databanks across platforms. Grew into running the AI project cycle end-to-end and modernizing how we collect, store, and catalogue data. Most of my time now goes to Scout and the agent stack around it."/>
            <Job when="2022" role="Customer Data Scientist" where="Deepnote"
              note="A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams."/>
          </div>
        </Pane>
      </div>

      <div class="panes-right">
        <WritingPane articles={articles} loc={loc} go={go} pager={pager}/>

        <Pane name="contact" label="Contact">
          {SOCIALS.map(([icon, label, href, text]) => (
            <a key={icon} class="channel" href={href}
               target={href.startsWith('http') ? '_blank' : undefined}
               rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
              <Pixel name={icon} size={12}/>
              <span class="channel-label">{label}</span>
              <span>{text}</span>
            </a>
          ))}
        </Pane>
      </div>
    </div>
  );
}

export { Landing };
