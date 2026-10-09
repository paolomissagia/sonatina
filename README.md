# Sonatina

A friendly guide to classical music: browse works, composers, and listening guides, with curated picks and cross-linked recommendations.

## Stack

- React 19 + TypeScript, built with Vite 8
- React Router 8 (declarative `BrowserRouter` routes in `src/App.tsx`)
- Hand-written CSS in `src/App.css`; Tailwind 4 + shadcn are installed and wired into `src/index.css` for new UI
- pnpm (version pinned via `packageManager` in `package.json`), Node 24+

## Getting started

```sh
corepack enable   # once, so the pinned pnpm version is used
pnpm install
pnpm dev          # http://localhost:5173
```

Other scripts:

| Command        | What it does                         |
| -------------- | ------------------------------------ |
| `pnpm build`   | Type-check (`tsc -b`) and build to `dist/` |
| `pnpm preview` | Serve the production build locally   |
| `pnpm lint`    | Run ESLint                           |

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
  data/             Static catalog content and lookup helpers
  assets/           WebP artwork; catalog-assets.ts maps asset keys to imports
```

Catalog content lives in `src/data/*.ts`. Records reference artwork by key (see `CatalogAssetKey`), and works reference composers by `composerId`.

### Adding artwork

Add images as WebP (max ~1600px wide, quality ~78), then register the import in `src/assets/catalog-assets.ts`.
