// Writing.jsx — index of articles, filtered by `?topic=` and `?q=` in the hash.

import { EntryList, Key, TOPICS } from './Components.jsx';

function Writing({ articles, loc, onSearch }) {
  const query = loc.q.toLowerCase();
  const list = articles.filter((a) =>
    (!loc.topic || a.topic === loc.topic)
    && (!query || `${a.title} ${a.description}`.toLowerCase().includes(query)));
  const filtered = Boolean(loc.topic || query);

  return (
    <div class="cols page">
      <aside class="side">
        <h1 class="page-title">Writing</h1>
        <p class="lede">
          Mostly notes on data, AI, and the engineering around both — written when something
          has been bothering me long enough that putting it down clears the desk.
        </p>
        {articles.length > 0 && (
          <p class="count">
            {filtered ? `${list.length} of ${articles.length}` : articles.length} entries
          </p>
        )}
      </aside>

      <div class="main">
        <nav class="tabs" aria-label="Topics">
          <a href="#/writing" class={loc.topic ? '' : 'on'}>All</a>
          {TOPICS.map((topic) => (
            <a key={topic} href={`#/writing?topic=${topic}`}
               class={loc.topic === topic ? 'on' : ''}>{topic}</a>
          ))}
          <button type="button" class="tabs-search" onClick={onSearch}>
            <Key>/</Key> Search
          </button>
        </nav>

        {query && (
          <p class="query">
            grep &ldquo;{loc.q}&rdquo; <a href={loc.topic ? `#/writing?topic=${loc.topic}` : '#/writing'}>clear</a>
          </p>
        )}

        {articles.length === 0
          ? <p class="status">Loading…</p>
          : list.length === 0
            ? <p class="status">No entries match.</p>
            : <EntryList articles={list} featureFirst={!filtered}/>}
      </div>
    </div>
  );
}

export { Writing };
