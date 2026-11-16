// Contact.jsx — Francesco's channels.

import { useState } from 'preact/hooks';
import { ME, Pixel } from './Components.jsx';

function ContactRow({ icon, label, value, href, copyable = false }) {
  const [copied, setCopied] = useState(false);
  const external = href.startsWith('http');
  const onCopy = () => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div class="crow">
      <Pixel name={icon}/>
      <span class="crow-label">{label}</span>
      <a href={href} target={external ? '_blank' : undefined}
         rel={external ? 'noopener noreferrer' : undefined}>
        {value}{external && ' ↗'}
      </a>
      {copyable && (
        <button type="button" class="copy" onClick={onCopy} aria-label={`Copy ${label}`}>
          {copied ? 'copied' : 'copy'}
        </button>
      )}
    </div>
  );
}

function Contact() {
  return (
    <div class="cols page">
      <aside class="side">
        <h1 class="page-title">Say hi.</h1>
        <p class="lede">
          Easiest way to reach me is email — I usually reply within a day or two.
        </p>
      </aside>

      <div class="main">
        <section>
          <h2 class="label">Channels</h2>
          <div class="crows">
            <ContactRow icon="mail" label="Email" value={ME.email}
                        href={`mailto:${ME.email}`} copyable/>
            <ContactRow icon="git" label="GitHub" value={ME.github}
                        href={`https://${ME.github}`}/>
            <ContactRow icon="linkedin" label="LinkedIn" value={ME.linkedin}
                        href={`https://${ME.linkedin}`}/>
            <ContactRow icon="x" label="Twitter / X" value={ME.twitter}
                        href={`https://twitter.com/${ME.twitter.replace('@', '')}`}/>
          </div>
        </section>

        <section class="avail">
          <span class="avail-dot" aria-hidden="true"/>
          <div>
            <p>
              <strong>At Bloom Growth full-time.</strong>{' '}
              Not looking for new roles — but always open to a conversation about <em>Scout</em>,
              agent design, evals, or the data underneath any of it.
            </p>
            <p class="stamp">Last updated · May 2026</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export { Contact };
