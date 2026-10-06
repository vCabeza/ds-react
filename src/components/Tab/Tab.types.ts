import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Visual variants for Tab. Strictly Pill and Underline only. */
export type TabVariant = 'Pill' | 'Underline'

/**
 * Individual tab trigger (`role="tab"`).
 *
 * Works standalone (controlled via `isSelected`) or inside `Tabs` / `TabList`,
 * where React Aria manages selection and keyboard navigation.
 * Optional `badge` slot should receive the design-system `Badge` component.
 */
export interface TabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'children' | 'className'> {
  /** Stable id used as the selection key and to pair with `TabPanel`. */
  id: string
  /** Visual variant. Inherited from `Tabs` when omitted inside a tab list. */
  variant?: TabVariant
  /** Selected state for standalone usage. Ignored when inside `Tabs` (Aria-owned). */
  isSelected?: boolean
  /** Optional badge slot (use the DS `Badge` component). */
  badge?: ReactNode
  children: ReactNode
  className?: string
}
