import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { colorTokens } from '@tokens/color'
import { spacingTokens } from '@tokens/spacing'
import { typographyTokens } from '@tokens/typography'
import { Badge } from '../Badge'
import { badgeMetrics } from '../Badge.metrics'
import { badgeClassName } from '../Badge.variants'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('defaults to Neutral without a mobile prop or class', () => {
    render(<Badge>Neutral</Badge>)
    const badge = screen.getByText('Neutral')
    expect(badge.tagName).toBe('SPAN')
    expect(badge).toHaveClass('ds-badge', 'ds-badge--Neutral')
    expect(badge).not.toHaveClass('ds-badge--mobile')
    expect(badge).toHaveAttribute('data-variant', 'Neutral')
    expect(badge).not.toHaveAttribute('data-mobile')
    expect(badge).not.toHaveAttribute('mobile')
  })

  it.each(['Neutral', 'Positive', 'Negative'] as const)(
    'applies the %s variant class',
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>)
      expect(screen.getByText(variant)).toHaveClass(`ds-badge--${variant}`)
      expect(screen.getByText(variant)).toHaveAttribute('data-variant', variant)
    },
  )

  it('appends a custom className and forwards HTML attributes', () => {
    render(
      <Badge className="extra" id="badge-1" aria-label="Status badge">
        Tag
      </Badge>,
    )
    const badge = screen.getByText('Tag')
    expect(badge).toHaveClass('extra')
    expect(badge).toHaveAttribute('id', 'badge-1')
    expect(badge).toHaveAttribute('aria-label', 'Status badge')
  })

  it('maps desktop viewport metrics to spacing 3XS/2XS and height 26px', () => {
    const desktop = badgeMetrics.desktop
    expect(desktop.mediaQuery).toBe('(min-width: 769px)')
    expect(desktop.paddingBlockToken).toBe('3XS')
    expect(desktop.paddingInlineToken).toBe('2XS')
    expect(spacingTokens[desktop.paddingBlockToken].px).toBe(4)
    expect(spacingTokens[desktop.paddingInlineToken].px).toBe(8)
    expect(desktop.paddingBlock).toBe('var(--ds-space-3xs, 0.25rem)')
    expect(desktop.paddingInline).toBe('var(--ds-space-2xs, 0.5rem)')
    expect(desktop.typographyVariant).toBe('body-s')
    expect(typographyTokens['body-s'].fontSize).toBe('0.75rem')
    expect(desktop.fontWeight).toBe(700)
    expect(desktop.textColorToken).toBe('OnNeutral')
    expect(colorTokens.OnNeutral).toBe('#1B2134')
    expect(desktop.borderRadiusCssVar).toBe('--ds-radius-lg')
    expect(desktop.height).toBe('1.625rem')
    expect(desktop.minWidth).toBe('3.375rem')
  })

  it('maps mobile viewport metrics to spacing 4XS/3XS at max-width 768px', () => {
    const mobile = badgeMetrics.mobile
    expect(mobile.mediaQuery).toBe('(max-width: 768px)')
    expect(mobile.paddingBlockToken).toBe('4XS')
    expect(mobile.paddingInlineToken).toBe('3XS')
    expect(spacingTokens[mobile.paddingBlockToken].px).toBe(2)
    expect(spacingTokens[mobile.paddingInlineToken].px).toBe(4)
    expect(mobile.paddingBlock).toBe('var(--ds-space-4xs, 0.125rem)')
    expect(mobile.paddingInline).toBe('var(--ds-space-3xs, 0.25rem)')
    expect(mobile.borderRadiusCssVar).toBe('--ds-radius-md')
    expect(mobile.height).toBe('1.375rem')
    expect(mobile.minWidth).toBe('2.875rem')
  })

  it('applies desktop padding tokens and exact height in the default (wide) viewport', () => {
    render(<Badge variant="Neutral">Label</Badge>)
    const badge = screen.getByText('Label')
    const styles = getComputedStyle(badge)
    expect(badge).toHaveClass('ds-badge')
    expect(styles.boxSizing).toBe('border-box')
    expect(styles.display).toBe('inline-flex')
    expect(styles.marginTop).toMatch(/^0(px)?$/)
    expect(styles.marginBottom).toMatch(/^0(px)?$/)
    expect(['26px', '1.625rem']).toContain(styles.height)
    expect(['4px', '0.25rem', badgeMetrics.desktop.paddingBlock]).toContain(styles.paddingTop)
    expect(['4px', '0.25rem', badgeMetrics.desktop.paddingBlock]).toContain(styles.paddingBottom)
    expect(['8px', '0.5rem', badgeMetrics.desktop.paddingInline]).toContain(styles.paddingLeft)
    expect(['8px', '0.5rem', badgeMetrics.desktop.paddingInline]).toContain(styles.paddingRight)
    expect(styles.fontWeight).toMatch(/700|bold/)
  })

  it('builds class names through the variant map without a mobile class', () => {
    expect(badgeClassName({ variant: 'Negative', className: 'x' })).toBe(
      'ds-badge ds-badge--Negative x',
    )
  })

  it('has no obvious axe violations', async () => {
    const { container } = render(
      <>
        <Badge variant="Neutral">Neutral</Badge>
        <Badge variant="Positive">Positive</Badge>
        <Badge variant="Negative">Negative</Badge>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
