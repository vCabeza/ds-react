'use client'

import './Tabs.styles'
import {
  Children,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import type { TabProps } from '../tab/Tab.types'
import { TabsContext, useTabsContext } from './Tabs.context'
import { panelDomId, tabDomId } from './Tabs.ids'
import {
  getFirstTabKey,
  getLastTabKey,
  getNextTabKey,
  getPreviousTabKey,
} from './Tabs.keyboard'
import type { TabListProps, TabPanelProps, TabsProps } from './Tabs.types'
import { tabListClassName, tabPanelClassName, tabsClassName } from './Tabs.variants'

function collectTabIds(children: ReactNode): string[] {
  const ids: string[] = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return
    }
    const element = child as ReactElement<TabProps>
    if (typeof element.props.id === 'string') {
      ids.push(element.props.id)
    }
  })
  return ids
}

export function Tabs({
  children,
  className,
  variant = 'Pill',
  selectedKey: selectedKeyProp,
  defaultSelectedKey,
  onSelectionChange,
  'aria-label': ariaLabel,
}: TabsProps) {
  const isControlled = selectedKeyProp !== undefined
  const [uncontrolledKey, setUncontrolledKey] = useState<string | null>(
    defaultSelectedKey ?? null,
  )
  const [tabIds, setTabIds] = useState<readonly string[]>([])

  const selectedKey = isControlled ? (selectedKeyProp ?? null) : uncontrolledKey

  const registerTabIds = useCallback(
    (ids: string[]) => {
      setTabIds((prev) => {
        if (prev.length === ids.length && prev.every((id, index) => id === ids[index])) {
          return prev
        }
        return ids
      })

      if (!isControlled) {
        setUncontrolledKey((current) => {
          if (current != null && ids.includes(current)) {
            return current
          }
          if (defaultSelectedKey != null && ids.includes(defaultSelectedKey)) {
            return defaultSelectedKey
          }
          return ids[0] ?? null
        })
      }
    },
    [defaultSelectedKey, isControlled],
  )

  const select = useCallback(
    (key: string) => {
      if (!isControlled) {
        setUncontrolledKey(key)
      }
      onSelectionChange?.(key)
    },
    [isControlled, onSelectionChange],
  )

  const contextValue = useMemo(() => {
    const base = {
      variant,
      selectedKey,
      select,
      tabIds,
      registerTabIds,
      tabDomId,
      panelDomId,
    }
    return ariaLabel !== undefined ? { ...base, 'aria-label': ariaLabel } : base
  }, [ariaLabel, registerTabIds, select, selectedKey, tabIds, variant])

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={tabsClassName({ variant, className })} data-variant={variant}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'

export function TabList({ children, className }: TabListProps) {
  const ctx = useTabsContext()
  const ariaLabel = ctx['aria-label']
  const listRef = useRef<HTMLDivElement>(null)

  const { registerTabIds } = ctx

  useLayoutEffect(() => {
    registerTabIds(collectTabIds(children))
  }, [children, registerTabIds])

  const focusTab = (key: string) => {
    const node = listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(tabDomId(key))}`)
    node?.focus()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const target = event.target
    if (!(target instanceof HTMLElement) || target.getAttribute('role') !== 'tab') {
      return
    }

    const currentKey =
      ctx.tabIds.find((id) => tabDomId(id) === target.id) ?? ctx.selectedKey

    let nextKey: string | null = null
    switch (event.key) {
      case 'ArrowRight':
        nextKey = getNextTabKey(ctx.tabIds, currentKey)
        break
      case 'ArrowLeft':
        nextKey = getPreviousTabKey(ctx.tabIds, currentKey)
        break
      case 'Home':
        nextKey = getFirstTabKey(ctx.tabIds)
        break
      case 'End':
        nextKey = getLastTabKey(ctx.tabIds)
        break
      default:
        return
    }

    if (nextKey == null) {
      return
    }

    event.preventDefault()
    ctx.select(nextKey)
    focusTab(nextKey)
  }

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus -- composite: roving tabindex on child tabs
    <div
      ref={listRef}
      role="tablist"
      className={tabListClassName({ variant: ctx.variant, className })}
      data-variant={ctx.variant}
      onKeyDown={handleKeyDown}
      {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
    >
      {children}
    </div>
  )
}

TabList.displayName = 'TabList'

export function TabPanel({ id, children, className, ...rest }: TabPanelProps) {
  const ctx = useTabsContext()
  const isSelected = ctx.selectedKey === id

  return (
    <div
      {...rest}
      role="tabpanel"
      id={panelDomId(id)}
      aria-labelledby={tabDomId(id)}
      hidden={!isSelected}
      className={tabPanelClassName({ className })}
    >
      {isSelected ? children : null}
    </div>
  )
}

TabPanel.displayName = 'TabPanel'
