type SectionHeadingProps = {
  title: string
  actionLabel?: string
}

export function SectionHeading({ title, actionLabel }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {actionLabel ? <button type="button">{actionLabel}</button> : null}
    </div>
  )
}
