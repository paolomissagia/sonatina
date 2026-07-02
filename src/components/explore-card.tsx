import heroArtwork from '@/assets/classical-dashboard-hero.png'

type ExploreCardProps = {
  item: {
    title: string
    description: string
    position: string
  }
}

export function ExploreCard({ item }: ExploreCardProps) {
  return (
    <article className="explore-card">
      <div className="image-tile" style={{ objectPosition: item.position }}>
        <img src={heroArtwork} alt="" />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  )
}
