import type { HTMLAttributes, ReactNode } from 'react'
import type { TabVariant } from '../Tab/Tab.types'

/** @deprecated Prefer `TabVariant` from the Tab module; alias kept for Tabs consumers. */
export type TabsVariant = TabVariant

/**
 * Root Tabs container. Selection is string-keyed; interactive states
 * (Default / Hover / Active / Focus) are driven by React Aria data attributes
 * on child `Tab` items.
 */
export interface TabsProps {
  /** Controlled selected tab id. */
  selectedKey?: string
  /** Uncontrolled initial selected tab id. Defaults to the first tab. */
  defaultSelectedKey?: string
  /** Fires when the selected tab id changes. */
  onSelectionChange?: (key: string) => void
  /** Visual variant propagated to child tabs. Defaults to `Pill`. */
  variant?: TabsVariant
  children: ReactNode
  className?: string
  /** Accessible name for the tab list when no visible label is present. */
  'aria-label'?: string
}

/** Horizontal list of tabs (`role="tablist"`). */
export interface TabListProps {
  children: ReactNode
  className?: string
}

/** Tab panel content (`role="tabpanel"`), paired to a tab by `id`. */
export interface TabPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children' | 'className'> {
  /** Must match the corresponding `Tab` id. */
  id: string
  children: ReactNode
  className?: string
}
