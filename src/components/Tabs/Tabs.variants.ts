import { cx } from '../../lib/dom'
import type { TabsVariant } from './Tabs.types'

const tabsVariantClass: Record<TabsVariant, string> = {
  Pill: 'ds-tabs--Pill',
  Underline: 'ds-tabs--Underline',
}

const tabListVariantClass: Record<TabsVariant, string> = {
  Pill: 'ds-tab-list--Pill',
  Underline: 'ds-tab-list--Underline',
}

/** Root Tabs class names including variant. */
export function tabsClassName(options: {
  variant: TabsVariant
  className?: string | undefined
}): string {
  return cx('ds-tabs', tabsVariantClass[options.variant], options.className)
}

/** TabList class names including variant gap rules. */
export function tabListClassName(options: {
  variant: TabsVariant
  className?: string | undefined
}): string {
  return cx('ds-tab-list', tabListVariantClass[options.variant], options.className)
}

/** TabPanel class names. */
export function tabPanelClassName(options: { className?: string | undefined }): string {
  return cx('ds-tab-panel', options.className)
}
