# Sonatina

A friendly guide to classical music: browse works, composers, and listening guides, with curated picks and cross-linked recommendations.

Live at https://sonatina.vercel.app (deploys from `main`). Brand and voice: [BRAND.md](BRAND.md).

## Stack

- React 19 + TypeScript, built with Vite 8
- React Router 8 (declarative `BrowserRouter` routes in `src/App.tsx`)
- Plain CSS: `src/reset.css` (base reset), `src/index.css` (brand tokens), `src/App.css` (components)
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

All imagery is public domain (see [BRAND.md](BRAND.md#imagery)). Works don't have their own images: each shows its category's cover (`genreCovers` in `src/data/works.ts`), so adding a work needs no art. Composer portraits and category covers are added with:

```sh
node scripts/add-image.mjs "File:<Commons file name>" src/assets/catalog/composer-<slug>.webp --portrait [--crop l,t,w,h] [--quality n]
```

The script refuses anything that isn't public domain or CC0, writes the WebP, and prints the credit entry. Register the import and the credit in `src/assets/catalog-assets.ts`. `--portrait` makes a square crop centred on the face; for a portrait where the face sits off-centre, pass `--crop` first. Tests fail if an image has no credit.
