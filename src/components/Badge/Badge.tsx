'use client'

import './Badge.styles'
import type { BadgeProps } from './Badge.types'
import { badgeClassName } from './Badge.variants'

/**
 * Static status badge.
 *
 * Surfaces: Neutral (`SurfaceHigh`), Positive (`SurfacePositive`), Negative (`SurfaceNegative`).
 * Text uses `OnNeutral` with typography `body-s` (12px, Inter, 150% line-height) at weight 700.
 *
 * Size modes are viewport-driven:
 * - Desktop (`min-width: 769px`): height 26px, padding `3XS`/`2XS`
 * - Mobile (`max-width: 768px`): height 22px, padding `4XS`/`3XS`
 */
export function Badge({
  children,
  variant = 'Neutral',
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={badgeClassName({ variant, className })}
      data-variant={variant}
    >
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'
