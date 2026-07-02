import heroArtwork from '@/assets/classical-dashboard-hero.png'

export function HeroPanel() {
  return (
    <section className="hero-panel">
      <img src={heroArtwork} alt="" />
      <div className="hero-copy">
        <h1>
          Discover
          <span>the world of</span>
          <em>classical music.</em>
        </h1>
        <p>Explore works, recordings and more.</p>
        <button type="button">Start exploring</button>
      </div>
    </section>
  )
}
