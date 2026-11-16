// Terminal.jsx — the one-line prompt fixed to the bottom of the viewport.
// At rest it shows the current path, reading progress, and the theme switch.
// Commands mostly navigate the page; only a few print output above the line.

import { useEffect, useRef, useState } from 'preact/hooks';
import { articleHref, ME, THEMES, TOPICS } from './Components.jsx';

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
  ['open <slug>', 'open an article; tab completes'],
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
  const root = useRef(null);
  const input = useRef(null);
  const history = useRef([]);
  const cursor = useRef(0);
  const mounted = useRef(false);

  const path = pathFor(loc);
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
    if (!Array.isArray(result)) input.current?.blur();
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

  // Navigation closes the output and briefly shows the equivalent command.
  useEffect(() => {
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

  const complete = () => {
    const match = /^(\/?)(\S*)(\s+)?(.*)$/.exec(value);
    const [, slash, command, space, arg] = match;
    const typingCommand = space === undefined;
    const pool = typingCommand ? Object.keys(COMMANDS) : completions(command, context);
    const prefix = typingCommand ? command : arg;
    const head = typingCommand ? slash : `${slash}${command} `;
    const hits = pool.filter((word) => word.startsWith(prefix));
    if (hits.length === 0) return;
    if (hits.length === 1) {
      setValue(`${head}${hits[0]}${typingCommand ? ' ' : ''}`);
      setOutput(null);
    } else {
      setValue(head + commonPrefix(hits));
      setOutput(hits.slice(0, 12).concat(hits.length > 12 ? [`… ${hits.length - 12} more`] : []));
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
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
    <div class="term" ref={root}>
      {loc.route === 'article' && <span class="term-progress" style={{ width: `${progress}%` }}/>}
      <div class="shell term-wrap">
        {output && (
          <div class="term-out" role="status">
            {output.map((line, n) => <Line key={n} line={line}/>)}
          </div>
        )}
        <form class="term-line" onSubmit={onSubmit}>
          <label class="term-ps" for="term-input">
            <span class="term-user">guest@{ME.host}:</span>
            <span class="term-path">{path}</span>
            <span>$</span>
          </label>
          <input id="term-input" ref={input} type="text" value={value}
                 onInput={(event) => setValue(event.currentTarget.value)}
                 onKeyDown={onKeyDown}
                 placeholder={echo || 'press / to type a command'}
                 aria-label="Terminal command"
                 autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck={false}/>
          {loc.route === 'article' && (
            <span class="term-pct" aria-label="Reading progress">
              {String(progress).padStart(2, '0')}%
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
