import { cx } from '../../lib/dom'
import type { BadgeVariant } from './Badge.types'

const variantClass: Record<BadgeVariant, string> = {
  Neutral: 'ds-badge--Neutral',
  Positive: 'ds-badge--Positive',
  Negative: 'ds-badge--Negative',
}

export function badgeClassName(options: {
  variant: BadgeVariant
  className?: string | undefined
}): string {
  return cx('ds-badge', variantClass[options.variant], options.className)
}
