export type FactListItem = {
  label: string
  value: string
}

type FactListProps = {
  items: FactListItem[]
  title?: string
}

export function FactList({ items, title }: FactListProps) {
  return (
    <div className="fact-list">
      {title ? <h2>{title}</h2> : null}
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
