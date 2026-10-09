# Sonatina

A friendly guide to classical music: browse works, composers, and listening guides, with curated picks and cross-linked recommendations.

Live at https://sonatina.vercel.app (deploys from `main`). Brand and voice: [BRAND.md](BRAND.md).

## Stack

- React 19 + TypeScript, built with Vite 8
- React Router 8 (declarative `BrowserRouter` routes in `src/App.tsx`)
- Plain CSS: `src/reset.css` (base reset), `src/index.css` (brand tokens, light and dark), `src/App.css` (components)
- EB Garamond and Geist, self-hosted via Fontsource
- Vitest for unit tests, oxlint for linting
- npm, Node 24+

## Getting started

```sh
npm install
npm run dev    # http://localhost:5173
npm test       # unit tests
```

Other scripts:

| Command           | What it does                               |
| ----------------- | ------------------------------------------ |
| `npm run build`   | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally         |
| `npm run lint`    | Run oxlint                                 |

### Docker

```sh
docker compose up --build
```

Then open http://localhost:5173. Source changes are mounted into the container and served by Vite's dev server.

## Project layout

```
src/
  App.tsx           App shell and routes
  pages/            One component per route
  components/       Shared UI (cards, detail hero, tabs, sidebar, …)
  models/           Domain types (Work, Composer, Guide, …)
  data/             Static catalog content, plus lookup, search, filter and
                    recommendation helpers (tested in *.test.ts alongside)
  assets/           WebP artwork; catalog-assets.ts maps asset keys to imports
```

Catalog content lives in `src/data/*.ts`. Records reference artwork by key (see `CatalogAssetKey`), and works reference composers by `composerId`.

### Adding artwork

All imagery is public domain (see [BRAND.md](BRAND.md#imagery)). Add images as WebP (max ~1600px wide, quality ~75), register the import in `src/assets/catalog-assets.ts`, and add its credit (title, artist, year, Wikimedia Commons source) to `assetCredits` there. Tests fail if an image has no credit.
