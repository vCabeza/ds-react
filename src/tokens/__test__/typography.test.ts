import { describe, expect, it } from 'vitest'
import { typographyTokens, type TypographyVariant } from '../typography'

describe('typographyTokens', () => {
  it('defines only body-m and body-s with Inter metrics', () => {
    expect(typographyTokens).toEqual({
      'body-m': {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontFamily: "'Inter', sans-serif",
      },
      'body-s': {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        fontFamily: "'Inter', sans-serif",
      },
    })
  })

  it('is frozen and rejects mutation', () => {
    expect(Object.isFrozen(typographyTokens)).toBe(true)
    expect(() => {
      ;(typographyTokens as { 'body-m': { fontSize: string } })['body-m'] = {
        fontSize: '99rem',
      }
    }).toThrow()
    expect(typographyTokens['body-m'].fontSize).toBe('0.875rem')
  })

  it('contains no duplicate token keys', () => {
    const keys = Object.keys(typographyTokens) as TypographyVariant[]
    expect(keys).toEqual(['body-m', 'body-s'])
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('uses 150% line height for both body variants', () => {
    expect(typographyTokens['body-m'].lineHeight).toBe(1.5)
    expect(typographyTokens['body-s'].lineHeight).toBe(1.5)
  })
})
