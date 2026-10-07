import type { SpacingToken } from '../../tokens/spacing'
import type { TypographyVariant } from '../../tokens/typography'

/** Layout metrics for Tab (CSS viewport modes only; no JS `mobile` prop). */
export const tabMetrics = {
  desktop: {
    mediaQuery: '(min-width: 769px)' as const,
    heightPx: 50,
    height: '3.125rem',
    pillPaddingBlockToken: '3XS' as SpacingToken,
    pillPaddingBlock: 'var(--ds-space-3xs, 0.25rem)',
    pillPaddingInlineToken: 'S' as SpacingToken,
    pillPaddingInline: 'var(--ds-space-s, 1rem)',
    gapToken: '2XS' as SpacingToken,
    gap: 'var(--ds-space-2xs, 0.5rem)',
  },
  mobile: {
    mediaQuery: '(max-width: 768px)' as const,
    heightPx: 42,
    height: '2.625rem',
    pillPaddingBlockToken: '0' as SpacingToken,
    pillPaddingBlock: 'var(--ds-space-0, 0)',
    pillPaddingInlineToken: 'XS' as SpacingToken,
    pillPaddingInline: 'var(--ds-space-xs, 0.75rem)',
    gapToken: '3XS' as SpacingToken,
    gap: 'var(--ds-space-3xs, 0.25rem)',
  },
  typographyVariant: 'body-m' as TypographyVariant,
  fontWeight: 700,
  pillBorderRadius: '100px',
  underlineIndicatorHeight: '3px',
  underlineFocusRadius: '4px',
} as const
