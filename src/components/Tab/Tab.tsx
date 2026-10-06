'use client'

import { useRef, type ReactNode } from 'react'
import { mergeProps, useFocusRing, useHover, usePress } from 'react-aria'
import { Tab as AriaTab } from 'react-aria-components'
import { useOptionalTabsContext } from '../Tabs/Tabs.context'
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

function CollectionTab({
  id,
  children,
  badge,
  className,
  variant,
}: {
  id: string
  children: ReactNode
  badge?: ReactNode
  className?: string
  variant: TabVariant
}) {
  return (
    <AriaTab
      id={id}
      className={tabClassName({ variant, className })}
      data-variant={variant}
    >
      <TabContent {...(badge !== undefined ? { badge } : {})}>{children}</TabContent>
    </AriaTab>
  )
}

function StandaloneTab({
  id,
  children,
  badge,
  className,
  variant,
  isSelected,
}: {
  id: string
  children: ReactNode
  badge?: ReactNode
  className?: string
  variant: TabVariant
  isSelected: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const { focusProps, isFocused, isFocusVisible } = useFocusRing()
  const { hoverProps, isHovered } = useHover({})
  const { pressProps, isPressed } = usePress({})

  return (
    <button
      {...mergeProps(focusProps, hoverProps, pressProps)}
      ref={ref}
      type="button"
      role="tab"
      id={id}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={tabClassName({ variant, className })}
      data-variant={variant}
      data-selected={isSelected || undefined}
      data-hovered={isHovered || undefined}
      data-pressed={isPressed || undefined}
      data-focused={isFocused || undefined}
      data-focus-visible={isFocusVisible || undefined}
    >
      <TabContent {...(badge !== undefined ? { badge } : {})}>{children}</TabContent>
    </button>
  )
}

/**
 * Individual interactive tab item.
 *
 * - Inside `Tabs` / `TabList`: uses React Aria Components `Tab` for collection
 *   selection, keyboard navigation, and ARIA wiring. Variant comes from context
 *   unless overridden.
 * - Standalone: renders a semantic `button` with `role="tab"`, `aria-selected`,
 *   and `tabIndex`, with hover / press / focus-visible from React Aria hooks.
 *
 * Variants are strictly `Pill` and `Underline`. Interactive visuals map to
 * Default / Hover / Active / Focus via data attributes. Responsive sizing is
 * CSS media-query driven (≤768px / >768px); there is no `mobile` prop.
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
  const resolvedVariant = variant ?? ctx?.variant ?? 'Pill'

  if (ctx != null) {
    return (
      <CollectionTab
        id={id}
        variant={resolvedVariant}
        {...(badge !== undefined ? { badge } : {})}
        {...(className !== undefined ? { className } : {})}
      >
        {children}
      </CollectionTab>
    )
  }

  return (
    <StandaloneTab
      id={id}
      variant={resolvedVariant}
      isSelected={isSelected}
      {...(badge !== undefined ? { badge } : {})}
      {...(className !== undefined ? { className } : {})}
    >
      {children}
    </StandaloneTab>
  )
}

Tab.displayName = 'Tab'
