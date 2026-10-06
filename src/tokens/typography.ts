/**
 * Typography scale for body text.
 *
 * CSS mirrors size/line-height via `--font-size-body-*` and `--line-height-body-*`.
 * Font files are loaded from `@fontsource/inter`.
 */
const typographyTokensDefinition = {
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
} as const

/** Frozen typography token map. */
export const typographyTokens: Readonly<typeof typographyTokensDefinition> =
  Object.freeze(typographyTokensDefinition)

/** Variant keys of the typography scale. */
export type TypographyVariant = keyof typeof typographyTokensDefinition

/** Value shape for a single typography variant. */
export type TypographyToken = (typeof typographyTokensDefinition)[TypographyVariant]
