'use client'

import { type ReactNode } from 'react'
import {
  mergeInteractionProps,
  useFocusVisible,
  useHover,
  usePressHandler,
  usePressed,
} from '@utils/interaction'
import './Tab.styles'
import { useOptionalTabsContext } from '../tabs/Tabs.context'
import { panelDomId, tabDomId } from '../tabs/Tabs.ids'
import type { TabProps, TabVariant } from './Tab.types'
import { tabClassName } from './Tab.variants'

function TabContent({
  children,
  badge,
}: {
  children: ReactNode
  badge?: ReactNode
}) {
  return (
    <>
      <span className="ds-tab__label">{children}</span>
      {badge != null ? <span className="ds-tab__badge">{badge}</span> : null}
    </>
  )
}

/**
 * Tab trigger (`role="tab"`). Inside `Tabs`, selection/keyboard come from context.
 * Standalone uses `isSelected`. No `mobile` prop — sizing is CSS media-query only.
 */
export function Tab({
  id,
  children,
  badge,
  className,
  variant,
  isSelected = false,
}: TabProps) {
  const ctx = useOptionalTabsContext()
  const resolvedVariant: TabVariant = variant ?? ctx?.variant ?? 'Pill'
  const inCollection = ctx != null
  const selected = inCollection ? ctx.selectedKey === id : isSelected

  const { focusProps, isFocused, isFocusVisible } = useFocusVisible()
  const { hoverProps, isHovered } = useHover({})
  const { pressProps, isPressed } = usePressed({})
  const { pressHandlerProps } = usePressHandler({
    ...(inCollection
      ? {
          onPress: () => {
            ctx.select(id)
          },
        }
      : {}),
  })

  const interactionProps = mergeInteractionProps(
    focusProps as Record<string, unknown>,
    hoverProps as Record<string, unknown>,
    pressProps as Record<string, unknown>,
    inCollection ? (pressHandlerProps as Record<string, unknown>) : undefined,
  )

  const domId = inCollection ? tabDomId(id) : id

  return (
    <button
      {...interactionProps}
      type="button"
      role="tab"
      id={domId}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      {...(inCollection ? { 'aria-controls': panelDomId(id) } : {})}
      className={tabClassName({ variant: resolvedVariant, className })}
      data-variant={resolvedVariant}
      data-selected={selected || undefined}
      data-hovered={isHovered || undefined}
      data-pressed={isPressed || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <TabContent {...(badge !== undefined ? { badge } : {})}>{children}</TabContent>
    </button>
  )
}

Tab.displayName = 'Tab'
