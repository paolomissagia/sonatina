# Sonatina brand

**Personality: a warm, knowledgeable concert-hall guide.** Think of someone writing good programme notes: they know the music deeply and want you to enjoy it, not to pass a test. The look is quiet and elegant; the words are welcoming, accurate and plain.

> Draft. Sections marked **Proposed** describe where we want to go, not what ships today.

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
- **Catalogue numbers:** Op. 67, BWV 1007, K. 626, with a non-breaking space between the prefix and the number.
- **Quotes:** only quotes with a known source. If a quote is commonly misattributed, leave it out.
- **Periods:** Baroque, Classical, Romantic, Modern. Use one label per work and composer; cross-period figures get a note in their overview, not a combined label.

## Colour

The palette is warm paper and ink with a single gilt accent, like a concert programme.

| Token | Hex | Use |
| --- | --- | --- |
| Ivory | `#fffdf8` | Cards, sidebar, surfaces; text on dark buttons |
| Parchment | `#f8f5ef` | Page background, detail heroes |
| Linen | `#efebe2` | Active navigation, hover fills |
| Rule | `#e2ddd3` | Borders and dividers |
| Ink | `#1d1b18` | Text, primary buttons |
| Umber | `#675f54` | Secondary text, captions |
| Gilt | `#8f6228` | Accent: italic emphasis words, links, markers. Passes AA on Ivory |
| Gilt light | `#b18c52` | Decorative only (arrows, numerals); not for body text |
| Shadow | `#342719` | Soft warm shadows at 7–14% opacity, never grey or black |

**Proposed:** turn these into `:root` tokens in `src/index.css`, and fold the ~80 near-duplicate colours in `App.css` into them.

**Proposed dark mode, "the hall after dark":** background `#16130f`, surfaces `#201c17`, text `#f4efe6`, secondary text `#b3a998`, gilt `#c9924a`. Images stay as they are.

## Type

- **Headings:** a classical serif, set large with tight tracking. The emphasised word is italic and gilt: "Discover the world of *classical music.*"
- **Body and UI:** Geist (variable, self-hosted via `@fontsource-variable/geist`), heavy weights (600–780) for labels.

**Proposed:** headings currently use Georgia, which renders differently on every OS and doesn't match the wordmark. Replace it with a self-hosted serif closer to the wordmark (for example Cormorant Garamond or EB Garamond).

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
- **Roman-numeral movement lists**: I. Allegro con brio · *Intensity*.
- **Breadcrumbs** with a `›` separator.
- **Soft cards**: 8 px radius, a 1 px Rule border, warm shadow.

## Logo

- Wordmark: "Sonatina" in a high-contrast serif, with the S-and-treble-clef monogram.
- **Proposed:** redraw it as SVG. The current PNG has its background baked in, so it can't sit on dark surfaces. The favicon needs a light-on-dark or gilt version of the monogram to read at 16 px.
