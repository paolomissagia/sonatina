import { useLocalSearchParams, type Href } from 'expo-router'
import { Pause, Play } from '@/ui/icons'
import { useState } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { RecommendationCard, RecommendationSection } from '@/components/cards'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { FactList } from '@/components/fact-list'
import { MovementList } from '@/components/movement-list'
import { NotFound } from '@/components/not-found'
import { Screen } from '@/components/screen'
import { findComposer, getComposerName } from '@/data/composers'
import { findWork, formatDuration, formatKeyAndCatalogue, getRecommendedWorks, getWorkAsset, getWorkPeriod } from '@/data/works'
import { labels, periodLabels, t } from '@/i18n'
import type { Work } from '@/models/work'
import { usePlayer } from '@/player/player-context'
import { useRecording } from '@/player/use-recording'
import { useLanguage } from '@/state/language'
import { Button, cardStyle, PageTitle, titleOf } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { colors, type } from '@/ui/theme'

const tabs = ['overview', 'movements', 'details'] as const
type WorkTab = (typeof tabs)[number]
const tabLabels = labels<WorkTab>({ overview: 'tab_overview', movements: 'tab_movements', details: 'tab_details' })

function getMovementsTitle(work: Work) {
  if (work.partOf) {
    return t('movements_from', { set: work.partOf })
  }
  if (work.form.startsWith('Song cycle')) {
    return t('movements_songs')
  }
  return work.genre === 'Opera' || work.genre === 'Ballet' ? t('movements_structure') : t('movements')
}

function WorkPage({ work }: { work: Work }) {
  useLanguage()
  const { wide } = useLayout()
  const [activeTab, setActiveTab] = useState<WorkTab>('overview')
  const composer = findComposer(work.composerId)
  const composerName = getComposerName(work.composerId)
  const player = usePlayer()
  const recording = useRecording(work.id)
  const isCurrent = player.work?.id === work.id
  const currentTrack = isCurrent ? player.recording?.tracks[player.index] : undefined
  const playable = new Set(recording?.tracks.map((track) => track.movement))
  const keyAndCatalogue = formatKeyAndCatalogue(work)
  const period = getWorkPeriod(work)

  const playMovement = (movement: number) => {
    if (!recording) {
      return
    }
    if (currentTrack?.movement === movement) {
      player.toggle()
      return
    }
    player.play(work, recording, recording.tracks.findIndex((track) => track.movement === movement))
  }

  const playWork = () => {
    if (!recording) {
      return
    }
    if (isCurrent) {
      player.toggle()
    } else {
      player.play(work, recording)
    }
  }

  const movementList = (
    <MovementList
      activeMovement={currentTrack?.movement}
      movements={work.movements}
      playable={playable}
      playing={isCurrent && player.playing}
      title={getMovementsTitle(work)}
      onPlay={recording ? playMovement : undefined}
    />
  )

  const details = [
    { label: t('work_composer'), value: composerName },
    ...(work.catalogue ? [{ label: t('work_catalogue'), value: work.catalogue }] : []),
    ...(work.key ? [{ label: t('work_key'), value: work.key }] : []),
    ...(work.nickname ? [{ label: t('work_nickname'), value: work.nickname }] : []),
    { label: t('work_composed'), value: work.composed },
    ...(work.premiere ? [{ label: t('work_premiere'), value: work.premiere }] : []),
    { label: t('work_duration'), value: t('work_duration_about', { duration: formatDuration(work.durationMinutes) }) },
    { label: t('work_form'), value: work.form },
    { label: t('work_period'), value: period ? periodLabels[period] : '' },
    { label: t('work_instrumentation'), value: work.instrumentation },
  ]

  const listen = recording ? (
    <>
      <Button
        icon={isCurrent && player.playing ? Pause : Play}
        label={isCurrent && player.playing ? t('pause') : isCurrent ? t('work_resume') : t('work_listen')}
        onPress={playWork}
      />
      <Text style={styles.credit}>
        {t('work_recording', { performer: recording.performer })}
        {recording.license ? ' · ' : null}
        {recording.license && recording.licenseUrl ? (
          <Text style={styles.creditLink} role="link" onPress={() => void Linking.openURL(recording.licenseUrl!)}>
            {recording.license}
          </Text>
        ) : (
          recording.license
        )}
      </Text>
    </>
  ) : undefined

  return (
    <Screen header="back">
      <PageTitle title={titleOf(work.title, composerName)} />
      <DetailHero
        asset={getWorkAsset(work)}
        breadcrumb={[
          { label: t('nav_works'), href: '/works' },
          ...(composer ? [{ label: composerName, href: `/composers/${composer.id}` as Href }] : []),
          { label: work.title },
        ]}
        title={work.title}
        subtitle={composerName}
        description={work.description}
        meta={[keyAndCatalogue, work.composed, formatDuration(work.durationMinutes)].filter(Boolean)}
        actions={listen}
      />

      <DetailTabs activeTab={activeTab} label={t('sections_label', { title: work.title })} labels={tabLabels} tabs={tabs} onChange={setActiveTab} />

      {activeTab === 'overview' ? (
        <>
          <View style={[styles.overview, wide && styles.overviewWide]}>
            <View style={[styles.why, wide && { flex: 1.2 }]}>
              <Text role="heading" style={type.heading}>
                {t('work_why_listen')}
              </Text>
              <Text style={type.body}>{work.overview}</Text>
            </View>
            <View style={wide && { flex: 1 }}>{movementList}</View>
          </View>
          <RecommendationSection title={t('work_recommended')}>
            {getRecommendedWorks(work).map((related) => (
              <RecommendationCard
                key={related.id}
                asset={getWorkAsset(related)}
                title={related.title}
                subtitle={getComposerName(related.composerId)}
                meta={related.composed}
                href={`/works/${related.id}` as Href}
              />
            ))}
          </RecommendationSection>
        </>
      ) : null}

      {activeTab === 'movements' ? <View style={styles.narrow}>{movementList}</View> : null}

      {activeTab === 'details' ? (
        <View style={[styles.narrow, styles.detailsCard]}>
          <FactList items={details} title={t('work_details')} />
        </View>
      ) : null}
    </Screen>
  )
}

export default function WorkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const work = findWork(id)
  return work ? <WorkPage work={work} key={work.id} /> : <NotFound />
}

const styles = StyleSheet.create({
  credit: {
    ...type.small,
  },
  creditLink: {
    color: colors.gilt,
    textDecorationLine: 'underline',
  },
  overview: {
    gap: 28,
  },
  overviewWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
  },
  why: {
    gap: 12,
  },
  narrow: {
    maxWidth: 760,
  },
  detailsCard: {
    ...cardStyle,
    padding: 22,
  },
})
