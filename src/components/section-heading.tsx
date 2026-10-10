type SectionHeadingProps = {
  title: string
  /** `h1` when the heading is the page's title, as on the Works and Radio pages. */
  level?: 'h1' | 'h2'
}

export function SectionHeading({ title, level: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <Heading>{title}</Heading>
    </div>
  )
}
