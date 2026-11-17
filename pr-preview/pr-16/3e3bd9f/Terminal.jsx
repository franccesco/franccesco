// Terminal.jsx — the one-line prompt fixed to the bottom of the viewport.
// At rest it shows the current path, reading progress, profile links (except on
// the homepage, where the contact pane has them), and the theme switch.
// Commands mostly navigate the page; only a few print output above the line.

import { useEffect, useRef, useState } from 'preact/hooks';
import { articleHref, ME, Pixel, SOCIALS, THEMES, TOPICS } from './Components.jsx';

const HELP = [
  '# keys',
  ['h  w  c', 'home, writing, contact'],
  ['j  k', 'next / previous entry; scrolls inside an article'],
  ['enter', 'open the selected entry'],
  ['[  ]', 'newer / older article'],
  ['g  G', 'top / bottom of the page'],
  ['t', 'next theme'],
  ['/', 'focus this prompt'],
  ['esc', 'leave the prompt'],
  '# commands',
  ['ls [topic]', `list writing: ${TOPICS.join(', ')}`],
  ['grep <text>', 'search titles and descriptions'],
  ['open <slug>', 'open an article'],
  ['tab', 'complete from the options listed as you type'],
  ['cd <path>', 'cd writing, cd contact, cd .., cd ~'],
  ['theme [name]', THEMES.join(', ')],
  ['next, prev', 'older / newer article'],
  ['whoami, email', 'who runs this site, and how to reach them'],
  ['top, clear', 'scroll to top, clear this output'],
];

