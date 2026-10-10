import { Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { findComposer, getComposerName } from '@/data/composers'
import type { Work } from '@/models/work'
import { formatDuration, formatKeyAndCatalogue, getRecommendedWorks, getWorkAsset, getWorkPeriod } from '@/data/works'
import { usePlayer } from '@/player/player-context'
import { useRecording } from '@/player/use-recording'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { MovementList } from '@/components/movement-list'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type WorkDetailPageProps = {
  work: Work
}

const tabs = ['Overview', 'Movements', 'Details'] as const
type WorkTab = (typeof tabs)[number]

function getMovementsTitle(work: Work) {
  if (work.partOf) {
    return `From ${work.partOf}`
  }

  if (work.form.startsWith('Song cycle')) {
    return 'Songs'
  }

  return work.genre === 'Opera' || work.genre === 'Ballet' ? 'Structure' : 'Movements'
}

export function WorkDetailPage({ work }: WorkDetailPageProps) {
  const [activeTab, setActiveTab] = useState<WorkTab>('Overview')
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
  const workDetails = [
    { label: 'Composer', value: composerName },
    ...(work.catalogue ? [{ label: 'Catalogue', value: work.catalogue }] : []),
    ...(work.key ? [{ label: 'Key', value: work.key }] : []),
    ...(work.nickname ? [{ label: 'Also known as', value: work.nickname }] : []),
    { label: 'Composed', value: work.composed },
    ...(work.premiere ? [{ label: 'Premiere', value: work.premiere }] : []),
    { label: 'Duration', value: `About ${formatDuration(work.durationMinutes)}` },
    { label: 'Form', value: work.form },
    { label: 'Period', value: getWorkPeriod(work) ?? '' },
    { label: 'Instrumentation', value: work.instrumentation },
  ]

  return (
    <article className="work-page">
      <DetailHero
        breadcrumb={[
          { label: 'Works', to: '/works' },
          ...(composer ? [{ label: composerName, to: `/composers/${composer.id}` }] : []),
          { label: work.title },
        ]}
        actions={
          recording ? (
            <>
              <button className="primary-action listen-action" type="button" onClick={playWork}>
                {isCurrent && player.playing ? <Pause size={17} /> : <Play size={17} />}
                {isCurrent && player.playing ? 'Pause' : isCurrent ? 'Resume' : 'Listen'}
              </button>
              <p className="listen-credit">
                Recording: {recording.performer}
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
        ariaLabel={`${work.title} sections`}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {activeTab === 'Overview' ? (
        <div className="work-tab-panel">
          <div className="work-overview-grid">
            <section className="work-listen">
              <h2>Why listen?</h2>
              <p>{work.overview}</p>
            </section>

            {movementList()}
          </div>

          {recommendedWorks.length > 0 ? (
            <RecommendationSection title="Recommended works">
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

      {activeTab === 'Movements' ? (
        movementList('movement-tab-card')
      ) : null}

      {activeTab === 'Details' ? (
        <section className="work-details-panel">
          <h2>Details</h2>
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
