export type RecordingTrack = {
  title: string
  /** Index into the work's movements. Several tracks can belong to one movement. */
  movement: number
  /** When a track's performer differs from the recording's. */
  performer?: string
  /** An MP3 streamed directly from an approved source (see SOURCES.md). */
  src: string
  /**
   * Where the track starts and ends within `src`, in seconds, when one file holds several
   * tracks (a whole work recorded as a single file). Without them, the track is the whole file.
   */
  start?: number
  end?: number
  /** The recording's page at its source. */
  page: string
}

export type Recording = {
  performer: string
  /** "Public domain" or a Creative Commons licence, when the source states one. */
  license?: string
  licenseUrl?: string
  tracks: RecordingTrack[]
}
