'use client'

import {
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type Key,
} from 'react-aria-components'
import { TabsContext, useTabsContext } from './Tabs.context'
import type { TabListProps, TabPanelProps, TabsProps } from './Tabs.types'
import { tabListClassName, tabPanelClassName, tabsClassName } from './Tabs.variants'

/**
 * Accessible tabs orchestration container.
 *
 * Provides selection state, keyboard navigation, and variant context to child
 * `Tab` items via React Aria Components (`Tabs`, `TabList`, `TabPanel`).
 * Inter-tab spacing is CSS media-query driven (≤768px / >768px).
 *
 * Variants are strictly `Pill` and `Underline`.
 */
export function Tabs({
  children,
  className,
  variant = 'Pill',
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  'aria-label': ariaLabel,
}: TabsProps) {
  const contextValue =
    ariaLabel !== undefined
      ? { variant, 'aria-label': ariaLabel }
      : { variant }

  const selectionProps = {
    ...(selectedKey !== undefined ? { selectedKey } : {}),
    ...(defaultSelectedKey !== undefined ? { defaultSelectedKey } : {}),
    ...(onSelectionChange !== undefined
      ? {
          onSelectionChange: (key: Key) => {
            onSelectionChange(String(key))
          },
        }
      : {}),
  }

  return (
    <TabsContext.Provider value={contextValue}>
      <AriaTabs
        {...selectionProps}
        className={tabsClassName({ variant, className })}
        data-variant={variant}
      >
        {children}
      </AriaTabs>
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'

/**
 * Tab list (`role="tablist"`). Inherits variant spacing from the parent `Tabs`.
 */
export function TabList({ children, className }: TabListProps) {
  const ctx = useTabsContext()
  const ariaLabel = ctx['aria-label']

  return (
    <AriaTabList
      className={tabListClassName({ variant: ctx.variant, className })}
      data-variant={ctx.variant}
      {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
    >
      {children}
    </AriaTabList>
  )
}

TabList.displayName = 'TabList'

/**
 * Tab panel (`role="tabpanel"`), shown when its `id` matches the selected tab.
 */
export function TabPanel({ id, children, className }: TabPanelProps) {
  return (
    <AriaTabPanel id={id} className={tabPanelClassName({ className })}>
      {children}
    </AriaTabPanel>
  )
}

TabPanel.displayName = 'TabPanel'
