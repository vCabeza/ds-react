import type { HTMLAttributes, ReactNode } from 'react'

/** Visual surface variant for Badge. */
export type BadgeVariant = 'Neutral' | 'Positive' | 'Negative'

/**
 * Public Badge props.
 * Responsive size modes are CSS viewport-driven (`max-width: 768px`), not props.
 */
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Surface color variant. @default 'Neutral' */
  variant?: BadgeVariant
  /** Visible label content. */
  children: ReactNode
  /** Extra class names appended after Badge classes. */
  className?: string
}
