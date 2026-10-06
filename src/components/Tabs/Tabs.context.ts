import { createContext, useContext } from 'react'
import type { TabVariant } from '../Tab/Tab.types'

export interface TabsContextValue {
  variant: TabVariant
  'aria-label'?: string
}

export const TabsContext = createContext<TabsContextValue | null>(null)

/** Reads Tabs context when present (null outside `<Tabs>`). */
export function useOptionalTabsContext(): TabsContextValue | null {
  return useContext(TabsContext)
}

/** Reads Tabs context; must be used under `<Tabs>`. */
export function useTabsContext(): TabsContextValue {
  const value = useOptionalTabsContext()
  if (value == null) {
    throw new Error('Tabs compound components must be used within <Tabs>.')
  }
  return value
}
