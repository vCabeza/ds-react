import { createContext, useContext } from 'react'
import type { TabVariant } from '../Tab/Tab.types'

export interface TabsContextValue {
  variant: TabVariant
  'aria-label'?: string
  selectedKey: string | null
  select: (key: string) => void
  tabIds: readonly string[]
  registerTabIds: (ids: string[]) => void
  tabDomId: (key: string) => string
  panelDomId: (key: string) => string
}

export const TabsContext = createContext<TabsContextValue | null>(null)

/** Returns null outside `<Tabs>`. */
export function useOptionalTabsContext(): TabsContextValue | null {
  return useContext(TabsContext)
}

/** Throws outside `<Tabs>`. */
export function useTabsContext(): TabsContextValue {
  const value = useOptionalTabsContext()
  if (value == null) {
    throw new Error('Tabs compound components must be used within <Tabs>.')
  }
  return value
}
