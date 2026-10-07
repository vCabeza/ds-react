import { describe, expect, it } from 'vitest'
import {
  spacingCssVar,
  spacingTokenOrder,
  spacingTokens,
  spacingVar,
  type SpacingToken,
} from '../spacing'

describe('spacingTokens', () => {
  it('exposes the full core scale with px and rem pairs', () => {
    expect(Object.keys(spacingTokens)).toEqual([...spacingTokenOrder])
    expect(spacingTokens).toEqual({
      '0': { px: 0, rem: '0' },
      '4XS': { px: 2, rem: '0.125rem' },
      '3XS': { px: 4, rem: '0.25rem' },
      '2XS': { px: 8, rem: '0.5rem' },
      XS: { px: 12, rem: '0.75rem' },
      S: { px: 16, rem: '1rem' },
      M: { px: 20, rem: '1.25rem' },
      L: { px: 24, rem: '1.5rem' },
      XL: { px: 32, rem: '2rem' },
      '2XL': { px: 48, rem: '3rem' },
    })
  })

  it('keeps rem values aligned with a 16px root (px / 16)', () => {
    for (const token of spacingTokenOrder) {
      const { px, rem } = spacingTokens[token]
      if (px === 0) {
        expect(rem).toBe('0')
        continue
      }
      expect(rem).toBe(`${px / 16}rem`)
    }
  })

  it('is frozen and rejects mutation', () => {
    expect(Object.isFrozen(spacingTokens)).toBe(true)
    expect(() => {
      // Runtime immutability guard for the exported scale.
      ;(spacingTokens as { S: { px: number; rem: string } }).S = { px: 999, rem: '99rem' }
    }).toThrow()
    expect(spacingTokens.S).toEqual({ px: 16, rem: '1rem' })
  })

  it('maps each token to a lower-case CSS custom property', () => {
    const expected: Record<SpacingToken, string> = {
      '0': '--ds-space-0',
      '4XS': '--ds-space-4xs',
      '3XS': '--ds-space-3xs',
      '2XS': '--ds-space-2xs',
      XS: '--ds-space-xs',
      S: '--ds-space-s',
      M: '--ds-space-m',
      L: '--ds-space-l',
      XL: '--ds-space-xl',
      '2XL': '--ds-space-2xl',
    }
    for (const token of spacingTokenOrder) {
      expect(spacingCssVar(token)).toBe(expected[token])
      expect(spacingVar(token)).toBe(`var(${expected[token]})`)
    }
  })

  it('orders tokens from smallest to largest px', () => {
    const pxValues = spacingTokenOrder.map((token) => spacingTokens[token].px)
    expect(pxValues).toEqual([...pxValues].sort((a, b) => a - b))
  })
})
