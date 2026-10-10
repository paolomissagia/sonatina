import { Pause, Play, Radio, Shuffle, SkipBack, SkipForward, X } from 'lucide-react'
import { Link } from 'react-router'
import { getComposerName } from '@/data/composers'
import { formatTime, usePlayer } from '@/player/player-context'

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

/** The "now playing" bar, pinned to the bottom of the page while a recording is loaded. */
export function PlayerBar() {
  const player = usePlayer()
  const { work, recording, index, last, playing, time, duration, error, station, shuffle } = player

  if (!work || !recording) {
    return null
  }

  const track = recording.tracks[index]
  const performer = track.performer ?? recording.performer
  const movementCount = work.movements.length
  const label = movementCount > 1 ? `${numerals[track.movement] ?? track.movement + 1}. ${track.title}` : track.title

  return (
    <section className="player-bar" aria-label="Now playing">
      <div className="player-controls">
        <button className="player-button" type="button" aria-label="Previous track" onClick={player.previous}>
          <SkipBack size={17} />
        </button>
        <button
          className="player-button player-play"
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={player.toggle}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          className="player-button"
          type="button"
          aria-label="Next track"
          disabled={index >= last && !station && !shuffle}
          onClick={player.next}
        >
          <SkipForward size={17} />
        </button>
        <button
          className={shuffle ? 'player-button player-shuffle active' : 'player-button player-shuffle'}
          type="button"
          aria-label="Shuffle"
          aria-pressed={shuffle}
          title={shuffle ? 'Shuffle is on: skip to a random piece' : 'Shuffle'}
          onClick={player.toggleShuffle}
        >
          <Shuffle size={16} />
        </button>
      </div>

      <div className="player-info">
        {station ? (
          <Link className="player-station" to="/radio">
            <Radio size={13} aria-hidden="true" />
            {station.name} radio
          </Link>
        ) : null}
        <Link className="player-work" to={`/works/${work.id}`}>
          {work.title} <span>· {getComposerName(work.composerId)}</span>
        </Link>
        <p className="player-track">
          {error ? 'This recording couldn’t be loaded. Try another track.' : label}
        </p>
      </div>

      <div className="player-progress">
        <span>{formatTime(time)}</span>
        <input
          aria-label="Seek"
          aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          max={duration || 0}
          min={0}
          step={1}
          type="range"
          value={Math.min(time, duration || 0)}
          onChange={(event) => player.seek(Number(event.target.value))}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <a className="player-credit" href={track.page} target="_blank" rel="noreferrer">
        {performer}
        {recording.license && recording.license !== 'Public domain' ? ` · ${recording.license}` : ''}
      </a>

      <button className="player-button player-close" type="button" aria-label="Close player" onClick={player.close}>
        <X size={16} />
      </button>
    </section>
  )
}
