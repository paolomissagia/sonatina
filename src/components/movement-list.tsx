import { Pause, Play } from 'lucide-react'
import type { Movement } from '@/models/work'

function toRoman(n: number) {
  const parts: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let out = ''
  for (const [value, numeral] of parts) {
    while (n >= value) {
      out += numeral
      n -= value
    }
  }
  return out
}

type MovementListProps = {
  className?: string
  movements: Movement[]
  title: string
  /** Movements that have a recording; their rows become play buttons, with the icon at the end so numerals stay aligned. */
  playable?: Set<number>
  /** The movement now playing, if it belongs to this work. */
  activeMovement?: number
  playing?: boolean
  onPlay?: (movement: number) => void
}

export function MovementList({ activeMovement, className, movements, onPlay, playable, playing, title }: MovementListProps) {
  return (
    <section className={className ? `movement-card ${className}` : 'movement-card'}>
      <h2>{title}</h2>
      <ol className="movement-list">
        {movements.map((movement, index) => {
          const numeral = `${toRoman(index + 1)}.`
          const active = activeMovement === index
          const content = (
            <>
              <span>{numeral}</span>
              <strong>{movement.title}</strong>
            </>
          )

          return (
            <li className={active ? 'movement-row active' : 'movement-row'} key={`${index}-${movement.title}`}>
              {onPlay && playable?.has(index) ? (
                <button
                  className="movement-play"
                  type="button"
                  aria-label={`${active && playing ? 'Pause' : 'Play'} ${numeral} ${movement.title}`}
                  onClick={() => onPlay(index)}
                >
                  {content}
                  <i aria-hidden="true">{active && playing ? <Pause size={13} /> : <Play size={13} />}</i>
                </button>
              ) : (
                content
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
