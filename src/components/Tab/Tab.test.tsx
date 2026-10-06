import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Badge } from '../Badge'
import { spacingTokens } from '../../tokens/spacing'
import { typographyTokens } from '../../tokens/typography'
import { Tab } from './Tab'
import { tabMetrics } from './Tab.metrics'
import { tabClassName } from './Tab.variants'

describe('Tab', () => {
  it('renders standalone with role="tab" and children', () => {
    render(
      <Tab id="emails" isSelected>
        Emails
      </Tab>,
    )
    const tab = screen.getByRole('tab', { name: 'Emails' })
    expect(tab.tagName).toBe('BUTTON')
    expect(tab).toHaveAttribute('aria-selected', 'true')
    expect(tab).toHaveAttribute('tabindex', '0')
    expect(tab).toHaveClass('ds-tab', 'ds-tab--Pill')
    expect(tab).toHaveAttribute('data-selected')
  })

  it('toggles aria-selected and tabIndex from isSelected', () => {
    const { rerender } = render(
      <Tab id="files" isSelected={false}>
        Files
      </Tab>,
    )
    let tab = screen.getByRole('tab', { name: 'Files' })
    expect(tab).toHaveAttribute('aria-selected', 'false')
    expect(tab).toHaveAttribute('tabindex', '-1')
    expect(tab).not.toHaveAttribute('data-selected')

    rerender(
      <Tab id="files" isSelected>
        Files
      </Tab>,
    )
    tab = screen.getByRole('tab', { name: 'Files' })
    expect(tab).toHaveAttribute('aria-selected', 'true')
    expect(tab).toHaveAttribute('tabindex', '0')
    expect(tab).toHaveAttribute('data-selected')
  })

  it('applies Pill and Underline variant classes', () => {
    const { rerender } = render(
      <Tab id="a" variant="Pill">
        A
      </Tab>,
    )
    expect(screen.getByRole('tab')).toHaveClass('ds-tab--Pill')
    expect(screen.getByRole('tab')).toHaveAttribute('data-variant', 'Pill')

    rerender(
      <Tab id="a" variant="Underline">
        A
      </Tab>,
    )
    expect(screen.getByRole('tab')).toHaveClass('ds-tab--Underline')
    expect(screen.getByRole('tab')).toHaveAttribute('data-variant', 'Underline')
  })

  it('renders the badge slot when provided and omits it otherwise', () => {
    const { rerender } = render(
      <Tab id="files" badge={<Badge variant="Negative">!</Badge>}>
        Files
      </Tab>,
    )
    const tab = screen.getByRole('tab', { name: /Files/ })
    expect(tab.querySelector('.ds-tab__badge')).not.toBeNull()
    expect(tab.querySelector('.ds-badge')).toHaveTextContent('!')

    rerender(<Tab id="files">Files</Tab>)
    expect(screen.getByRole('tab').querySelector('.ds-tab__badge')).toBeNull()
  })

  it('supports keyboard focus', async () => {
    const user = userEvent.setup()
    render(
      <Tab id="emails" isSelected>
        Emails
      </Tab>,
    )
    await user.tab()
    expect(screen.getByRole('tab')).toHaveFocus()
  })

  it('appends a custom className', () => {
    render(
      <Tab id="x" className="extra">
        X
      </Tab>,
    )
    expect(screen.getByRole('tab')).toHaveClass('extra')
  })

  it('has no axe violations when placed in a tablist', async () => {
    const { container } = render(
      <div role="tablist" aria-label="Sample">
        <Tab id="emails" isSelected badge={<Badge>12</Badge>}>
          Emails
        </Tab>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Tab.variants', () => {
  it('builds class names for both variants', () => {
    expect(tabClassName({ variant: 'Pill' })).toBe('ds-tab ds-tab--Pill')
    expect(tabClassName({ variant: 'Underline', className: 'x' })).toBe(
      'ds-tab ds-tab--Underline x',
    )
  })
})

describe('Tab.metrics', () => {
  it('maps desktop padding and gap tokens', () => {
    const { desktop } = tabMetrics
    expect(desktop.mediaQuery).toBe('(min-width: 769px)')
    expect(desktop.heightPx).toBe(50)
    expect(spacingTokens[desktop.pillPaddingBlockToken].px).toBe(4)
    expect(spacingTokens[desktop.pillPaddingInlineToken].px).toBe(16)
    expect(spacingTokens[desktop.gapToken].px).toBe(8)
  })

  it('maps mobile padding and gap tokens', () => {
    const { mobile } = tabMetrics
    expect(mobile.mediaQuery).toBe('(max-width: 768px)')
    expect(mobile.heightPx).toBe(42)
    expect(spacingTokens[mobile.pillPaddingBlockToken].px).toBe(0)
    expect(spacingTokens[mobile.pillPaddingInlineToken].px).toBe(12)
    expect(spacingTokens[mobile.gapToken].px).toBe(4)
  })

  it('uses body-m typography at weight 700', () => {
    expect(tabMetrics.typographyVariant).toBe('body-m')
    expect(typographyTokens['body-m'].fontSize).toBe('0.875rem')
    expect(tabMetrics.fontWeight).toBe(700)
  })
})
