import { Pause, Play } from 'lucide-react'
import { catalogAssets } from '@/assets/catalog-assets'
import { SectionHeading } from '@/components/section-heading'
import { getStations, type Station } from '@/data/stations'
import { usePlayer } from '@/player/player-context'

export function RadioPage() {
  const player = usePlayer()

  // Tapping the station that is on pauses or resumes it; any other station tunes in.
  const handleStation = (station: Station) => {
    if (player.station?.id === station.id) {
      player.toggle()
    } else {
      player.tune(station)
    }
  }

  const isOn = (station: Station) => player.station?.id === station.id && player.playing

  const chips = (title: string, stations: Station[]) => (
    <div className="radio-more">
      <h2>{title}</h2>
      <div className="collection-filter-list" aria-label={`Stations ${title.toLowerCase()}`}>
        {stations.map((station) => (
          <button
            aria-pressed={player.station?.id === station.id}
            className={player.station?.id === station.id ? 'active' : undefined}
            key={station.id}
            type="button"
            onClick={() => handleStation(station)}
          >
            {isOn(station) ? <Pause size={14} /> : <Play size={14} />}
            {station.name}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section className="radio-page">
      <title>Radio · Sonatina</title>
      <div className="page-intro">
        <SectionHeading title="Radio" />
        <p>
          Pick a station and let the catalogue play. Each one plays a movement at a time, chosen at random, so you
          can keep it on while you browse.
        </p>
      </div>

      <div className="radio-grid">
        {getStations('main').map((station) => (
          <button
            aria-pressed={player.station?.id === station.id}
            className="home-category-card radio-station"
            key={station.id}
            type="button"
            onClick={() => handleStation(station)}
          >
            <img src={catalogAssets[station.asset]} alt="" loading="lazy" decoding="async" />
            <i aria-hidden="true">{isOn(station) ? <Pause size={18} /> : <Play size={18} />}</i>
            <span>{station.name}</span>
            <p>{isOn(station) ? 'Now playing' : station.description}</p>
          </button>
        ))}
      </div>

      {chips('By era', getStations('era'))}
      {chips('By country', getStations('country'))}
    </section>
  )
}
