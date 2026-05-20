// Components.jsx — shared atoms for Francesco's personal site.
// Tokens come from colors_and_type.css; nothing hardcodes color.

const { useState, useEffect, useRef } = React;

// Identity — change once, used everywhere.
const ME = {
  name: 'Francesco Orozco',
  initial: 'f',
  initials: 'FO',
  role: 'AI Engineer & Data Scientist',
  company: 'Bloom Growth',
  email: 'franccesco@thatai.dev',
  github: 'github.com/franccesco',
  twitter: '@__franccesco',
  linkedin: 'linkedin.com/in/franccesco',
};

// ─────────────────────────────────────────────────────────────────
// Icon — sparse, currentColor, 1.5px stroke.
// ─────────────────────────────────────────────────────────────────
const ICON_PATHS = {
  'arrow-up-right': (<><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>),
  'arrow-right':    (<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>),
  'rss':            (<><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5.5" cy="18.5" r="1"/></>),
  'mail':           (<><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></>),
  'github':         (<path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.5 1.6 5.5 1.9 5.5 1.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 8.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V22"/>),
  'twitter':        (<path d="M17.5 3h3l-7 8 8.5 10h-6.5l-5-6.5L4 21H1l7.5-9L0 3h6.6l4.5 6L17.5 3z"/>),
  'linkedin':       (<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 11v6"/></>),
  'check':          (<path d="m4 12 5 5L20 6"/>),
  'copy':           (<><rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></>),
  'sun':            (<><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></>),
  'moon':           (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>),
  'monitor':        (<><rect x="2.5" y="4" width="19" height="13" rx="1.5"/><path d="M9 21h6M12 17v4"/></>),
};

function Icon({ name, size = 16, style }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
         style={{ display: 'inline-block', verticalAlign: '-0.18em', flexShrink: 0, ...style }}>
      {path}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Monogram — four variants. The accent appears here (the only place
// on the landing chrome by default, per the brief).
// ─────────────────────────────────────────────────────────────────
function Monogram({ variant = 'dot', letter = ME.initial, initials = ME.initials, size = 28 }) {
  // Variants:
  //   dot       — italic letter + small accent dot   (default)
  //   plain     — italic letter, no dot
  //   initials  — italic "FO" stacked with a small accent dot between
  //   bracket   — [ italic letter ] in mono, no dot — quietly technical
  //   underline — italic letter on top of a short accent bar
  if (variant === 'plain') {
    return (
      <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                     fontSize: `${size}px`, letterSpacing: '-0.02em',
                     color: 'var(--fg)', lineHeight: 1 }}>
        {letter}
      </span>
    );
  }
  if (variant === 'initials') {
    const dot = Math.max(4, Math.round(size * 0.14));
    return (
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: `${Math.round(size * 0.08)}px`,
                     color: 'var(--fg)', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                       fontSize: `${size}px`, letterSpacing: '-0.04em' }}>
          {initials[0]}
        </span>
        <span aria-hidden="true"
              style={{ width: `${dot}px`, height: `${dot}px`, borderRadius: '50%',
                       background: 'var(--accent)',
                       transform: `translateY(-${Math.round(size * 0.04)}px)` }}/>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                       fontSize: `${size}px`, letterSpacing: '-0.04em' }}>
          {initials[1]}
        </span>
      </span>
    );
  }
  if (variant === 'bracket') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '2px',
                     color: 'var(--fg)', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: `${Math.round(size * 0.78)}px`,
                       color: 'var(--fg-subtle)' }}>[</span>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                       fontSize: `${size}px`, letterSpacing: '-0.02em' }}>{letter}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: `${Math.round(size * 0.78)}px`,
                       color: 'var(--fg-subtle)' }}>]</span>
      </span>
    );
  }
  if (variant === 'underline') {
    return (
      <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start',
                     gap: `${Math.max(2, Math.round(size * 0.08))}px`, lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                       fontSize: `${size}px`, letterSpacing: '-0.02em', color: 'var(--fg)' }}>
          {letter}
        </span>
        <span aria-hidden="true"
              style={{ width: `${Math.round(size * 0.55)}px`, height: '2px',
                       background: 'var(--accent)' }}/>
      </span>
    );
  }
  // default = "dot"
  const dotSize = Math.max(5, Math.round(size * 0.18));
  const gap = Math.max(3, Math.round(size * 0.12));
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: `${gap}px`,
                   color: 'var(--fg)', lineHeight: 1 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                     fontSize: `${size}px`, letterSpacing: '-0.02em' }}>
        {letter}
      </span>
      <span aria-hidden="true"
            style={{ width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: '50%',
                     background: 'var(--accent)',
                     transform: `translateY(-${Math.round(size * 0.06)}px)` }}/>
    </span>
  );
}

