import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'docs',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  resolve: {
    alias: [
      {
        find: '/build/app.js',
        replacement: resolve(import.meta.dirname, 'docs/main.jsx'),
      },
    ],
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: resolve(import.meta.dirname, 'docs/main.jsx'),
      formats: ['es'],
      fileName: () => 'app.js',
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
});
