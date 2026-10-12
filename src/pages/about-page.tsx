import { BookOpen, Music2, UsersRound } from 'lucide-react'
import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { ImageCreditLink } from '@/components/image-credit-link'
import { t } from '@/i18n'

const principles = [
  {
    title: t('about_discover'),
    description: t('about_discover_text'),
    icon: UsersRound,
  },
  {
    title: t('about_understand'),
    description: t('about_understand_text'),
    icon: BookOpen,
  },
  {
    title: t('about_enjoy'),
    description: t('about_enjoy_text'),
    icon: Music2,
  },
]

export function AboutPage() {
  return (
    <section className="about-page">
      <title>{`${t('nav_about')} · Sonatina`}</title>
      <div className="about-header">
        <p>{t('about_kicker')}</p>
        <h1>
          {t('about_heading')} <em>{t('about_heading_em')}</em>
        </h1>
        <p>{t('about_intro')}</p>
      </div>

      <div className="about-principles" aria-label={t('about_principles_label')}>
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
        <h2>{t('about_mission')}</h2>
        <p>{t('about_mission_text')}</p>
      </div>

      <figure className="about-quote">
        <div className="about-quote-image">
          <img src={catalogAssets.concertAtSanssouci} alt="" />
          <ImageCreditLink credit={assetCredits.concertAtSanssouci} imageSrc={catalogAssets.concertAtSanssouci} />
        </div>
        <figcaption>
          <blockquote>“{t('about_quote')}”</blockquote>
          <cite>Victor Hugo</cite>
        </figcaption>
      </figure>
    </section>
  )
}
