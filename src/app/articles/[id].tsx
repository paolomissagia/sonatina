import { useLocalSearchParams, type Href } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { RecommendationCard, RecommendationSection } from '@/components/cards'
import { DetailHero } from '@/components/detail-hero'
import { NotFound } from '@/components/not-found'
import { Screen } from '@/components/screen'
import { findArticle, getReadTime, getRecommendedArticles } from '@/data/articles'
import { getComposerName } from '@/data/composers'
import { findWork, getWorkAsset } from '@/data/works'
import { articleCategoryLabels, t } from '@/i18n'
import type { Article } from '@/models/article'
import type { Work } from '@/models/work'
import { useLanguage } from '@/state/language'
import { PageTitle, titleOf } from '@/ui/kit'
import { colors, fonts, type } from '@/ui/theme'

function ArticlePage({ article }: { article: Article }) {
  useLanguage()
  const readTime = getReadTime(article)
  const category = articleCategoryLabels[article.category]
  const works = article.workIds.map(findWork).filter((work): work is Work => work !== undefined)

  return (
    <Screen header="back">
      <PageTitle title={titleOf(article.title)} />
      <DetailHero
        asset={article.asset}
        breadcrumb={[{ label: t('nav_articles'), href: '/articles' }, { label: article.title }]}
        title={article.title}
        subtitle={article.type}
        description={article.description}
        meta={[category, readTime]}
        facts={[
          { label: t('article_type'), value: article.type },
          { label: t('article_category'), value: category },
          { label: t('article_audience'), value: article.audience },
          { label: t('article_read_time'), value: readTime },
        ]}
        factsTitle={t('article_details')}
      />

      <View style={styles.body}>
        <Text style={styles.lead}>{article.overview}</Text>
        {article.sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text role="heading" style={styles.heading}>
              {section.title}
            </Text>
            {section.body.map((paragraph) => (
              <Text key={paragraph.slice(0, 40)} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {works.length > 0 ? (
        <RecommendationSection title={t('article_works')}>
          {works.map((work) => (
            <RecommendationCard
              key={work.id}
              asset={getWorkAsset(work)}
              title={work.title}
              subtitle={getComposerName(work.composerId)}
              meta={work.composed}
              href={`/works/${work.id}` as Href}
            />
          ))}
        </RecommendationSection>
      ) : null}

      <RecommendationSection title={t('article_recommended')}>
        {getRecommendedArticles(article).map((other) => (
          <RecommendationCard
            key={other.id}
            asset={other.asset}
            title={other.title}
            subtitle={articleCategoryLabels[other.category]}
            meta={getReadTime(other)}
            href={`/articles/${other.id}` as Href}
          />
        ))}
      </RecommendationSection>
    </Screen>
  )
}

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const article = findArticle(id)
  return article ? <ArticlePage article={article} key={article.id} /> : <NotFound />
}

const styles = StyleSheet.create({
  body: {
    maxWidth: 720,
    marginTop: 40,
    gap: 28,
  },
  lead: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 33,
    color: colors.ink,
  },
  section: {
    gap: 12,
  },
  heading: {
    ...type.display,
    fontSize: 28,
    lineHeight: 32,
  },
  paragraph: {
    ...type.body,
    fontSize: 17,
    lineHeight: 28,
  },
})
