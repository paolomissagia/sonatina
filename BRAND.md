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
- **No em dashes** (the long dash) anywhere. Use a hyphen with spaces ( - ) or rewrite the sentence.
- **Catalogue numbers:** Op. 67, BWV 1007, K. 626.
- **Quotes:** only quotes with a known source. If a quote is commonly misattributed, leave it out.
- **Periods:** Baroque, Classical, Romantic, Modern. Use one label per work and composer; cross-period figures get a note in their overview, not a combined label.

## Colour

The palette is "concert hall": warm, toasted paper and brown-black ink for reading, framed by a dark sidebar and home hero, as if the house lights were down. Every colour in the CSS is one of these tokens, defined in `src/index.css` as `R G B` triplets so it can take an alpha: `rgb(var(--ink) / 0.5)`. Never add a raw colour.

| Token | Hex | Use |
| --- | --- | --- |
| `--ivory` | `#f6efe2` | Cards and surfaces; text on Ink buttons |
| `--parchment` | `#ebe1cf` | Page background, detail heroes |
| `--linen` | `#e0d3bc` | Hover fills, quiet panels |
| `--rule` | `#d5c7ae` | Borders and dividers |
| `--rule-strong` | `#bba98a` | Hover borders |
| `--ink` | `#2a2017` | Text, primary buttons |
| `--ink-soft` | `#463a2d` | Body copy |
| `--umber` | `#6b5c48` | Secondary text, captions |
| `--gilt` | `#85561a` | Accent on paper: italic emphasis, links, markers. AA on Ivory and Parchment |
| `--gilt-light` | `#a57b42` | Decorative only (arrows, numerals); not for text |
| `--shadow` | `#3b2a17` | Soft shadows at 7–20% opacity |

The frame (the sidebar and the home hero):

| Token | Hex | Use |
| --- | --- | --- |
| `--frame` | `#241b13` | Sidebar |
| `--frame-deep` | `#1d1610` | Home hero and its overlay |
| `--frame-rule` | `#3a2e22` | Borders on the frame |
| `--frame-ink` | `#f3e9d6` | Logo, headline and active links on the frame |
| `--frame-muted` | `#cdbfa6` | Links and copy on the frame |
| `--frame-gilt` | `#d8a75e` | Accent on the frame: headline emphasis, active marker, hero button |

Colours drawn over images use `--scrim`, `--on-image` and `--on-image-soft`.

**One identity, no theme switching.** Sonatina is always the concert hall; we don't offer a dark mode, so the brand looks the same everywhere.

## Type

- **Headings:** EB Garamond (`--font-display`, self-hosted via `@fontsource-variable/eb-garamond`), set large with tight tracking. It shares its letterforms with the wordmark. The emphasised word is italic and gilt: "Discover the world of *classical music.*"
- **Body and UI:** Geist (`--font-body`, via `@fontsource-variable/geist`), heavy weights (600–780) for labels.

## Imagery

- **Composers:** public-domain historical portraits only, from Wikimedia Commons or museum collections. Never AI-generated likenesses of real people.
  - Crop to a square head-and-shoulders frame, with the face about 40% from the top, so 16:9 cards don't cut it off.
  - Every image carries a short credit (title, artist, year) shown as a pill on the image, linking to its source. Public-domain images need no attribution, so we don't name the archive.
  - Keep the original paintings and photographs; don't colourise or sepia-tone them.
- **Works:** one cover per category, never per work, so the catalogue reads as one collection. Every cover is a warm 18th–19th-century oil painting of that kind of music being made:

  | Category | Cover |
  | --- | --- |
  | Symphonies | Degas, *The Orchestra at the Opera* (c. 1870) |
  | Concertos | Menzel, *Flute Concert of Frederick the Great at Sanssouci* (1850–52) |
  | Orchestral | Manet, *Music in the Tuileries* (1862) |
  | Piano | Renoir, *Young Girls at the Piano* (1892) |
  | Chamber | Winternitz, *The String Quartet* (1899) |
  | Choral | Webster, *A Village Choir* (1847) |
  | Opera | Renoir, *La Loge* (1874) |
  | Ballet | Degas, *The Dance Foyer at the Opera* (1872) |

  No manuscripts, posters, prints or photographs as work images: mixing media is what makes a grid look inconsistent.
- **Scenes** (home hero, About): paintings in the same vein, such as Klimt and Menzel.
- **Everything is public domain and credited.** No AI-generated imagery anywhere on the site.
- **Format:** WebP, at most about 1600 px wide (portraits 1200 px square), quality about 75–80.

## Signature elements

- **Italic gilt emphasis** on the key word of a headline.
- **The dark frame**: an ink sidebar and a home hero where the painting glows through a deep overlay and the headline's emphasis is gilt.
- **Image heroes that fade into parchment** on detail pages, with the copy on the left and the picture on the right.
- **Roman-numeral movement lists**: I. Allegro con brio · *The four-note motif*.
- **Breadcrumbs** with a `›` separator.
- **Soft cards**: 8 px radius, a 1 px Rule border, warm shadow.

## Logo

- Wordmark: "Sonatina" in a high-contrast serif, with the S-and-treble-clef monogram. It is an inline SVG (`src/components/logo.tsx`) drawn in `currentColor`.
- Favicon: the monogram in Ivory on an Ink tile with rounded corners (`public/favicon.svg`, plus a 192 px PNG for touch icons). It reads on light and dark browser tabs alike.
