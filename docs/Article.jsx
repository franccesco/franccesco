// Article.jsx — markdown article reader.
// Fetches docs/articles/<slug>.md, renders via window.marked, highlights via window.Prism.

function ArticleContent({ slug, articles, onNavigate }) {
  const [html, setHtml] = React.useState(null);
  const [error, setError] = React.useState(null);
  const containerRef = React.useRef(null);
  const meta = (articles || []).find((a) => a.slug === slug);

  React.useEffect(() => {
    let cancelled = false;
    setHtml(null);
    setError(null);
    fetch(`articles/${slug}.md`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((md) => {
        if (cancelled) return;
        const rendered = window.marked ? window.marked.parse(md) : `<pre>${md}</pre>`;
        setHtml(rendered);
      })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [slug]);

  React.useEffect(() => {
    if (html && window.Prism && containerRef.current) {
      window.Prism.highlightAllUnder(containerRef.current);
    }
    if (html) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [html]);

  const formattedDate = React.useMemo(() => {
    if (!meta?.date) return '';
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(meta.date);
    if (!m) return meta.date;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${months[parseInt(m[2], 10) - 1]} ${parseInt(m[3], 10)}, ${m[1]}`;
  }, [meta?.date]);

  return (
    <article>
      <a href="#/writing" onClick={(e) => { e.preventDefault(); onNavigate('writing'); }}
         style={{
           display: 'inline-flex', alignItems: 'center', gap: '6px',
           fontFamily: 'var(--font-mono)', fontSize: '12px',
           letterSpacing: '0.04em', textTransform: 'uppercase',
           color: 'var(--fg-muted)', textDecoration: 'none',
           marginBottom: '32px',
         }}>
        ← All writing
      </a>

      {meta ? (
        <>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: 'var(--fg-subtle)', letterSpacing: '0.06em',
                        textTransform: 'uppercase', marginBottom: '12px' }}>
            {formattedDate}
          </div>
          <h1 style={{
            margin: '0 0 18px',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            fontWeight: 400,
            textWrap: 'balance',
          }}>
            {meta.title}
          </h1>
          {meta.description && (
            <p style={{ margin: '0 0 40px', fontSize: '17px', color: 'var(--fg-muted)',
                        lineHeight: 1.55, maxWidth: '60ch', textWrap: 'pretty' }}>
              {meta.description}
            </p>
          )}
        </>
      ) : (
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
          {slug}
        </h1>
      )}

      {error && (
        <p style={{ color: 'var(--fg-muted)' }}>
          Couldn&rsquo;t load this essay: <code>{error}</code>.
        </p>
      )}
      {!error && !html && (
        <p style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)',
                    fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Loading…
        </p>
      )}
      {html && (
        <div ref={containerRef}
             className="article-body"
             dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </article>
  );
}

function Article(props) {
  return (
    <Page theme={props.theme} route="writing" onNavigate={props.onNavigate}
          monogram={props.monogram} screenLabel={`Article · ${props.slug}`} mode="multi"
          fontWeight={props.fontWeight} measureCh={props.measureCh}
          onToggleTheme={props.onToggleTheme} themeChoice={props.themeChoice}>
      <ArticleContent {...props} />
    </Page>
  );
}

window.Article = Article;
window.ArticleContent = ArticleContent;