function NavMark({ variant = 'dot', size = 22 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px' }}>
      <Monogram variant={variant} size={size}/>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px',
                     fontWeight: 500, letterSpacing: '-0.005em',
                     color: 'var(--fg)' }}>
        {ME.name}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// MetaLabel — small mono uppercase eyebrow.
// ─────────────────────────────────────────────────────────────────
function MetaLabel({ children, accent = false, style }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: accent ? 'var(--accent)' : 'var(--fg-subtle)',
      ...style,
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────────
// Tag — pill chip.
// ─────────────────────────────────────────────────────────────────
function Tag({ children, active = false, onClick }) {
  const interactive = typeof onClick === 'function';
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: '999px',
        border: '1px solid',
        borderColor: active ? 'var(--fg)' : 'var(--divider-strong)',
        background: active ? 'var(--fg)' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--fg-muted)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'all 200ms var(--ease)',
      }}>
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// TextLink — restrained underline + highlighter bar on hover.
// ─────────────────────────────────────────────────────────────────
function TextLink({ href = '#', onClick, external = false, children, accentRest = false }) {
  const [hover, setHover] = useState(false);
  const on = hover || accentRest;
  return (
    <a href={href} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(e); } }}
       target={external ? '_blank' : undefined}
       rel={external ? 'noopener noreferrer' : undefined}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{
         color: 'var(--fg)',
         textDecoration: 'underline',
         textDecorationColor: 'var(--divider-strong)',
         textUnderlineOffset: '3px',
         textDecorationThickness: '1px',
         backgroundImage: 'linear-gradient(var(--accent-soft), var(--accent-soft))',
         backgroundRepeat: 'no-repeat',
         backgroundSize: on ? '100% 100%' : '0% 100%',
         backgroundPosition: '0 0',
         padding: '1px 3px',
         margin: '-1px -3px',
         transition: 'background-size 280ms var(--ease)',
         display: 'inline-flex', alignItems: 'baseline', gap: '4px',
       }}>
      {children}
      {external && <Icon name="arrow-up-right" size={13} style={{ opacity: 0.6 }}/>}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// ThemeToggle — cycles paper → midnight → system → paper.
// `choice` is the raw user pick (what's persisted in tweaks);
// `effective` is what's actually on screen, used as a hint for
// the system-state icon overlay.
// ─────────────────────────────────────────────────────────────────
function ThemeToggle({ choice = 'paper', effective = 'paper', onToggle }) {
  const [hover, setHover] = useState(false);
  const next =
    choice === 'paper'    ? 'midnight' :
    choice === 'midnight' ? 'system'   : 'paper';
  const label =
    choice === 'paper'    ? 'Switch to dark theme'    :
    choice === 'midnight' ? 'Switch to system theme'  :
                            'Switch to light theme';
  const iconName =
    choice === 'system'   ? 'monitor' :
    choice === 'midnight' ? 'moon'    : 'sun';
  return (
    <button type="button" aria-label={label} title={label}
            data-theme-choice={choice}
            data-theme-next={next}
            onClick={onToggle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '30px', height: '30px',
              padding: 0,
              background: 'transparent',
              border: '1px solid',
              borderColor: hover ? 'var(--divider-strong)' : 'var(--divider)',
              borderRadius: '999px',
              color: hover ? 'var(--fg)' : 'var(--fg-muted)',
              cursor: 'pointer',
              transition: 'color 200ms var(--ease), border-color 200ms var(--ease)',
            }}>
      <Icon name={iconName} size={14}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Nav — top bar (multi-page mode).
// ─────────────────────────────────────────────────────────────────
function Nav({ route, onNavigate, monogram = 'dot', effectiveTheme, themeChoice, onToggleTheme }) {
  const items = [
    { key: 'home',    label: 'Home' },
    { key: 'writing', label: 'Writing' },
    { key: 'contact', label: 'Contact' },
  ];
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '28px 0 24px',
      borderBottom: '1px solid var(--divider)',
      marginBottom: '64px',
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
         style={{ textDecoration: 'none', display: 'inline-flex' }}>
        <NavMark variant={monogram} size={22}/>
      </a>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {items.map((it) => {
          const active = route === it.key;
          return (
            <a key={it.key} href="#"
               onClick={(e) => { e.preventDefault(); onNavigate(it.key); }}
               style={{
                 fontFamily: 'var(--font-body)',
                 fontSize: '14.5px',
                 color: active ? 'var(--fg)' : 'var(--fg-muted)',
                 textDecoration: 'none',
                 paddingBottom: '4px',
                 borderBottom: active ? '1px solid var(--accent)' : '1px solid transparent',
                 transition: 'color 200ms var(--ease), border-color 200ms var(--ease)',
               }}
               onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--fg)'; }}
               onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--fg-muted)'; }}>
              {it.label}
            </a>
          );
        })}
        {onToggleTheme && (
          <ThemeToggle choice={themeChoice} effective={effectiveTheme} onToggle={onToggleTheme}/>
        )}
      </div>
    </nav>
  );
}

