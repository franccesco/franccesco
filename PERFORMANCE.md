# Performance benchmark

This benchmark tracks the production homepage at `https://thatai.dev/`. Measurements are taken only after the corresponding `main` commit has finished deploying through GitHub Pages.

## Production results

| State | Deployed commit | Cold LCP samples | Median LCP | CLS | Homepage requests | App JavaScript (gzip) | Third-party transfer |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Legacy CDN/Babel baseline | pre-build | 8.140 s | 8.140 s | 0.00 | 19 | CDN/Babel runtime | 792.2 kB |
| Package-managed Vite build | `8032e1c` | 3.119 s | 3.119 s | 0.00 | 11 | 77.34 kB | 69.4 kB |
| Local fonts and responsive images | `6702e37` | 3.420 / 3.264 / 3.262 s | 3.264 s | 0.00 | 10 | 77.43 kB | 0 kB |
| Preact-compatible runtime | `f568074` | 2.457 / 2.470 / 2.449 s | **2.457 s** | **0.00** | **9** | **20.91 kB** | **0 kB** |

The final result reduces cold synthetic LCP by **69.8%** from the 8.14 s baseline and remains below the 2.5 s "good" threshold under this profile. The final three samples vary by only 21 ms.

The baseline and first build were recorded as single samples. Later iterations use the median of three cold samples, so treat small cross-row differences as directional rather than statistical proof.

## Reproduction profile

- Chrome DevTools Performance trace against production.
- Mobile viewport: 390 × 844 CSS pixels, device pixel ratio 2, mobile and touch enabled.
- Network: Slow 4G.
- CPU: 4× slowdown.
- Color scheme: dark.
- Cache: disabled for each measured reload.
- Completion marker: the homepage hero's `Let’s connect` control is present before stopping the trace.

Chrome reports no CrUX field dataset for this hostname yet, so these are controlled lab measurements rather than real-user percentiles.

## Mobile audit of every page type

The table above tracks the deployed homepage. This audit covers the other pages too, before and after the mobile pass, measured against a local static server with compression, since the change was not deployed yet when it was taken.

| Page | LCP before | LCP after | CLS before | CLS after |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 2.93 s | **1.77 s** | 0.00 | 0.00 |
| Article with images and videos (`how-to-use-a-progress-bar-in-python`) | 3.11 s | **1.95 s** | 0.162 | **0.00** |
| Article with images (`how-to-send-a-tweet-with-python-using-tweepy`) | 3.13 s | **1.89 s** | 0.084 | **0.00** |

Each figure is the median of three Lighthouse 13 mobile runs with applied throttling (`--throttling-method=devtools`: Slow 4G, 4× CPU slowdown). Lighthouse's accessibility, best-practices, and SEO scores were already 100 and still are.

What moved the numbers:

- The page used to fade in from `opacity: 0`. Chrome does not count content painted at zero opacity, so first paint and LCP were only recorded at the next repaint, up to a second later. The fade is gone.
- `index.html` starts the downloads the first screen needs while the app script is still loading: the list of articles on every page, the portrait on the homepage, and the article text plus its renderer on an article page.
- The app draws once the list of articles has arrived, so an article's title, facts, and summary no longer appear late and push the text down.
- Article images and videos carry their pixel size, so the text below them holds its place while they load.

Not measured here: articles whose lead photo is hotlinked from Unsplash. Those photos have no known size until they load, so they can still shift the text below them.

## Regression guardrails

Run the same checks used by CI:

```sh
npm ci
npm audit --omit=dev
npm run check
```

`npm run check` rebuilds the GitHub Pages artifact and enforces these budgets:

- `docs/build/app.js`: at most 25 KiB gzip.
- `docs/assets/portrait-400.webp`: at most 25 KiB.

CI also fails when the committed `docs/build/` artifact differs from a clean build. Dependabot proposes grouped dependency updates.

## Remaining hosting constraint

GitHub Pages currently returns a 600-second cache lifetime for static assets. Chrome flags this for repeat visits, but estimated zero LCP savings from it in the cold-load trace. The remaining stylesheet is render-blocking, also with estimated zero LCP savings; changing either would require a different hosting/cache strategy or a deliberately duplicated critical-style path.
