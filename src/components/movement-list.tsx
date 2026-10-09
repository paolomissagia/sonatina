import type { Movement } from '@/models/work'

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

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
            <span>{numerals[index] ?? index + 1}.</span>
            <strong>{movement.title}</strong>
            {movement.note ? <small>{movement.note}</small> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