// SingleNav — used in single-page mode. Section jumps instead of routes.
function SingleNav({ activeSection, onJump, monogram = 'dot', effectiveTheme, themeChoice, onToggleTheme }) {
  const items = [
    { key: 'top',     label: 'Top' },
    { key: 'writing', label: 'Writing' },
    { key: 'contact', label: 'Contact' },
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 0 18px',
      background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--divider)',
      marginBottom: '56px',
    }}>
      <a href="#top" onClick={(e) => { e.preventDefault(); onJump('top'); }}
         style={{ textDecoration: 'none', display: 'inline-flex' }}>
        <NavMark variant={monogram} size={22}/>
      </a>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {items.map((it) => {
          const active = activeSection === it.key;
          return (
            <a key={it.key} href={`#${it.key}`}
               onClick={(e) => { e.preventDefault(); onJump(it.key); }}
               style={{
                 fontFamily: 'var(--font-body)',
                 fontSize: '14px',
                 color: active ? 'var(--fg)' : 'var(--fg-muted)',
                 textDecoration: 'none',
                 transition: 'color 200ms var(--ease)',
               }}
               onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--fg)'; }}
               onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--fg-muted)'; }}>
              {it.label}
            </a>
          );
        })}
        {onToggleTheme && (
          <ThemeToggle choice={themeChoice} effective={effectiveTheme} onToggle={onToggleTheme}/>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page — outer chrome.
// ─────────────────────────────────────────────────────────────────
function Page({ theme = 'paper', route, onNavigate, monogram = 'dot',
                children, screenLabel, mode = 'multi',
                activeSection, onJump, fontWeight = 400, measureCh = 62,
                onToggleTheme, themeChoice }) {
  return (
    <div data-theme={theme === 'paper' ? undefined : theme}
         data-screen-label={screenLabel}
         className="ds-root"
         style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)',
                  fontFamily: 'var(--font-body)',
                  // Custom property reach: child sections that opt in via
                  // `maxWidth: 'var(--reading-measure)'` get the live tweak.
                  '--reading-measure': `${measureCh}ch`,
                  '--body-weight': fontWeight }}>
      <div style={{ maxWidth: '720px', margin: '0 auto',
                    padding: '0 clamp(20px, 4vw, 40px) 96px',
                    position: 'relative' }}>
        {mode === 'single'
          ? <SingleNav activeSection={activeSection} onJump={onJump} monogram={monogram}
                       effectiveTheme={theme} themeChoice={themeChoice} onToggleTheme={onToggleTheme}/>
          : <Nav route={route} onNavigate={onNavigate} monogram={monogram}
                 effectiveTheme={theme} themeChoice={themeChoice} onToggleTheme={onToggleTheme}/>}
        {children}
        <Footer mode={mode}/>
      </div>
    </div>
  );
}

