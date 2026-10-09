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
}

export function MovementList({ className, movements, title }: MovementListProps) {
  return (
    <section className={className ? `movement-card ${className}` : 'movement-card'}>
      <h2>{title}</h2>
      <ol className="movement-list">
        {movements.map((movement, index) => (
          <li className="movement-row" key={`${index}-${movement.title}`}>
            <span>{toRoman(index + 1)}.</span>
            <strong>{movement.title}</strong>
            {movement.note ? <small>{movement.note}</small> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
