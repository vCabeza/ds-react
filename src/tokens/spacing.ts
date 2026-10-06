/**
 * Core spacing scale for the design system.
 *
 * Values are the single source of truth for TypeScript consumers.
 * CSS custom properties in `src/styles/tokens.css` mirror these rem values
 * under the `--ds-space-*` prefix.
 */
const spacingTokensDefinition = {
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
} as const

/** Frozen spacing scale — mutate attempts throw in strict mode. */
export const spacingTokens: Readonly<typeof spacingTokensDefinition> =
  Object.freeze(spacingTokensDefinition)

/** Token name keys of the spacing scale. */
export type SpacingToken = keyof typeof spacingTokensDefinition

/** Pixel/rem pair for a single spacing step. */
export type SpacingValue = (typeof spacingTokensDefinition)[SpacingToken]

/** Ordered list of spacing token names from smallest to largest. */
export const spacingTokenOrder = [
  '0',
  '4XS',
  '3XS',
  '2XS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
] as const satisfies ReadonlyArray<SpacingToken>

/**
 * Maps a spacing token to its CSS custom property name.
 * Example: `spacingCssVar('3XS')` → `'--ds-space-3xs'`.
 */
export function spacingCssVar(token: SpacingToken): `--ds-space-${Lowercase<SpacingToken>}` {
  return `--ds-space-${token.toLowerCase() as Lowercase<SpacingToken>}`
}

/**
 * Returns `var(--ds-space-…)` for use in inline styles or CSS-in-JS.
 */
export function spacingVar(token: SpacingToken): `var(--ds-space-${Lowercase<SpacingToken>})` {
  return `var(${spacingCssVar(token)})`
}
