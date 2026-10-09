# Sonatina brand

**Personality: a warm, knowledgeable concert-hall guide.** Think of someone writing good programme notes: they know the music deeply and want you to enjoy it, not to pass a test. The look is quiet and elegant; the words are welcoming, accurate and plain.

## Name

- Always **Sonatina**, capital S. Never "SONATINA" or "sonatina" in running text.
- A sonatina is a short, approachable sonata: the first piece many players learn. That is the promise: a small, friendly way into classical music.
- The logo is the wordmark with an S-and-treble-clef monogram. The monogram on its own is the favicon and app icon.

Taglines: *Classical music belongs to everyone.* · *Discover the world of classical music.*

## Voice

| Do | Don't |
| --- | --- |
| Welcome people in: "Where should I start?", "Why listen?", "Start exploring" | Gatekeeping ("Any true music lover knows…") |
| Explain a term the first time it appears: "a concerto, a piece for soloist and orchestra" | Jargon without explanation ("the development recapitulates the exposition") |
| Be concrete: what to listen for, how long it lasts, where to start | Purple prose ("a transcendent sonic tapestry") |
| Be accurate and sourced: dates, premieres, catalogue numbers, credited images | Apocryphal quotes, invented anecdotes, guessed facts |
| Short sentences, warm and direct | Reverence or irony; music is to be enjoyed, not worshipped or sneered at |

### Content rules

- **Names keep their diacritics:** Antonín Dvořák, Köthen, Théâtre des Champs-Élysées.
- **Dates:** spans use an en dash: 1685–1750, c. 1720.
- **Catalogue numbers:** Op. 67, BWV 1007, K. 626.
- **Quotes:** only quotes with a known source. If a quote is commonly misattributed, leave it out.
- **Periods:** Baroque, Classical, Romantic, Modern. Use one label per work and composer; cross-period figures get a note in their overview, not a combined label.

## Colour

The palette is warm paper and ink with a single gilt accent, like a concert programme. Every colour in the CSS is one of these tokens, defined in `src/index.css` as `R G B` triplets so it can take an alpha: `rgb(var(--ink) / 0.5)`. Never add a raw colour.

| Token | Hex | Use |
| --- | --- | --- |
| `--ivory` | `#fffdf8` | Cards, sidebar, surfaces; text on Ink buttons |
| `--parchment` | `#f8f5ef` | Page background, detail heroes |
| `--linen` | `#efebe2` | Active navigation, hover fills |
| `--rule` | `#e2ddd3` | Borders and dividers |
| `--rule-strong` | `#ccc3b3` | Hover borders |
| `--ink` | `#1d1b18` | Text, primary buttons |
| `--ink-soft` | `#433c34` | Body copy |
| `--umber` | `#675f54` | Secondary text, captions |
| `--gilt` | `#8f6228` | Accent: italic emphasis, links, markers. AA on Ivory and Parchment |
| `--gilt-light` | `#b18c52` | Decorative only (arrows, numerals); not for text |
| `--shadow` | `#342719` | Soft shadows at 7–14% opacity |

Colours drawn over images use `--scrim`, `--on-image` and `--on-image-soft`.

**One identity, no theme switching.** Sonatina is always warm paper and ink; we don't offer a dark mode, so the brand looks the same everywhere.

## Type

- **Headings:** EB Garamond (`--font-display`, self-hosted via `@fontsource-variable/eb-garamond`), set large with tight tracking. It shares its letterforms with the wordmark. The emphasised word is italic and gilt: "Discover the world of *classical music.*"
- **Body and UI:** Geist (`--font-body`, via `@fontsource-variable/geist`), heavy weights (600–780) for labels.

## Imagery

- **Composers:** public-domain historical portraits only, from Wikimedia Commons or museum collections. Never AI-generated likenesses of real people.
  - Crop to a square head-and-shoulders frame, with the face about 40% from the top, so 16:9 cards don't cut it off.
  - Every image carries a credit (title, artist, year and a source link), shown as a pill on the image.
  - Keep the original paintings and photographs; don't colourise or sepia-tone them.
- **Works:** prefer the artefact itself: an autograph manuscript, a first-edition title page, the premiere venue or production. Otherwise use a period painting with a real link to the piece (Canaletto's Venice for *The Four Seasons*, Watteau's fêtes galantes for *Clair de lune*).
- **Scenes** (concerts, halls, instruments): 18th–19th-century paintings and prints, such as Menzel, Renoir, Degas and Klimt.
- **Everything is public domain and credited.** No AI-generated imagery anywhere on the site.
- **Format:** WebP, at most about 1600 px wide (portraits 1200 px square), quality about 75–80.

## Signature elements

- **Italic gilt emphasis** on the key word of a headline.
- **Image heroes that fade into parchment**, with the copy on the left and the picture on the right.
- **Roman-numeral movement lists**: I. Allegro con brio · *The four-note motif*.
- **Breadcrumbs** with a `›` separator.
- **Soft cards**: 8 px radius, a 1 px Rule border, warm shadow.

## Logo

- Wordmark: "Sonatina" in a high-contrast serif, with the S-and-treble-clef monogram. It is an inline SVG (`src/components/logo.tsx`) drawn in `currentColor`.
- Favicon: the monogram in Ivory on an Ink tile with rounded corners (`public/favicon.svg`, plus a 192 px PNG for touch icons). It reads on light and dark browser tabs alike.
