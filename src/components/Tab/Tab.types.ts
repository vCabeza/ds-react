import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Strictly `Pill` | `Underline`. */
export type TabVariant = 'Pill' | 'Underline'

/**
 * Tab trigger. Standalone via `isSelected`, or inside `Tabs` / `TabList` where
 * selection and keyboard are owned by the container. Pass DS `Badge` in `badge`.
 */
export interface TabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'children' | 'className'> {
  /** Selection key; pairs with `TabPanel` of the same id. */
  id: string
  /** Inherited from `Tabs` when omitted inside a tab list. */
  variant?: TabVariant
  /** Standalone only; ignored inside `Tabs`. */
  isSelected?: boolean
  /** Optional DS `Badge` (choose Badge variant on Badge itself). */
  badge?: ReactNode
  children: ReactNode
  className?: string
}
