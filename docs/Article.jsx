// Article.jsx — markdown article reader with a contents tree.
// Loading, parsing, and highlighting live in content.js, which keeps what it has fetched.

import { useEffect, useRef, useState } from 'preact/hooks';
import { articleHref, formatDate, Key, listHref, Pixel, warm } from './Components.jsx';
import { enhance, loadArticle, ready } from './content.js';

// A heading counts as current once it has scrolled above this line.
const ACTIVE_LINE = 140;

const reducedMotion = () =>
  typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Tree({ items, active }) {
  if (items.length === 0) return null;
  const jump = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
  };
  return (
    <nav class="tree" aria-label="Contents">
      <h2 class="label">Tree</h2>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} onClick={(event) => jump(event, item.id)}
           class={`${item.sub ? 'sub' : ''}${item.id === active ? ' on' : ''}`}>
          {item.text}
        </a>
      ))}
    </nav>
  );
}

function Pager({ newer, older }) {
  if (!newer && !older) return null;
  return (
    <nav class="pager" aria-label="More writing">
      {newer ? (
        <a href={articleHref(newer.slug)} {...warm(newer.slug)}>
          <span class="pager-dir"><Key>[</Key> Newer</span>
          <span>{newer.title}</span>
        </a>
      ) : <span/>}
      {older ? (
        <a class="pager-next" href={articleHref(older.slug)} {...warm(older.slug)}>
          <span class="pager-dir">Older <Key>]</Key></span>
          <span>{older.title}</span>
        </a>
      ) : <span/>}
    </nav>
  );
}

// `back` is the homepage as the visitor left it: the same filter and page.
function Article({ slug, articles, back }) {
  // An essay that was prefetched or read before is rendered at once.
  const [html, setHtml] = useState(() => ready(slug));
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [active, setActive] = useState('');
  const [docked, setDocked] = useState(false);
  const body = useRef(null);
  const headline = useRef(null);

  const index = articles.findIndex((a) => a.slug === slug);
  const meta = articles[index];

  // The component is keyed by slug, so this runs once per essay.
  useEffect(() => {
    if (html) return undefined;
    let cancelled = false;
    loadArticle(slug)
      .then((loaded) => { if (!cancelled) setHtml(loaded); })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, []);

  // The sidebar shows a compact title only while the headline is out of view.
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return undefined;
    const observer = new IntersectionObserver(([entry]) => setDocked(!entry.isIntersecting));
    observer.observe(headline.current);
    return () => observer.disconnect();
  }, []);

  const toTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  // After the markdown is in the DOM: highlight code and start the clips, then
  // index the headings.
  useEffect(() => {
    if (!html || !body.current) return undefined;
    const stopClips = enhance(body.current);
    const headings = [...body.current.querySelectorAll('h2, h3')];
    headings.forEach((heading, n) => { heading.id = `s${n}`; });
    setToc(headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent,
      sub: heading.tagName === 'H3',
    })));

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '';
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > ACTIVE_LINE) break;
        current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => { frame ||= requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      stopClips?.();
    };
  }, [html]);

  return (
    <article class="cols page">
      <aside class="side art-side">
        <a class="back" href={back}>← cd ..</a>
        <div class="art-facts">
          {/* Once the headline scrolls away, the tile shrinks and the title docks beside it. */}
          <div class={`art-id${docked ? ' docked' : ''}`}>
            <span class="tile"><Pixel name={meta?.icon || 'file'} size={72}/></span>
            <a class="art-id-title" href="#/" aria-hidden="true" tabindex={-1} onClick={toTop}>
              {meta ? meta.title : slug}
            </a>
          </div>
          {meta && (
            <dl class="meta">
              <div><dt>published</dt><dd>{formatDate(meta.date)}</dd></div>
              <div>
                <dt>topic</dt>
                <dd><a href={listHref({ topic: meta.topic })}>{meta.topic}</a></dd>
              </div>
              <div><dt>reading time</dt><dd>{meta.minutes} min</dd></div>
            </dl>
          )}
        </div>
        <Tree items={toc} active={active}/>
      </aside>

      <div class="main">
        <h1 ref={headline} class="art-title">{meta ? meta.title : slug}</h1>
        {meta?.description && <p class="art-dek">{meta.description}</p>}
        <div class="art-main">
          {error && <p class="status">Couldn&rsquo;t load this essay: <code>{error}</code>.</p>}
          {!error && !html && <p class="status">Loading…</p>}
          {html && (
            <div ref={body} class="article-body" dangerouslySetInnerHTML={{ __html: html }}/>
          )}
          {html && <Pager newer={articles[index - 1]} older={index < 0 ? null : articles[index + 1]}/>}
        </div>
      </div>
    </article>
  );
}

export { Article };
