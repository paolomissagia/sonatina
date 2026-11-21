import { router, useLocalSearchParams } from 'expo-router'
import { CollectionScreen } from '@/components/collection-screen'
import { catalogPageMeta, getCatalogItems, matchesWorkFilter, workFilters } from '@/data/catalog'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { Chips } from '@/ui/kit'

/** All works, filtered by genre: `/works?genre=opera`. */
export default function WorksScreen() {
  useLanguage()
  const { genre } = useLocalSearchParams<{ genre?: string }>()
  const active = typeof genre === 'string' ? genre : ''
  const items = getCatalogItems('works').filter((item) => matchesWorkFilter(item, active))

  return (
    <CollectionScreen section="works" title={catalogPageMeta.works.title} description={catalogPageMeta.works.description} items={items}>
      <Chips
        label={t('works_filter_label')}
        items={workFilters.map((filter) => ({
          key: filter.value || 'all',
          label: filter.label,
          active: active === filter.value,
          onPress: () => router.setParams({ genre: filter.value || undefined }),
        }))}
      />
    </CollectionScreen>
  )
}
