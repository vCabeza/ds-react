import { describe, expect, it } from 'vitest'
import { colorTokens, type ColorToken } from './colors'

const expectedRegistry = {
  SurfaceHigh: '#F1F1F7',
  SurfacePositive: '#B1FFC7',
  SurfaceNegative: '#FFBFB1',
  Inverse: '#1B2134',
  InverseHover: '#343A4E',
  InverseActive: '#585D71',
  SurfaceHover: '#F6F6FA',
  SurfaceActive: '#F1F1F7',
  Outline: '#D3D3DC',
  OnNeutral: '#1B2134',
  OnInverse: '#FFFFFF',
} as const satisfies Record<ColorToken, string>

describe('colorTokens', () => {
  it('contains exactly 11 keys', () => {
    expect(Object.keys(colorTokens)).toHaveLength(11)
  })

  it('contains no duplicate keys', () => {
    const keys = Object.keys(colorTokens)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('matches each key to its assigned hex value', () => {
    expect(colorTokens).toEqual(expectedRegistry)
    for (const key of Object.keys(expectedRegistry) as ColorToken[]) {
      expect(colorTokens[key]).toBe(expectedRegistry[key])
    }
  })

  it('is frozen', () => {
    expect(Object.isFrozen(colorTokens)).toBe(true)
  })
})
