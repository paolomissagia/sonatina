import { describe, expect, it } from 'vitest'
import { recordings } from './recordings'
import { findWork } from './works'

describe('recordings', () => {
  const entries = Object.entries(recordings)

  it('belong to works in the catalogue', () => {
    for (const [workId] of entries) {
      expect(findWork(workId), workId).toBeDefined()
    }
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

  it('stream MP3s from Wikimedia and link to each file’s page', () => {
    for (const [workId, recording] of entries) {
      for (const track of recording.tracks) {
        expect(track.src, workId).toMatch(/^https:\/\/upload\.wikimedia\.org\/.+\.mp3$/)
        expect(track.page, workId).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      }
    }
  })

  it('are public domain or Creative Commons, with a licence link when credit is required', () => {
    for (const [workId, recording] of entries) {
      expect(recording.license, workId).toMatch(/^(Public domain|CC0|CC BY(-SA)? \d\.\d)$/)
      expect(recording.performer, workId).not.toBe('')
      if (recording.license.startsWith('CC BY')) {
        expect(recording.licenseUrl, workId).toMatch(/^https:\/\/creativecommons\.org\/licenses\//)
      }
    }
  })

  it('leave out works still under copyright in some countries', () => {
    for (const [workId] of entries) {
      expect(findWork(workId)!.composerId, workId).not.toBe('stravinsky')
    }
  })
})
