import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-markdown.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-ruby.js';
import 'prismjs/components/prism-toml.js';
import 'prismjs/components/prism-yaml.js';

marked.setOptions({
  gfm: true,
});

function render(markdown) {
  return DOMPurify.sanitize(marked.parse(markdown), {
    USE_PROFILES: { html: true },
  });
}

function highlight(container) {
  Prism.highlightAllUnder(container);
}

export { highlight, render };
