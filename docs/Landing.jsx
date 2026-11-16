// Landing.jsx — homepage: who I am, recent writing, work history.

import { EntryList, ME, Pixel } from './Components.jsx';

function Portrait() {
  return (
    <img class="portrait" src="assets/portrait-320.webp"
         srcset="assets/portrait-320.webp 320w, assets/portrait-400.webp 400w, assets/portrait-640.webp 640w"
         sizes="(max-width: 820px) 104px, 200px"
         width="200" height="250" decoding="async" alt={ME.name}/>
  );
}

function WorkLine({ when, role, where, note }) {
  return (
    <div class="work">
      <Pixel name="case"/>
      <span class="work-when">{when}</span>
      <div>
        <div class="work-role">{role} <span class="work-where">· {where}</span></div>
        <p class="work-note">{note}</p>
      </div>
    </div>
  );
}

function Landing({ articles }) {
  return (
    <div class="cols page">
      <aside class="side side-home">
        <div>
          <h1 class="page-title">{ME.name}</h1>
          <p class="lede">{ME.role} at {ME.company}.</p>
        </div>
        <Portrait/>
      </aside>

      <div class="main">
        <section>
          <h2 class="label">About</h2>
          <p class="bio">
            I build <em class="serif">agentic systems</em> for complex problems. Right now
            that&rsquo;s <em>Scout</em> — an agent at <strong>Bloom Growth</strong> people can
            delegate their work to, 24/7. Before agents, a few years on the data underneath:
            pipelines, models, and the decisions that run on top.
          </p>
          <a class="btn" href="#/contact">
            <span class="btn-dot" aria-hidden="true"/>Let&rsquo;s connect<span aria-hidden="true">→</span>
          </a>
        </section>

        <section>
          <div class="label-row">
            <h2 class="label">Recent writing</h2>
            {articles.length > 0 && (
              <a class="more" href="#/writing">All {articles.length} entries →</a>
            )}
          </div>
          <EntryList articles={articles.slice(0, 5)} featureFirst/>
        </section>

        <section>
          <h2 class="label">What I&rsquo;ve worked on</h2>
          <p class="note">
            Mostly behind the scenes — work for companies, not personal projects. Happy to talk
            about any of it.
          </p>
          <WorkLine when="2019 — now" role="Data Scientist & AI Engineer" where="Bloom Growth"
            note="Started in analytics and machine learning — pulling insight out of product data, unifying databanks across platforms. Grew into running the AI project cycle end-to-end and modernizing how we collect, store, and catalogue data. Most of my time now goes to Scout and the agent stack around it."/>
          <WorkLine when="2022" role="Customer Data Scientist" where="Deepnote · 4 mos"
            note="A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams."/>
        </section>
      </div>
    </div>
  );
}

export { Landing };
