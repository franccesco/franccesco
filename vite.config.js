import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const entry = resolve(import.meta.dirname, 'docs/main.jsx');

export default defineConfig({
  root: 'docs',
  // Relative, so the lazy article chunk resolves next to app.js wherever the site is served.
  base: './',
  oxc: {
    jsx: {
      importSource: 'preact',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  resolve: {
    alias: [
      {
        find: '/build/app.js',
        replacement: entry,
      },
    ],
  },
  // The dev server still starts from index.html.
  optimizeDeps: {
    entries: ['index.html'],
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: false,
    // index.html is written by hand and loads build/app.js directly, so the
    // bundle is built from the script entry. (Library mode would leave the
    // output unminified.)
    modulePreload: false,
    rollupOptions: {
      input: entry,
      output: {
        entryFileNames: 'app.js',
        // No hash: index.html preloads chunks/markdown.js by name on article pages.
        chunkFileNames: 'chunks/[name].js',
      },
    },
  },
});
