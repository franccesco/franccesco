// Landing.jsx — Francesco's homepage.
// Three intro treatments via the `intro` prop: compact / expansive / pullquote.

import React from 'react';
import { EssayRow, Icon, MetaLabel, Page, WorkLine } from './Components.jsx';

// LandingContent — the sections inside the page chrome. Reused by single-page mode.
function LandingContent({ intro = 'compact', mode, onNavigate, onJump, onOpenArticle,
  fontWeight = 400, measureCh = 62, onSectionRef,
  includeRecentWriting = true, articles = [] }) {
  const goWriting = () => mode === 'single' ? onJump('writing') : onNavigate('writing');
  const goContact = () => mode === 'single' ? onJump('contact') : onNavigate('contact');
  const recent = React.useMemo(() => {
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const fmt = (iso) => {
      const m = iso && /^(\d{4})-(\d{2})/.exec(iso);
      return m ? `${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}` : (iso || '');
    };
    return (articles || []).slice(0, 3).map((a) => ({
      slug: a.slug, date: fmt(a.date), title: a.title, dek: a.description, tags: [],
    }));
  }, [articles]);

  return (
    <>
      <section id="top" ref={mode === 'single' ? (el) => onSectionRef?.('top', el) : null}>
        {intro === 'pullquote' ? <HeroPullquote animateKey={intro} onConnect={goContact} /> :
        intro === 'expansive' ? <HeroExpansive animateKey={intro} weight={fontWeight} measure={measureCh} onConnect={goContact} /> :
        <HeroCompact animateKey={intro} weight={fontWeight} measure={measureCh} onConnect={goContact} />}
      </section>

      {/* ── What I've worked on ───────────────────────────── */}
      <section style={{ marginTop: '88px' }}>
        <MetaLabel>What I&rsquo;ve worked on</MetaLabel>
        <p style={{ margin: '14px 0 18px', fontSize: '14.5px', color: 'var(--fg-muted)',
          maxWidth: '56ch', lineHeight: 1.55 }}>
          Mostly behind the scenes — work for companies, not personal projects. Happy to talk
          about any of it.
        </p>
        <div>
          <WorkLine when="2019 — now" role="Data Scientist & AI Engineer" where="Bloom Growth"
          note="Started in analytics and machine learning — pulling insight out of product data, unifying databanks across platforms. Grew into running the AI project cycle end-to-end and modernizing how we collect, store, and catalogue data. Most of my time now goes to Scout and the agent stack around it." />
          <WorkLine when="2022" role="Customer Data Scientist" where="Deepnote · 4 mos"
          note="A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams." />
        </div>
      </section>

      {/* ── Recent writing ────────────────────────────────── */}
      {includeRecentWriting &&
      <section id="writing" ref={mode === 'single' ? (el) => onSectionRef?.('writing', el) : null}
      style={{ marginTop: '88px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: '8px' }}>
          <MetaLabel>Recent writing</MetaLabel>
          <a href="#" onClick={(e) => {e.preventDefault();goWriting();}}
          style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--fg-muted)',
            textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-muted)'}>
            {mode === 'single' ? 'All essays ↓' : 'All writing →'}
          </a>
        </div>
        <div>
          {recent.map((e) =>
          <EssayRow key={e.slug} {...e}
            onOpen={() => onOpenArticle ? onOpenArticle(e.slug) : goWriting()} />
          )}
          <div style={{ borderTop: '1px solid var(--divider)' }} />
        </div>
      </section>
      }
    </>);

}

// Landing — page-wrapped view (multi-page mode).
function Landing(props) {
  return (
    <Page theme={props.theme} route={props.route} onNavigate={props.onNavigate}
    monogram={props.monogram} screenLabel="01 Landing" mode={props.mode}
    activeSection={props.activeSection} onJump={props.onJump}
    fontWeight={props.fontWeight} measureCh={props.measureCh}
    onToggleTheme={props.onToggleTheme} themeChoice={props.themeChoice}>
      <LandingContent {...props} />
    </Page>);

}

// ── Hero variants ──────────────────────────────────────────────────────────

// LetsConnectCTA — soft pill button that closes the hero with an action.
// Picks up the same accent dot used elsewhere on landing chrome so it reads
// as "here, do this" rather than a generic button.
function LetsConnectCTA({ onConnect, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onConnect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        fontFamily: 'var(--font-body)',
        fontSize: '14.5px',
        fontWeight: 500,
        color: hover ? 'var(--accent)' : 'var(--fg)',
        background: 'transparent',
        border: '1px solid',
        borderColor: hover ? 'var(--accent)' : 'var(--divider-strong)',
        borderRadius: '999px',
        padding: '9px 18px 9px 14px',
        cursor: 'pointer',
        transition: 'color 200ms var(--ease), border-color 200ms var(--ease), transform 200ms var(--ease)',
        transform: hover ? 'translateX(2px)' : 'translateX(0)',
        ...style,
      }}>
      <span style={{ display: 'inline-block', width: '7px', height: '7px',
        borderRadius: '50%', background: 'var(--accent)' }} />
      Let&rsquo;s connect
      <Icon name="arrow-right" size={14} />
    </button>);

}

