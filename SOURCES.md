# Audio sources

Where Sonatina's recordings can come from, and why. The short rules live in [BRAND.md](BRAND.md#recordings); how to add a recording is in the [README](README.md#adding-recordings). Sources were last checked on 10 October 2026.

## The rule

A recording can be used when all four hold:

1. **Open:** public domain, CC0 or a Creative Commons licence. Fully copyrighted music is out, even when someone has uploaded it somewhere free to stream.
2. **Stable:** a library or archive that keeps its URLs, not a personal site or a file host.
3. **Credited:** the source names the performers, so we can check it's a real performance of the piece (no MIDI, remixes, arrangements or uploads credited only to a username).
4. **Streamable:** a direct audio file that plays in our `<audio>` element and supports range requests, so seeking works. We never host or proxy audio.

Being a non-profit hobby project doesn't change point 1: "free to stream" is not the same as licensed.

## In use

### Wikimedia Commons

Most of the catalogue. Public domain and Creative Commons files, with performer and licence on each file page. Look up a file's MP3 stream with `scripts/add-recording.mjs`.

### Internet Archive

Historic 78s (the Great 78 Project), composers' own recordings and full albums. Stream from `https://archive.org/download/<identifier>/<file>`; the page is `https://archive.org/details/<identifier>`. Check each item's licence, since the Archive also holds non-commercial and copyrighted uploads.

Collections on the Archive worth using more:

- **Musopen** (CC0): modern studio recordings. The [complete Chopin](https://archive.org/details/musopen-chopin), the [Kickstarter recordings](https://archive.org/details/MusopenKickstarterRecordings) (symphonies, concertos, chamber music), and the `musopen` collection (Beethoven 3, Mozart 40, Mendelssohn 3 and 4, Dvořák's American Quartet, Borodin quartets).
- **Kimiko Ishizaka** (CC0): modern piano recordings of the [Goldberg Variations](https://archive.org/details/OpenGoldbergVariations), the [Well-Tempered Clavier, Book 1](https://archive.org/details/bach-well-tempered-clavier-book-1) and [The Art of Fugue](https://archive.org/details/pandacd-715-js-bach-the-art-of-the-fugue-kunst-der-fuge-bwv-1080).

Avoid the frei² podcasts (non-commercial, no derivatives) and the Archive's mirrors of Jamendo uploads.

## Approved, not yet in use

### Romanian Radio archive

About 15,000 recordings from the Romanian Broadcasting Company's archive, licensed **CC BY-SA 4.0**: credit the performer and show the licence with its link. Mostly studio tapes from the 1960s to the 1980s, with named performers such as Radu Lupu, the National Radio Orchestra (Dvořák 8, Rachmaninoff's Second Piano Concerto) and the Camerata Regală (Death and the Maiden).

- **Find:** the Europeana search API (`api.europeana.eu/record/v2/search.json`), filtered to `TYPE:SOUND`, `DATA_PROVIDER:"Romanian Radio Broadcasting Company"` and `reusability=open`. The direct file is the record's `edmIsShownBy`.
- **Stream:** MP3s on `resource.culturalia.ro`, with range requests and CORS headers.
- **Care:** descriptions are often in Romanian or machine-translated, poetry readings and arrangements are mixed in, and many works are one long file rather than one file per movement. Check every item by hand.

Use the API only while curating; the site stores the file URLs and never calls Europeana. The `wskey=api2demo` key works for testing; register a free key for regular use. The tests currently allow only Commons and Archive URLs, so the first Romanian Radio recording needs that check widened.

## Ruled out

- **Gallica (French national library):** many 1950s LPs marked public domain, found through Europeana, but Cloudflare blocks requests, including from a real browser. Not reliable to stream.
- **Library of Congress National Jukebox:** streaming under a licence from Sony, not open.
- **UCSB cylinder archive:** non-commercial licence, and pre-1930 sound only. Possible later for early opera.
- **YouTube and commercial streaming services:** not openly licensed.

## Not yet checked

Jamendo (open licences, but its classical music is mostly amateur), the Free Music Archive and IMSLP's recordings.

## Coverage

Open licences cover historic recordings, piano, chamber music and the core symphonies well. Modern recordings of large-scale works, opera above all, will stay thin.
