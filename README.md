# Sonatina

A friendly guide to classical music: browse works, composers by era and articles, play historical recordings of almost every work, or leave the radio on while you read.

Built with Expo (React Native), so one codebase runs on Android, iOS and the web. The website is live at https://www.sonatina.eu (deploys from `main`). Brand and voice: [BRAND.md](BRAND.md).

## Run it

```sh
npm install
npm start           # Expo dev server: press a for Android, i for iOS, w for web
npm run web         # web only
npm test            # catalogue, search, radio and translation tests (vitest)
npm run typecheck
npm run lint
npm run build:web   # static site in dist/ (what Vercel deploys)
```

To try it on a phone during development, install **Expo Go** and scan the QR code that `npm start` prints. Every library used is included in Expo Go.

With Docker, `docker compose up --build` serves the web version at http://localhost:8081.

## Phone builds (EAS)

Builds run in Expo's cloud, so neither Android Studio nor Xcode is needed:

```sh
npx eas-cli@latest login
npx eas-cli@latest init                                      # once: links the project and adds its id to app.json
npx eas-cli@latest build -p android --profile preview        # installable .apk for your own phone
npx eas-cli@latest build -p android --profile production     # .aab for Google Play
npx eas-cli@latest build -p ios --profile production         # for TestFlight and the App Store
npx eas-cli@latest submit -p android                         # or -p ios
```

The profiles are in `eas.json`. The app id is `com.paolomissagia.sonatina` on both platforms, set in `app.json`. Background audio is enabled there too (the `expo-audio` plugin and iOS `UIBackgroundModes`), so the radio keeps playing with the screen locked.

## How it's built

- Expo SDK 58, React Native, React 19, TypeScript
- Expo Router: screens are files in `src/app/`. Each section (Discover, Works, Composers, Articles, Radio, Search, About) is a tab, so it keeps its place while you browse the others; Works, Composers and Articles are stacks with their detail pages
- The frame: on wide windows (960 pt and up: desktop browsers, landscape tablets) the dark sidebar; on phones a tab bar with Discover, Works, Composers, Articles and Radio, and a header with Search and About. The player sits at the foot of both
- `expo-audio` for playback, `expo-image` for artwork, `expo-linear-gradient` for the image fades
- i18next for interface text in English, German, Spanish, French, Italian and Portuguese
- EB Garamond and Geist from `@expo-google-fonts`, bundled with the app
- Vitest for the plain TypeScript (data, search, radio, translations), ESLint (`eslint-config-expo`)

### Project layout

```
src/
  app/          Screens (Expo Router). _layout.tsx is the frame: sidebar, tabs, player
  components/   Shared UI: sidebar, tab bar, player bar, detail hero, cards, …
  ui/           Theme tokens (theme.ts), layout breakpoints, the base kit, icons
  models/       Domain types (Work, Composer, Article, …)
  data/         Static catalogue content, plus lookup, search, filter and
                recommendation helpers (tested in *.test.ts alongside)
  player/       Player provider and context, the lazily loaded recordings table,
                the radio's track picker
  state/        The language choice: saved on the device, applied without a reload
  locales/      Interface text, one JSON file per language
  assets/       WebP artwork; catalog-assets.ts maps asset keys to imports
assets/         App icon, adaptive icon, splash and favicon
```

`src/data`, `src/models`, `src/player/radio.ts` and `src/i18n.ts` are plain TypeScript with no React Native imports, so the tests run in Node.

Catalogue content lives in `src/data/*.ts`. Records reference artwork by key (see `CatalogAssetKey`), and works reference composers by `composerId`. Movements are listed by name only, with no notes.

- `works.ts`, `composers.ts`, `articles.ts`: the catalogue. An article's `workIds` must name existing works. Articles live at `/articles`; the old `/guides` links redirect there, and Guides is an article category.
- `eras.ts`: the Composers filter (`/composers?era=baroque`), built from the four periods. Each era links its period article and radio station.
- `recordings.ts`: the player's streams (see below).
- `stations.ts`: the radio stations, in three groups: main (Everything, Classical music, Opera, Ballet), eras, and countries derived from composers' nationalities (a country needs at least three works). Each is a filter over works, never a hand-picked list of work ids.

### Languages

Interface text lives in `src/locales/<language>.json`; to add a language, add its file, import it in `src/i18n.ts` and add its code and name to `locales` and `localeNames`. English (`en.json`) is the source, and `src/i18next.d.ts` types the keys, so a misspelled key or a missing `{{value}}` fails the type-check. A language without a translation for a key falls back to English. The catalogue itself (works, composers, articles) is English only for now.

- The app opens in the language picked before (saved with AsyncStorage, which is `localStorage` on the web under the website's old key), else the device's, else English. It is picked in the sidebar on wide windows and on the About screen on phones.
- Switching takes effect at once, without a reload. Labels that data modules build when they load (navigation, filters, stations) are getters that look the text up when read; `labels()` in `src/i18n.ts` makes them. Screens and the frame call `useLanguage()` so they re-render on a switch.
- The website used to put the language in the address (`/de/works`). Those links still work: `src/app/[locale]/` switches to that language and opens the page.

### Adding artwork

All imagery is public domain (see [BRAND.md](BRAND.md#imagery)). Works don't have their own images: each shows its category's cover (`genreCovers` in `src/data/works.ts`), so adding a work needs no art. Composer portraits and category covers are added with:

```sh
node scripts/add-image.mjs "File:<Commons file name>" src/assets/catalog/composer-<slug>.webp --portrait [--crop l,t,w,h] [--quality n]
```

The script refuses anything that isn't public domain or CC0, writes the WebP, and prints the credit entry. Register the import and the credit in `src/assets/catalog-assets.ts`. `--portrait` makes a square crop centred on the face; for a portrait where the face sits off-centre, pass `--crop` first. Tests fail if an image has no credit.

### Adding recordings

Works have a player. Recordings stream straight from the approved sources (we never host audio) and live in `src/data/recordings.ts`, keyed by work id, with each track mapped to one of the work's movements. Long stage works (operas, ballets) map their arias or excerpts onto the right act. Keep a movement's tracks next to each other: the radio plays one movement at a time. When one file holds a whole work, list a track per movement with the same `src` and give each its `start` and `end` in seconds; the player seeks within the file and plays straight on from one movement to the next.

The table loads in its own chunk on the web, and the player (`src/player/player-provider.tsx`, one `expo-audio` player) lives above the navigator, so playback carries on while you browse, with the screen locked or the app in the background. Only the current track ever loads; never prefetch audio.

Avoid computer renderings of the score (MIDI, "sequenced", Mutopia) and spoken introductions. For a Commons file, look up its MP3 stream with:

```sh
node scripts/add-recording.mjs "File:<Commons audio file>" […]
```

For the Internet Archive, the stream is `https://archive.org/download/<identifier>/<file>` and the page is `https://archive.org/details/<identifier>`. Credit the performer; add the licence and its link when the source states a Creative Commons one. Tests check every track points at a real movement and an MP3 from an approved source. [SOURCES.md](SOURCES.md) lists the approved and ruled-out sources, including Romanian Radio's archive and how to search it.
