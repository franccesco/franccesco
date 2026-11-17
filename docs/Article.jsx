// Article.jsx — markdown article reader with a contents tree.
// Markdown parsing, sanitizing, and highlighting are loaded only on article routes.

import { useEffect, useRef, useState } from 'preact/hooks';
import { articleHref, formatDate, Key, Pixel } from './Components.jsx';

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
        <a href={articleHref(newer.slug)}>
          <span class="pager-dir"><Key>[</Key> Newer</span>
          <span>{newer.title}</span>
        </a>
      ) : <span/>}
      {older ? (
        <a class="pager-next" href={articleHref(older.slug)}>
          <span class="pager-dir">Older <Key>]</Key></span>
          <span>{older.title}</span>
        </a>
      ) : <span/>}
    </nav>
  );
}

function Article({ slug, articles }) {
  const [html, setHtml] = useState(null);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [active, setActive] = useState('');
  const [docked, setDocked] = useState(false);
  const body = useRef(null);
  const headline = useRef(null);
  const enhance = useRef(null);

  const index = articles.findIndex((a) => a.slug === slug);
  const meta = articles[index];

  useEffect(() => {
    let cancelled = false;
    setHtml(null);
    setError(null);
    setToc([]);
    Promise.all([
      fetch(`articles/${slug}.md`)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`)))),
      import('./markdown.js'),
    ])
      .then(async ([md, markdown]) => {
        const rendered = await markdown.render(md);
        if (cancelled) return;
        enhance.current = markdown.enhance;
        setHtml(rendered);
      })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [slug]);

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
    const stopClips = enhance.current?.(body.current);
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
        <a class="back" href="#/writing">← ../writing</a>
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
                <dd><a href={`#/writing?topic=${meta.topic}`}>{meta.topic}</a></dd>
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
