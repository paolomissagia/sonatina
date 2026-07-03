import { BookOpen, Music2, UsersRound } from 'lucide-react'
import { catalogAssets } from '@/data/catalog-assets'

const principles = [
  {
    title: 'Discover',
    description: 'Explore works, composers, and periods through curated collections and context.',
    icon: UsersRound,
  },
  {
    title: 'Understand',
    description: 'Learn the stories behind the music without needing a music degree.',
    icon: BookOpen,
  },
  {
    title: 'Enjoy',
    description: 'Because classical music should be experienced, not just studied.',
    icon: Music2,
  },
]

export function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-header">
        <p>About Sonatina</p>
        <h1>
          Classical music belongs to <em>everyone.</em>
        </h1>
        <p>
          We built Sonatina to make the world of classical music more welcoming, more
          beautiful, and more inviting.
        </p>
      </div>

      <div className="about-principles" aria-label="What Sonatina helps with">
        {principles.map((principle) => {
          const Icon = principle.icon

          return (
            <article className="about-principle" key={principle.title}>
              <span className="about-principle-icon">
                <Icon size={26} strokeWidth={1.8} />
              </span>
              <div>
                <h2>{principle.title}</h2>
                <p>{principle.description}</p>
              </div>
            </article>
          )
        })}
      </div>

      <div className="about-mission">
        <h2>Our mission</h2>
        <p>
          To help more people discover, understand, and fall in love with classical music,
          one piece at a time.
        </p>
      </div>

      <figure className="about-quote">
        <img src={catalogAssets.aboutConcertHall} alt="" />
        <figcaption>
          <blockquote>
            “Music expresses that which cannot be put into words and that which cannot
            remain silent.”
          </blockquote>
          <cite>Victor Hugo</cite>
        </figcaption>
      </figure>
    </section>
  )
}
