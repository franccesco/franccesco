// Landing.jsx — homepage: five tiled panes that fill one screen on a desktop.
// Portrait and about share the top left, work sits under them, and writing and
// contact share the right column.

import { EntryList, Key, ME, Pixel, SOCIALS } from './Components.jsx';

// Pane — one tile: a title bar with an optional item at its right end, then the content.
// `active` marks the pane the j / k keys act on.
function Pane({ name, label, meta, active = false, children }) {
  return (
    <section class={`pane pane-${name}${active ? ' pane-on' : ''}`} aria-label={label}>
      <div class="pane-head">
        <span class="pane-name">{name}</span>
        {meta}
      </div>
      <div class="pane-body">{children}</div>
    </section>
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

function Landing({ articles }) {
  return (
    <div class="panes">
      <div class="panes-left">
        <div class="panes-top">
          <Pane name="portrait" label="Portrait">
            <img class="photo" src="assets/portrait-400.webp"
                 srcset="assets/portrait-320.webp 320w, assets/portrait-400.webp 400w, assets/portrait-640.webp 640w, assets/portrait-800.webp 800w"
                 sizes="(max-width: 600px) 100vw, (max-width: 820px) 40vw, 384px"
                 width="400" height="500" decoding="async" alt={ME.name}/>
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
            <Job when="2022" role="Customer Data Scientist" where="Deepnote · 4 mos"
              note="A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams."/>
          </div>
        </Pane>
      </div>

      <div class="panes-right">
        <Pane name="writing" label="Recent writing" active
              meta={articles.length > 0 && (
                <a class="more" href="#/writing">All {articles.length} entries →</a>
              )}>
          <EntryList articles={articles.slice(0, 5)} featureFirst/>
        </Pane>

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
