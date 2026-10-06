import { describe, expect, it } from 'vitest'
import { colorTokens } from './colors'
import { typographyTokens } from './typography'
import * as tokens from './index'

describe('token modules', () => {
  it('exports the purged color registry', () => {
    expect(Object.keys(colorTokens)).toHaveLength(11)
    expect(colorTokens.Inverse).toBe('#1B2134')
    expect(colorTokens.OnInverse).toBe('#FFFFFF')
  })

  it('exports body typography tokens', () => {
    expect(typographyTokens['body-m'].fontSize).toBe('0.875rem')
    expect(typographyTokens['body-s'].fontFamily).toBe("'Inter', sans-serif")
  })

  it('re-exports the public token surface from the barrel', () => {
    expect(tokens.spacingTokens.S.px).toBe(16)
    expect(tokens.spacingTokenOrder).toHaveLength(10)
    expect(tokens.colorTokens.Outline).toBe('#D3D3DC')
    expect(tokens.typographyTokens['body-m'].lineHeight).toBe(1.5)
  })
})
