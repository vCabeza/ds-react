import type { SpacingToken } from '../../tokens/spacing'
import type { TabsVariant } from './Tabs.types'

/** TabList gap metrics (CSS viewport modes only; no JS `mobile` prop). */
export const tabsMetrics = {
  desktop: {
    mediaQuery: '(min-width: 769px)' as const,
    tabListGap: {
      Pill: { token: 'XS' as SpacingToken, css: 'var(--ds-space-xs, 0.75rem)', px: 12 },
      Underline: { token: 'XL' as SpacingToken, css: 'var(--ds-space-xl, 2rem)', px: 32 },
    } satisfies Record<TabsVariant, { token: SpacingToken; css: string; px: number }>,
  },
  mobile: {
    mediaQuery: '(max-width: 768px)' as const,
    tabListGap: {
      Pill: { token: '2XS' as SpacingToken, css: 'var(--ds-space-2xs, 0.5rem)', px: 8 },
      Underline: { token: 'L' as SpacingToken, css: 'var(--ds-space-l, 1.5rem)', px: 24 },
    } satisfies Record<TabsVariant, { token: SpacingToken; css: string; px: number }>,
  },
} as const