// Each command receives (argument, context) and returns output lines, or nothing.
const COMMANDS = {
  help: () => HELP,
  ls: (arg, { go }) => {
    if (arg && !TOPICS.includes(arg)) return [`ls: no topic "${arg}". Topics: ${TOPICS.join(', ')}.`];
    return go(arg ? `#/writing?topic=${arg}` : '#/writing');
  },
  grep: (arg, { go }) => (arg
    ? go(`#/writing?q=${encodeURIComponent(arg)}`)
    : ['usage: grep <text>']),
  open: (arg, { go, articles }) => {
    if (!arg) return ['usage: open <slug>'];
    const needle = arg.toLowerCase();
    const exact = articles.find((a) => a.slug === needle);
    const hits = exact ? [exact] : articles.filter((a) =>
      a.slug.includes(needle) || a.title.toLowerCase().includes(needle));
    if (hits.length === 0) return [`open: nothing matches "${arg}"`];
    return go(hits.length === 1 ? articleHref(hits[0].slug) : `#/writing?q=${encodeURIComponent(arg)}`);
  },
  cd: (arg, ctx) => {
    const path = arg.replace(/^(~|\.)?\/+/, '').replace(/\/+$/, '');
    if (!path || path === '~') return ctx.go('#/');
    if (path === '..') return ctx.go(ctx.loc.route === 'article' ? '#/writing' : '#/');
    if (path === 'writing' || path === 'contact') return ctx.go(`#/${path}`);
    const slug = path.replace(/^writing\//, '');
    if (ctx.articles.some((a) => a.slug === slug)) return ctx.go(articleHref(slug));
    return [`cd: no such path: ${arg}`];
  },
  theme: (arg, { theme, setTheme }) => {
    if (arg && !THEMES.includes(arg)) return [`theme: choose one of ${THEMES.join(', ')}`];
    const next = arg || THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
    return [`theme: ${next}`];
  },
  next: (arg, { step }) => step(1),
  prev: (arg, { step }) => step(-1),
  top: () => window.scrollTo({ top: 0 }),
  home: (arg, { go }) => go('#/'),
  writing: (arg, { go }) => go('#/writing'),
  contact: (arg, { go }) => go('#/contact'),
  pwd: (arg, { path }) => [path],
  whoami: () => [
    `${ME.name} — ${ME.role} at ${ME.company}.`,
    'You are guest. Type contact to change that.',
    `© ${new Date().getFullYear()} ${ME.name}`,
  ],
  email: () => [{ text: ME.email, href: `mailto:${ME.email}` }],
  clear: () => undefined,
};
COMMANDS.cat = COMMANDS.open;

function completions(command, { articles }) {
  const slugs = articles.map((a) => a.slug);
  if (command === 'ls') return TOPICS;
  if (command === 'theme') return THEMES;
  if (command === 'open' || command === 'cat') return slugs;
  if (command === 'cd') return ['writing', 'contact', '..', '~', ...slugs.map((s) => `writing/${s}`)];
  return [];
}

// What the text typed so far could complete to: command names for the first
// word, then that command's arguments. `head` is the text before the word
// being completed.
function matches(value, context) {
  const [, slash, command, space, arg] = /^(\/?)(\S*)(\s+)?(.*)$/.exec(value);
  const typingCommand = space === undefined;
  const pool = typingCommand ? Object.keys(COMMANDS) : completions(command, context);
  const prefix = typingCommand ? command : arg;
  return {
    typingCommand,
    prefix,
    head: typingCommand ? slash : `${slash}${command} `,
    hits: pool.filter((word) => word.startsWith(prefix)),
  };
}

// Touch-only devices have no keyboard to press "/" or esc on.
const TOUCH = Boolean(window.matchMedia?.('(hover: none) and (pointer: coarse)').matches);
const PLACEHOLDER = TOUCH
  ? ['tap to type a command', 'type a command, or help for the list']
  : ['press / to type a command', 'type a command, or press esc for single-key shortcuts'];

function commonPrefix(words) {
  let prefix = words[0];
  for (const word of words) {
    while (!word.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

function pathFor(loc) {
  if (loc.route === 'home') return '~';
  if (loc.route === 'article') return `~/writing/${loc.slug}`;
  return `~/${loc.route}`;
}

function Line({ line }) {
  if (Array.isArray(line)) {
    return <div class="term-pair"><span>{line[0]}</span><span>{line[1]}</span></div>;
  }
  if (line.href) return <div><a href={line.href}>{line.text}</a></div>;
  if (line.startsWith('# ')) return <div class="term-head">{line.slice(2)}</div>;
  return <div>{line}</div>;
}

function Terminal({ loc, articles, theme, setTheme, go, step, api }) {
  const [value, setValue] = useState('');
  const [output, setOutput] = useState(null);
  const [echo, setEcho] = useState('');
  const [progress, setProgress] = useState(0);
  const [focused, setFocused] = useState(false);
  const root = useRef(null);
  const input = useRef(null);
  const history = useRef([]);
  const cursor = useRef(0);
  const mounted = useRef(false);
  const escaped = useRef(false);

  const path = pathFor(loc);
  // On the homepage the line spans the full width like the panes above it, and
  // the profile links are left out because the contact pane lists them.
  const home = loc.route === 'home';
  const context = { loc, articles, theme, setTheme, go, step, path };

  const run = (raw) => {
    const line = raw.trim().replace(/^\//, '');
    if (!line) return setOutput(null);
    const [name, ...rest] = line.split(/\s+/);
    const command = COMMANDS[name.toLowerCase()];
    const result = command
      ? command(rest.join(' '), context)
      : [`command not found: ${name}. Type help for the list.`];
    setOutput(Array.isArray(result) ? result : null);
    return undefined;
  };

  // The page calls these: `/` focuses the prompt, `?` prints help.
  api.current = {
    focus: (prefill = '') => {
      setValue(prefill);
      input.current?.focus();
    },
    run: (line) => {
      run(line);
      input.current?.focus();
    },
  };

  // The prompt is focused on load and again after every navigation, until the
  // visitor leaves it with esc; focusing it again by any means resumes this.
  // Touch devices are excluded: focusing there would open the on-screen
  // keyboard over the page.
  const autofocus = () => {
    if (escaped.current) return;
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
      input.current?.focus({ preventScroll: true });
    }
  };

  // Navigation closes the output and briefly shows the equivalent command.
  useEffect(() => {
    autofocus();
    if (!mounted.current) {
      mounted.current = true;
      return undefined;
    }
    setOutput(null);
    setEcho(`cd ${path}`);
    const timer = setTimeout(() => setEcho(''), 1800);
    return () => clearTimeout(timer);
  }, [path]);

  // Reading progress, tracked only while an article is open.
  useEffect(() => {
    if (loc.route !== 'article') {
      setProgress(0);
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? Math.min(100, Math.round((window.scrollY / range) * 100)) : 0);
    };
    const onScroll = () => { frame ||= requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [loc.route, loc.slug]);

  // A click or tap outside the terminal closes the output.
  useEffect(() => {
    if (!output) return undefined;
    const onPointer = (event) => {
      if (!root.current?.contains(event.target)) setOutput(null);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [output]);

  // While the prompt holds text, every completion for it is listed above the
  // line, in place of any command output. Nothing is listed once the word is
  // already complete.
  const match = focused && value ? matches(value, context) : null;
  const hints = match && !(match.hits.length === 1 && match.hits[0] === match.prefix)
    ? match.hits : [];
  const shown = hints.length > 0 ? hints : output;

  // Tab fills in the only match, or as much as all the matches share.
  const complete = () => {
    const { hits, head, typingCommand } = matches(value, context);
    if (hits.length === 0) return;
    setValue(hits.length === 1
      ? `${head}${hits[0]}${typingCommand ? ' ' : ''}`
      : head + commonPrefix(hits));
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      escaped.current = true;
      setOutput(null);
      setValue('');
      input.current.blur();
    } else if (event.key === 'Tab' && value) {
      event.preventDefault();
      complete();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const lines = history.current;
      cursor.current = Math.max(0, Math.min(lines.length, cursor.current + (event.key === 'ArrowUp' ? -1 : 1)));
      setValue(lines[cursor.current] || '');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) history.current.push(value.trim());
    cursor.current = history.current.length;
    setValue('');
    run(value);
  };

  return (
    <div class={home ? 'term term-home' : 'term'} ref={root}>
      {loc.route === 'article' && <span class="term-progress" style={{ width: `${progress}%` }}/>}
      <div class={home ? 'term-wrap' : 'shell term-wrap'}>
        {shown && (
          <div class="term-out" role="status">
            {shown.map((line, n) => <Line key={n} line={line}/>)}
          </div>
        )}
        <form class="term-line" onSubmit={onSubmit}>
          <label class="term-ps" for="term-input">
            <span class="term-user">guest@{ME.host}:</span>
            <span class="term-path">{path}</span>
            <span>$</span>
          </label>
          <input id="term-input" ref={input} type="text" value={value}
                 onInput={(event) => {
                   setValue(event.currentTarget.value);
                   setOutput(null);
                 }}
                 onKeyDown={onKeyDown}
                 onFocus={() => { escaped.current = false; setFocused(true); }}
                 onBlur={() => setFocused(false)}
                 placeholder={echo || PLACEHOLDER[focused ? 1 : 0]}
                 aria-label="Terminal command"
                 autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck={false}/>
          {loc.route === 'article' && (
            <span class="term-pct" aria-label="Reading progress">
              {String(progress).padStart(2, '0')}%
            </span>
          )}
          {!home && (
            <span class="term-links">
              {SOCIALS.map(([icon, label, href]) => (
                <a key={icon} href={href} aria-label={label} title={label}
                   target={href.startsWith('http') ? '_blank' : undefined}
                   rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <Pixel name={icon} size={12}/>
                </a>
              ))}
            </span>
          )}
          <span class="term-themes" role="group" aria-label="Theme">
            {THEMES.map((name) => (
              <button key={name} type="button" class={`sw sw-${name}`}
                      aria-pressed={name === theme} aria-label={`${name} theme`}
                      title={`${name} theme`} onClick={() => setTheme(name)}/>
            ))}
          </span>
          <button type="button" class="term-help" aria-label="Keys and commands"
                  onClick={() => (output ? setOutput(null) : setOutput(HELP))}>[?]</button>
        </form>
      </div>
    </div>
  );
}

export { Terminal };
