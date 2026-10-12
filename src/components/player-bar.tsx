import { Pause, Play, Radio, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react'
import { Link } from 'react-router'
import { getComposerName } from '@/data/composers'
import { formatTime, usePlayer } from '@/player/player-context'
import { toRoman } from '@/player/roman'
import { t } from '@/i18n'

/** The "now playing" bar, pinned to the bottom of the page while a recording is loaded. */
export function PlayerBar() {
  const player = usePlayer()
  const { work, recording, index, last, playing, time, duration, error, station, shuffle, repeat, volume, muted } = player
  const repeatLabels = { off: t('player_repeat_off'), work: t('player_repeat_work'), track: t('player_repeat_track') }

  if (!work || !recording) {
    return null
  }

  const track = recording.tracks[index]
  const movementCount = work.movements.length
  const label = movementCount > 1 ? `${toRoman(track.movement + 1)}. ${track.title}` : track.title

  return (
    <section className="player-bar" aria-label={t('player_label')}>
      <div className="player-controls">
        <button className="player-button" type="button" aria-label={t('player_previous')} onClick={player.previous}>
          <SkipBack size={17} />
        </button>
        <button
          className="player-button player-play"
          type="button"
          aria-label={playing ? t('pause') : t('play')}
          onClick={player.toggle}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          className="player-button"
          type="button"
          aria-label={t('player_next')}
          disabled={index >= last && !station && !shuffle}
          onClick={player.next}
        >
          <SkipForward size={17} />
        </button>
      </div>

      <div className="player-modes">
        <button
          className={shuffle ? 'player-button player-toggle active' : 'player-button player-toggle'}
          type="button"
          aria-label={t('player_shuffle')}
          aria-pressed={shuffle}
          title={shuffle ? t('player_shuffle_on') : t('player_shuffle')}
          onClick={player.toggleShuffle}
        >
          <Shuffle size={16} />
        </button>
        <button
          className={repeat === 'off' ? 'player-button player-toggle' : 'player-button player-toggle active'}
          type="button"
          aria-label={repeatLabels[repeat]}
          title={repeatLabels[repeat]}
          onClick={player.cycleRepeat}
        >
          {repeat === 'track' ? <Repeat1 size={16} /> : <Repeat size={16} />}
        </button>
      </div>

      <div className="player-info">
        {station ? (
          <Link className="player-station" to="/radio">
            <Radio size={13} aria-hidden="true" />
            {t('player_station', { station: station.name })}
          </Link>
        ) : null}
        <Link className="player-work" to={`/works/${work.id}`}>
          {work.title} <span>· {getComposerName(work.composerId)}</span>
        </Link>
        <p className="player-track">
          {error ? t('player_error') : label}
        </p>
      </div>

      <div className="player-progress">
        <span>{formatTime(time)}</span>
        <input
          aria-label={t('player_seek')}
          aria-valuetext={t('player_seek_value', { time: formatTime(time), duration: formatTime(duration) })}
          max={duration || 0}
          min={0}
          step={1}
          type="range"
          value={Math.min(time, duration || 0)}
          onChange={(event) => player.seek(Number(event.target.value))}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="player-volume">
        <button
          className="player-button"
          type="button"
          aria-label={muted ? t('player_unmute') : t('player_mute')}
          onClick={player.toggleMute}
        >
          {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          aria-label={t('player_volume')}
          max={1}
          min={0}
          step={0.05}
          type="range"
          value={muted ? 0 : volume}
          onChange={(event) => player.setVolume(Number(event.target.value))}
        />
      </div>


      <button className="player-button player-close" type="button" aria-label={t('player_close')} onClick={player.close}>
        <X size={16} />
      </button>
    </section>
  )
}
