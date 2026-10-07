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

export function tabsClassName(options: {
  variant: TabsVariant
  className?: string | undefined
}): string {
  return cx('ds-tabs', tabsVariantClass[options.variant], options.className)
}

export function tabListClassName(options: {
  variant: TabsVariant
  className?: string | undefined
}): string {
  return cx('ds-tab-list', tabListVariantClass[options.variant], options.className)
}

export function tabPanelClassName(options: { className?: string | undefined }): string {
  return cx('ds-tab-panel', options.className)
}
