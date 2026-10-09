export type RecordingTrack = {
  title: string
  /** Index into the work's movements. Several tracks can belong to one movement. */
  movement: number
  /** When a track's performer differs from the recording's. */
  performer?: string
  /** Wikimedia's MP3 version of the file, streamed directly. */
  src: string
  /** The file's page on Wikimedia Commons. */
  page: string
}

export type Recording = {
  performer: string
  /** "Public domain", or the Creative Commons licence, which requires this credit. */
  license: string
  licenseUrl?: string
  tracks: RecordingTrack[]
}
