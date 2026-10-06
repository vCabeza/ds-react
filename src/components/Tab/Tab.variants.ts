import { cx } from '../../lib/dom'
import type { TabVariant } from './Tab.types'

const variantClass: Record<TabVariant, string> = {
  Pill: 'ds-tab--Pill',
  Underline: 'ds-tab--Underline',
}

/** Class names for a Tab trigger including variant. */
export function tabClassName(options: {
  variant: TabVariant
  className?: string | undefined
}): string {
  return cx('ds-tab', variantClass[options.variant], options.className)
}
