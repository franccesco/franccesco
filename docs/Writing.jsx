// Writing.jsx — index of essays, three layouts (list / cards / dense).
// Articles come from the shared `articles` prop (loaded once in App).

import React from 'react';
import { EssayCard, EssayDense, EssayRow, MetaLabel, Page } from './Components.jsx';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function formatDateShort(iso) {
  if (!iso) return '';
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

function articleToEssay(a) {
  return {
    slug: a.slug,
    date: formatDateShort(a.date),
    title: a.title,
    dek: a.description,
    tags: [],
  };
}

function WritingContent({ mode, layout = 'dense', onSectionRef, sectionIdPrefix = '',
                          articles = [], onOpenArticle }) {
  const id = sectionIdPrefix + 'writing';
  const essays = React.useMemo(() => articles.map(articleToEssay), [articles]);

  return (
    <section id={id} ref={mode === 'single' ? (el) => onSectionRef?.('writing', el) : null}>
      <MetaLabel>Writing · {essays.length} essay{essays.length === 1 ? '' : 's'}</MetaLabel>
      <h1 style={{
        margin: '14px 0 24px',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.015em',
        fontWeight: 400,
      }}>
        Things I&rsquo;ve been thinking about.
      </h1>
      <p style={{ margin: '0 0 36px', fontSize: '16px', color: 'var(--fg-muted)',
                  lineHeight: 1.6, maxWidth: '58ch', textWrap: 'pretty' }}>
        Mostly notes on data, AI, and the engineering around both — written when something
        has been bothering me long enough that putting it down clears the desk.
      </p>

      {essays.length === 0 ? (
        <p style={{ color: 'var(--fg-muted)', marginTop: '24px' }}>
          Loading essays…
        </p>
      ) : layout === 'cards' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                       gap: '16px', marginTop: '12px' }}>
          {essays.map((e) => (
            <EssayCard key={e.slug} {...e} onOpen={() => onOpenArticle?.(e.slug)}/>
          ))}
        </div>
      ) : layout === 'dense' ? (
        <div style={{ marginTop: '12px' }}>
          {essays.map((e) => (
            <EssayDense key={e.slug} {...e} onOpen={() => onOpenArticle?.(e.slug)}/>
          ))}
          <div style={{ borderTop: '1px solid var(--divider)' }}/>
        </div>
      ) : (
        <div style={{ marginTop: '12px' }}>
          {essays.map((e) => (
            <EssayRow key={e.slug} {...e} onOpen={() => onOpenArticle?.(e.slug)}/>
          ))}
          <div style={{ borderTop: '1px solid var(--divider)' }}/>
        </div>
      )}
    </section>
  );
}

function Writing(props) {
  return (
    <Page theme={props.theme} route={props.route} onNavigate={props.onNavigate}
          monogram={props.monogram} screenLabel="02 Writing" mode={props.mode}
          activeSection={props.activeSection} onJump={props.onJump}
          fontWeight={props.fontWeight} measureCh={props.measureCh}
          onToggleTheme={props.onToggleTheme} themeChoice={props.themeChoice}>
      <WritingContent {...props}/>
    </Page>
  );
}

export { Writing, WritingContent };
