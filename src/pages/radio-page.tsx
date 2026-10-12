import { Pause, Play } from 'lucide-react'
import { catalogAssets } from '@/assets/catalog-assets'
import { SectionHeading } from '@/components/section-heading'
import { getStations, type Station } from '@/data/stations'
import { usePlayer } from '@/player/player-context'
import { t } from '@/i18n'

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

  const chips = (title: string, label: string, stations: Station[]) => (
    <div className="radio-more">
      <h2>{title}</h2>
      <div className="collection-filter-list" aria-label={label}>
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
      <title>{`${t('nav_radio')} · Sonatina`}</title>
      <div className="page-intro">
        <SectionHeading title={t('nav_radio')} />
        <p>{t('radio_intro')}</p>
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
            <p>{isOn(station) ? t('radio_now_playing') : station.description}</p>
          </button>
        ))}
      </div>

      {chips(t('radio_by_era'), t('radio_by_era_label'), getStations('era'))}
      {chips(t('radio_by_country'), t('radio_by_country_label'), getStations('country'))}
    </section>
  )
}
