import { SectionHeading } from './section-heading'

export function AboutPage() {
    return (
        <section className="about-page">
            <div className="about-intro">
                <SectionHeading title="About Sonatina" />
                <p>
                    Sonatina was created to make the world of classical music feel more welcoming,
                    more beautiful and easier to explore.
                </p>
            </div>

            <div className="about-body">
                <section>
                    <h3>Is that for you?</h3>
                    <p>
                        Whether you're discovering your very first symphony or revisiting a favourite
                        opera, our goal is simple: help you find music you'll love and understand why
                        it has inspired audiences for centuries.
                    </p>
                </section>
            </div>
        </section>
    )
}
