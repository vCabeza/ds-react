/**
 * Design-system color tokens.
 * Hex values are the single source of truth; CSS custom properties mirror each key once.
 */
const colorTokensDefinition = {
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
} as const

/** Frozen color token registry (exactly 11 keys). */
export const colorTokens: Readonly<typeof colorTokensDefinition> =
  Object.freeze(colorTokensDefinition)

/** Token name keys of the color registry. */
export type ColorToken = keyof typeof colorTokensDefinition

/** Hex string value for a color token. */
export type ColorHexValue = (typeof colorTokensDefinition)[ColorToken]
