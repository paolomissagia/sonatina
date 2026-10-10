import { useEffect, useState } from 'react'
import type { Recording } from '@/models/recording'

let recordingsPromise: Promise<Record<string, Recording>> | null = null

/**
 * The recordings are a large table, so they load in their own chunk. The player keeps
 * the recording it is playing in its own state, so browsing never interrupts playback.
 */
export function loadRecordings() {
  recordingsPromise ??= import('@/data/recordings').then((module) => module.recordings)
  return recordingsPromise
}

/** The work's recording once the table has loaded; undefined before that or if there is none. */
export function useRecording(workId: string) {
  const [loaded, setLoaded] = useState<{ workId: string; recording?: Recording } | null>(null)

  useEffect(() => {
    let current = true
    void loadRecordings().then((recordings) => {
      if (current) {
        setLoaded({ workId, recording: recordings[workId] })
      }
    })
    return () => {
      current = false
    }
  }, [workId])

  return loaded?.workId === workId ? loaded.recording : undefined
}
