/**
 * Size contract for Badge viewport modes (CSS media queries, not props).
 * - Desktop: `(min-width: 769px)` — default styles in `Badge.css`
 * - Mobile: `(max-width: 768px)`
 */
export const badgeMetrics = {
  desktop: {
    mediaQuery: '(min-width: 769px)',
    paddingBlockToken: '3XS',
    paddingInlineToken: '2XS',
    paddingBlockCssVar: '--ds-space-3xs',
    paddingInlineCssVar: '--ds-space-2xs',
    paddingBlock: 'var(--ds-space-3xs, 0.25rem)',
    paddingInline: 'var(--ds-space-2xs, 0.5rem)',
    borderRadiusCssVar: '--ds-radius-lg',
    typographyVariant: 'body-s',
    fontWeight: 700,
    textColorToken: 'OnNeutral',
    textColorCssVar: '--OnNeutral',
    height: '1.625rem',
    minWidth: '3.375rem',
  },
  mobile: {
    mediaQuery: '(max-width: 768px)',
    paddingBlockToken: '4XS',
    paddingInlineToken: '3XS',
    paddingBlockCssVar: '--ds-space-4xs',
    paddingInlineCssVar: '--ds-space-3xs',
    paddingBlock: 'var(--ds-space-4xs, 0.125rem)',
    paddingInline: 'var(--ds-space-3xs, 0.25rem)',
    borderRadiusCssVar: '--ds-radius-md',
    typographyVariant: 'body-s',
    fontWeight: 700,
    textColorToken: 'OnNeutral',
    textColorCssVar: '--OnNeutral',
    height: '1.375rem',
    minWidth: '2.875rem',
  },
} as const
