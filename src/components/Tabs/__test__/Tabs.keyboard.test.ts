import { describe, expect, it } from 'vitest'
import {
  getFirstTabKey,
  getLastTabKey,
  getNextTabKey,
  getPreviousTabKey,
} from '../Tabs.keyboard'

const ids = ['emails', 'files', 'edits'] as const

describe('Tabs.keyboard', () => {
  it('moves next and previous with wrap', () => {
    expect(getNextTabKey(ids, 'emails')).toBe('files')
    expect(getNextTabKey(ids, 'edits')).toBe('emails')
    expect(getPreviousTabKey(ids, 'emails')).toBe('edits')
    expect(getPreviousTabKey(ids, 'files')).toBe('emails')
  })

  it('returns first/last keys and handles empty lists', () => {
    expect(getFirstTabKey(ids)).toBe('emails')
    expect(getLastTabKey(ids)).toBe('edits')
    expect(getFirstTabKey([])).toBeNull()
    expect(getLastTabKey([])).toBeNull()
    expect(getNextTabKey([], null)).toBeNull()
    expect(getPreviousTabKey([], null)).toBeNull()
  })

  it('falls back to the first key when current is unknown or null', () => {
    expect(getNextTabKey(ids, 'missing')).toBe('emails')
    expect(getPreviousTabKey(ids, 'missing')).toBe('emails')
    expect(getNextTabKey(ids, null)).toBe('emails')
    expect(getPreviousTabKey(ids, null)).toBe('emails')
  })
})

