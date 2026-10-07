import type { HTMLAttributes, ReactNode } from 'react'
import type { TabVariant } from '../tab/Tab.types'

/** @deprecated Prefer `TabVariant` from the Tab module; alias kept for Tabs consumers. */
export type TabsVariant = TabVariant

export interface TabsProps {
  /** Controlled selected tab id. */
  selectedKey?: string
  /** Uncontrolled initial selection; defaults to the first tab. */
  defaultSelectedKey?: string
  onSelectionChange?: (key: string) => void
  /** @default 'Pill' */
  variant?: TabsVariant
  children: ReactNode
  className?: string
  /** Name for the tab list when no visible label is present. */
  'aria-label'?: string
}

export interface TabListProps {
  children: ReactNode
  className?: string
}

export interface TabPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'children' | 'className'> {
  /** Must match the corresponding `Tab` id. */
  id: string
  children: ReactNode
  className?: string
}
