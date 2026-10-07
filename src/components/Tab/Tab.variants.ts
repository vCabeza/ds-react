import { cx } from '@utils/dom'
import type { TabVariant } from './Tab.types'

const variantClass: Record<TabVariant, string> = {
  Pill: 'ds-tab--Pill',
  Underline: 'ds-tab--Underline',
}

export function tabClassName(options: {
  variant: TabVariant
  className?: string | undefined
}): string {
  return cx('ds-tab', variantClass[options.variant], options.className)
}
