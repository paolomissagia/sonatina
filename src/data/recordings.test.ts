import { describe, expect, it } from 'vitest'
import { recordings } from './recordings'
import { findWork, works } from './works'

describe('recordings', () => {
  const entries = Object.entries(recordings)

  it('belong to works in the catalogue', () => {
    for (const [workId] of entries) {
      expect(findWork(workId), workId).toBeDefined()
    }
  })

  it('cover nearly the whole catalogue', () => {
    expect(entries.length / works.length).toBeGreaterThan(0.9)
  })

  it('point every track at one of the work’s movements', () => {
    for (const [workId, recording] of entries) {
      const work = findWork(workId)!
      expect(recording.tracks.length, workId).toBeGreaterThan(0)
      for (const track of recording.tracks) {
        expect(track.movement, `${workId}: ${track.title}`).toBeGreaterThanOrEqual(0)
        expect(track.movement, `${workId}: ${track.title}`).toBeLessThan(work.movements.length)
      }
    }
  })

  // The approved sources in SOURCES.md: Commons, the Internet Archive and Romanian Radio (through Europeana).
  it('stream MP3s from an approved source', () => {
    for (const [workId, recording] of entries) {
      for (const track of recording.tracks) {
        expect(track.src, workId).toMatch(/^https:\/\/(upload\.wikimedia\.org\/.+|archive\.org\/download\/.+|resource\.culturalia\.ro\/.+)\.mp3$/i)
        expect(track.page, workId).toMatch(/^https:\/\/(commons\.wikimedia\.org\/wiki\/File:|archive\.org\/details\/|www\.europeana\.eu\/item\/)/)
      }
    }
  })

  it('credit a performer, and link Creative Commons licences', () => {
    for (const [workId, recording] of entries) {
      expect(recording.performer, workId).not.toBe('')
      if (recording.license?.startsWith('CC BY')) {
        expect(recording.licenseUrl, workId).toMatch(/^https:\/\/creativecommons\.org\/licenses\//)
      }
    }
  })
})
