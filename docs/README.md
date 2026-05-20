# About-me site

Source for the personal site at `franccesco.github.io/franccesco/`.

## Enable GitHub Pages

1. Push this branch to `origin/main`.
2. Repo **Settings → Pages**.
3. **Source**: Deploy from a branch.
4. **Branch**: `main`, **Folder**: `/docs`.
5. Save. First build takes ~1 min; URL appears in the same panel.

The site URL will be:

- `https://franccesco.github.io/franccesco/` — since this is the profile repo, Pages serves at the repo subpath.
- For a bare `https://franccesco.github.io`, move `docs/*` into a new repo named `franccesco.github.io` and serve from `/` on `main`.

## Editing

- Identity (name, email, handles): `Components.jsx`, top of file — the `ME` object.
- Essays index: `Writing.jsx` — the `ESSAYS` array. Hero "recent writing" pulls from `Landing.jsx`'s `RECENT` array.
- Work history: `Landing.jsx` — the `WorkLine` entries.
- Visual tokens (colors, type, spacing): `colors_and_type.css`.

## Notes

- Theme cycles light → dark → system via the nav button. Choice is persisted in `localStorage` under `fo:theme`. System follows `prefers-color-scheme`.
- Routing is hash-based (`#/writing`, `#/contact`) so deep links survive on Pages.
- `.nojekyll` keeps Pages from running Jekyll over the files.
- JSX is transpiled in-browser via `@babel/standalone` (same as the original design handoff). For faster cold loads later, swap to a pre-built bundle.