// Portrait — rectangular, gently rounded, sits to the left of the intro copy.
// Used by every hero variant so all three treatments share the same anchor.
function Portrait({ size = 'md' }) {
  const widths = { sm: 168, md: 200, lg: 220 };
  return (
    <div style={{
      width: widths[size],
      aspectRatio: '4 / 5',
      overflow: 'hidden',
      borderRadius: 'var(--r-3)',
      border: '1px solid var(--divider)',
      background: 'var(--bg-elev)',
      flexShrink: 0
    }}>
      <img src="assets/portrait-320.webp"
        srcSet="assets/portrait-320.webp 320w, assets/portrait-640.webp 640w"
        sizes={`${widths[size]}px`}
        width={widths[size]} height={Math.round(widths[size] * 1.25)}
        fetchPriority="high" decoding="async" alt="Francesco Orozco"
        style={{ width: '100%', height: '100%', objectFit: 'cover',
          display: 'block', filter: 'grayscale(1) contrast(1.02)' }} />
    </div>);

}

// HeroLayout — shared grid: portrait left, copy right; stacks on narrow widths.
// Owns the one-shot fade+rise entrance so React controls the inline style.
function HeroLayout({ animateKey, portraitSize = 'md', children }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    setShown(false);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true)));

    return () => cancelAnimationFrame(id);
  }, [animateKey]);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '32px',
      alignItems: 'start',
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 600ms var(--ease), transform 600ms var(--ease)'
    }}>
      <Portrait size={portraitSize} />
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>);

}

function HeroCompact({ animateKey, weight, measure, onConnect }) {
  return (
    <HeroLayout animateKey={animateKey}>
      <MetaLabel>AI Engineer &amp; Data Scientist · Bloom Growth</MetaLabel>
      <p style={{
        margin: '14px 0 14px',
        fontSize: '18px',
        lineHeight: 1.65,
        fontWeight: weight,
        color: 'var(--fg)',
        maxWidth: `${measure}ch`,
        textWrap: 'pretty'
      }}>
        I build <em style={{ fontFamily: 'var(--font-display)', fontSize: '20px',
          fontStyle: 'italic' }}>agentic systems</em>{' '}
        for complex problems. Right now that&rsquo;s <em style={{ fontStyle: 'italic' }}>Scout</em> —
        an agent at <strong style={{ fontWeight: 600 }}>Bloom Growth</strong> people can delegate
        their work to, 24/7. Before agents, a few years on the data underneath: pipelines, models,
        and the decisions that run on top.
      </p>
      <LetsConnectCTA onConnect={onConnect} style={{ marginTop: '4px' }} />
    </HeroLayout>);

}

function HeroExpansive({ animateKey, weight, measure, onConnect }) {
  return (
    <HeroLayout animateKey={animateKey} portraitSize="lg">
      <MetaLabel>AI Engineer &amp; Data Scientist · Bloom Growth</MetaLabel>
      <div style={{ maxWidth: `${measure}ch`, display: 'flex', flexDirection: 'column',
        gap: '14px', marginTop: '14px' }}>
        <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.65, fontWeight: weight,
          color: 'var(--fg)', textWrap: 'pretty' }}>
          I&rsquo;m an AI engineer and data scientist at{' '}
          <strong style={{ fontWeight: 600 }}>Bloom Growth</strong>, where I build{' '}
          <em style={{ fontFamily: 'var(--font-display)', fontSize: '20px',
            fontStyle: 'italic' }}>agentic systems</em> for complex problems —
          interactive experiences with AI that don&rsquo;t just answer, but get things done.
        </p>
        <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, fontWeight: weight,
          color: 'var(--fg-muted)', textWrap: 'pretty' }}>
          Right now most of my time goes to <em style={{ fontStyle: 'italic' }}>Scout</em> —
          a coworker people at the company can delegate work to, around the clock. The interesting
          questions sit between the demo and the deploy: where should the model ask, where should
          it commit, where should it just stop.
        </p>
        <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.65, fontWeight: weight,
          color: 'var(--fg-muted)', textWrap: 'pretty' }}>
          Before agents, a few years on data: pipelines, models, and the teams that operate them.
          Most of what I think about agents I learned from watching pipelines fail quietly.
        </p>
      </div>
      <LetsConnectCTA onConnect={onConnect} style={{ marginTop: '18px' }} />
    </HeroLayout>);

}

function HeroPullquote({ animateKey, onConnect }) {
  return (
    <HeroLayout animateKey={animateKey} portraitSize="md">
      <MetaLabel>AI Engineer &amp; Data Scientist · Bloom Growth</MetaLabel>
      <blockquote style={{
        margin: '14px 0 22px',
        padding: 0,
        borderLeft: '2px solid var(--accent)',
        paddingLeft: '18px'
      }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          color: 'var(--fg)',
          textWrap: 'balance'
        }}>
          I build agentic systems for complex problems —
          interactive experiences with AI, on top of the data
          that makes them honest.
        </p>
      </blockquote>
      <p style={{ margin: 0, fontSize: '16.5px', lineHeight: 1.65,
        color: 'var(--fg-muted)', textWrap: 'pretty' }}>
        Most of my time goes to <em style={{ fontStyle: 'italic' }}>Scout</em> — a coworker
        people at Bloom Growth can delegate work to, around the clock. Before agents, a few
        years on data: pipelines, models, decisions.
      </p>
      <LetsConnectCTA onConnect={onConnect} style={{ marginTop: '20px' }} />
    </HeroLayout>);

}

// ── Currently item ─────────────────────────────────────────────────────────
function CurrentlyItem({ label, body }) {
  return (
    <li style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px',
      alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '19px', color: 'var(--fg)' }}>{label}</span>
      <span style={{ fontSize: '15.5px', color: 'var(--fg-muted)', lineHeight: 1.6,
        textWrap: 'pretty' }}>{body}</span>
    </li>);

}

export { Landing, LandingContent };
