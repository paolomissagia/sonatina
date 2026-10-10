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

### Adding recordings

Works have a player. Recordings stream straight from **Wikimedia Commons** or the **Internet Archive** (we never host audio) and live in `src/data/recordings.ts`, keyed by work id, with each track mapped to one of the work's movements. Long stage works (operas, ballets) map their arias or excerpts onto the right act.

Avoid computer renderings of the score (MIDI, "sequenced", Mutopia) and spoken introductions. For a Commons file, look up its MP3 stream with:

```sh
node scripts/add-recording.mjs "File:<Commons audio file>" […]
```

For the Internet Archive, the stream is `https://archive.org/download/<identifier>/<file>` and the page is `https://archive.org/details/<identifier>`. Credit the performer; add the licence and its link when the source states a Creative Commons one. Tests check every track points at a real movement and a Commons or Archive MP3.
