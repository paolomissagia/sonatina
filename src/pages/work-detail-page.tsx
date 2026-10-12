import { Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { findComposer, getComposerName } from '@/data/composers'
import type { Work } from '@/models/work'
import { formatDuration, formatKeyAndCatalogue, getRecommendedWorks, getWorkAsset, getWorkPeriod } from '@/data/works'
import { usePlayer } from '@/player/player-context'
import { periodLabels, t } from '@/i18n'
import { useRecording } from '@/player/use-recording'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { MovementList } from '@/components/movement-list'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type WorkDetailPageProps = {
  work: Work
}

const tabs = ['overview', 'movements', 'details'] as const
type WorkTab = (typeof tabs)[number]
const tabLabels: Record<WorkTab, string> = {
  overview: t('tab_overview'),
  movements: t('tab_movements'),
  details: t('tab_details'),
}

function getMovementsTitle(work: Work) {
  if (work.partOf) {
    return t('movements_from', { set: work.partOf })
  }

  if (work.form.startsWith('Song cycle')) {
    return t('movements_songs')
  }

  return work.genre === 'Opera' || work.genre === 'Ballet' ? t('movements_structure') : t('movements')
}

export function WorkDetailPage({ work }: WorkDetailPageProps) {
  const [activeTab, setActiveTab] = useState<WorkTab>('overview')
  const composer = findComposer(work.composerId)
  const composerName = getComposerName(work.composerId)
  const recommendedWorks = getRecommendedWorks(work)
  const keyAndCatalogue = formatKeyAndCatalogue(work)
  const movementsTitle = getMovementsTitle(work)
  const player = usePlayer()
  const recording = useRecording(work.id)
  const isCurrent = player.work?.id === work.id
  const currentTrack = isCurrent ? player.recording?.tracks[player.index] : undefined
  const playable = new Set(recording?.tracks.map((track) => track.movement))

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

  const movementList = (className?: string) => (
    <MovementList
      activeMovement={currentTrack?.movement}
      className={className}
      movements={work.movements}
      playable={playable}
      playing={isCurrent && player.playing}
      title={movementsTitle}
      onPlay={recording ? playMovement : undefined}
    />
  )
  const period = getWorkPeriod(work)
  const workDetails = [
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

  return (
    <article className="work-page">
      <title>{`${work.title} · ${composerName} · Sonatina`}</title>
      <DetailHero
        breadcrumb={[
          { label: t('nav_works'), to: '/works' },
          ...(composer ? [{ label: composerName, to: `/composers/${composer.id}` }] : []),
          { label: work.title },
        ]}
        actions={
          recording ? (
            <>
              <button className="primary-action listen-action" type="button" onClick={playWork}>
                {isCurrent && player.playing ? <Pause size={17} /> : <Play size={17} />}
                {isCurrent && player.playing ? t('pause') : isCurrent ? t('work_resume') : t('work_listen')}
              </button>
              <p className="listen-credit">
                {t('work_recording', { performer: recording.performer })}
                {recording.license && recording.licenseUrl ? (
                  <>
                    {' · '}
                    <a href={recording.licenseUrl} target="_blank" rel="noreferrer">
                      {recording.license}
                    </a>
                  </>
                ) : recording.license ? (
                  ` · ${recording.license}`
                ) : null}
              </p>
            </>
          ) : undefined
        }
        description={work.description}
        imageCredit={assetCredits[getWorkAsset(work)]}
        imageSrc={catalogAssets[getWorkAsset(work)]}
        meta={
          <>
            {keyAndCatalogue ? <span>{keyAndCatalogue}</span> : null}
            <span>{work.composed}</span>
            <span>{formatDuration(work.durationMinutes)}</span>
          </>
        }
        subtitle={composerName}
        title={work.title}
      />

      <DetailTabs
        activeTab={activeTab}
        ariaLabel={t('sections_label', { title: work.title })}
        labels={tabLabels}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {activeTab === 'overview' ? (
        <div className="work-tab-panel">
          <div className="work-overview-grid">
            <section className="work-listen">
              <h2>{t('work_why_listen')}</h2>
              <p>{work.overview}</p>
            </section>

            {movementList()}
          </div>

          {recommendedWorks.length > 0 ? (
            <RecommendationSection title={t('work_recommended')}>
              {recommendedWorks.map((relatedWork) => (
                <RecommendationCard
                  imageSrc={catalogAssets[getWorkAsset(relatedWork)]}
                  key={relatedWork.id}
                  meta={relatedWork.composed}
                  subtitle={getComposerName(relatedWork.composerId)}
                  title={relatedWork.title}
                  to={`/works/${relatedWork.id}`}
                />
              ))}
            </RecommendationSection>
          ) : null}
        </div>
      ) : null}

      {activeTab === 'movements' ? (
        movementList('movement-tab-card')
      ) : null}

      {activeTab === 'details' ? (
        <section className="work-details-panel">
          <h2>{t('work_details')}</h2>
          <dl>
            {workDetails.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </article>
  )
}