function Footer({ mode }) {
  return (
    <footer style={{
      marginTop: '128px',
      paddingTop: '28px',
      borderTop: '1px solid var(--divider)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '12px',
    }}>
      <MetaLabel>© 2026 · {ME.name}</MetaLabel>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: 'var(--fg-muted)' }}>
        <a href={`mailto:${ME.email}`} style={{ color: 'inherit' }} aria-label="Email"><Icon name="mail" size={15}/></a>
        <a href={`https://${ME.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }} aria-label="GitHub"><Icon name="github" size={15}/></a>
        <a href={`https://${ME.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }} aria-label="LinkedIn"><Icon name="linkedin" size={15}/></a>
        <a href={`https://twitter.com/${ME.twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }} aria-label="Twitter"><Icon name="twitter" size={15}/></a>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
// Essay items — three layouts (list / cards / dense)
// ─────────────────────────────────────────────────────────────────
function EssayRow({ date, title, dek, tags = [], onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '110px 1fr',
        gap: '24px',
        padding: '22px 0',
        borderTop: '1px solid var(--divider)',
        cursor: onOpen ? 'pointer' : 'default',
      }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px',
                    color: 'var(--fg-subtle)', letterSpacing: '0.04em',
                    paddingTop: '4px' }}>{date}</div>
      <div>
        <h3 style={{
          margin: '0 0 6px',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '19px',
          color: 'var(--fg)',
          textDecoration: 'underline',
          textDecorationColor: hover ? 'var(--accent)' : 'transparent',
          textUnderlineOffset: '3px',
          transition: 'all 200ms var(--ease)',
        }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--fg-muted)',
                    lineHeight: 1.55, maxWidth: '58ch', textWrap: 'pretty' }}>{dek}</p>
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </article>
  );
}

function EssayCard({ date, title, dek, tags = [], onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '20px 22px',
        border: '1px solid var(--divider)',
        borderRadius: '8px',
        background: hover ? 'var(--bg-elev)' : 'transparent',
        boxShadow: hover ? 'var(--shadow-card)' : 'none',
        cursor: onOpen ? 'pointer' : 'default',
        transition: 'background 200ms var(--ease), box-shadow 200ms var(--ease)',
        display: 'flex', flexDirection: 'column', gap: '10px',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px',
                       color: 'var(--fg-subtle)', letterSpacing: '0.05em',
                       textTransform: 'uppercase' }}>{date}</span>
        {tags.length > 0 && (
          <>
            <span style={{ color: 'var(--fg-subtle)' }}>·</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px',
                           color: 'var(--fg-subtle)', letterSpacing: '0.05em',
                           textTransform: 'uppercase' }}>{tags.join(' · ')}</span>
          </>
        )}
      </div>
      <h3 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
        color: 'var(--fg)',
        textDecoration: 'underline',
        textDecorationColor: hover ? 'var(--accent)' : 'transparent',
        textUnderlineOffset: '4px',
        transition: 'text-decoration-color 200ms var(--ease)',
      }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--fg-muted)',
                  lineHeight: 1.6, textWrap: 'pretty' }}>{dek}</p>
    </article>
  );
}

function EssayDense({ date, title, tags = [], onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); if (onOpen) onOpen(); }}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{
        display: 'grid',
        gridTemplateColumns: '88px 1fr auto',
        gap: '20px',
        alignItems: 'baseline',
        padding: '10px 0',
        borderTop: '1px solid var(--divider)',
        color: 'var(--fg)',
        textDecoration: 'none',
      }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px',
                     color: 'var(--fg-subtle)', letterSpacing: '0.04em' }}>{date}</span>
      <span style={{
        fontSize: '15.5px', fontWeight: 400, color: 'var(--fg)',
        // Highlighter pull on hover, matches the link hover language.
        backgroundImage: 'linear-gradient(var(--accent-soft), var(--accent-soft))',
        backgroundRepeat: 'no-repeat',
        backgroundSize: hover ? '100% 100%' : '0% 100%',
        backgroundPosition: '0 0',
        padding: '1px 3px',
        margin: '-1px -3px',
        transition: 'background-size 280ms var(--ease)',
      }}>{title}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px',
                     color: 'var(--fg-subtle)', letterSpacing: '0.05em',
                     textTransform: 'uppercase' }}>{tags[0] || ''}</span>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// WorkLine — quiet line item for work history.
// ─────────────────────────────────────────────────────────────────
function WorkLine({ when, role, where, note }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '24px',
                  padding: '14px 0', borderTop: '1px solid var(--divider)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px',
                    color: 'var(--fg-subtle)', letterSpacing: '0.04em', paddingTop: '3px' }}>
        {when}
      </div>
      <div>
        <div style={{ fontSize: '15.5px', color: 'var(--fg)' }}>
          <span style={{ fontWeight: 500 }}>{role}</span>
          {where && <span style={{ color: 'var(--fg-muted)' }}> · {where}</span>}
        </div>
        {note && (
          <div style={{ marginTop: '4px', fontSize: '14px', color: 'var(--fg-muted)',
                        lineHeight: 1.5, maxWidth: '52ch' }}>{note}</div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ContactRow — channel row for the contact card.
// ─────────────────────────────────────────────────────────────────
function ContactRow({ icon, label, value, href, copyable = false }) {
  const [copied, setCopied] = useState(false);
  const onCopy = (e) => {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '20px 96px 1fr auto', alignItems: 'center',
      gap: '16px', padding: '14px 0', borderTop: '1px solid var(--divider)',
      color: 'var(--fg)',
    }}>
      <span style={{ color: 'var(--fg-muted)' }}><Icon name={icon} size={16}/></span>
      <MetaLabel>{label}</MetaLabel>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px' }}>
        {href ? <TextLink href={href} external={/^https?:/.test(href)}>{value}</TextLink> : value}
      </span>
      {copyable && (
        <button onClick={onCopy} aria-label={`Copy ${label}`}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: copied ? 'var(--accent)' : 'var(--fg-subtle)',
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '4px 8px', borderRadius: '4px',
                  transition: 'color 200ms var(--ease)',
                }}>
          <Icon name={copied ? 'check' : 'copy'} size={13}/>
          {copied ? 'copied' : 'copy'}
        </button>
      )}
    </div>
  );
}

// Expose atoms globally so each <script type="text/babel"> view file sees them.
Object.assign(window, {
  ME,
  Icon, Monogram, NavMark, MetaLabel, Tag, TextLink, ThemeToggle,
  Nav, SingleNav, Page, Footer,
  EssayRow, EssayCard, EssayDense, WorkLine, ContactRow,
});
