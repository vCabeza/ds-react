import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Badge } from '../Badge'
import { Tab } from '../Tab'
import { spacingTokens } from '../../tokens/spacing'
import { TabList, TabPanel, Tabs } from './Tabs'
import { tabsMetrics } from './Tabs.metrics'
import { tabListClassName, tabPanelClassName, tabsClassName } from './Tabs.variants'
import { useTabsContext } from './Tabs.context'

function BasicTabs(props: {
  variant?: 'Pill' | 'Underline'
  selectedKey?: string
  defaultSelectedKey?: string
  onSelectionChange?: (key: string) => void
  withBadge?: boolean
  'aria-label'?: string
  className?: string
}) {
  const {
    variant = 'Pill',
    withBadge = false,
    'aria-label': ariaLabel = 'Example tabs',
    className,
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
  } = props

  return (
    <Tabs
      variant={variant}
      aria-label={ariaLabel}
      {...(className !== undefined ? { className } : {})}
      {...(selectedKey !== undefined ? { selectedKey } : {})}
      {...(defaultSelectedKey !== undefined ? { defaultSelectedKey } : {})}
      {...(onSelectionChange !== undefined ? { onSelectionChange } : {})}
    >
      <TabList>
        <Tab
          id="emails"
          {...(withBadge ? { badge: <Badge variant="Neutral">12</Badge> } : {})}
        >
          Emails
        </Tab>
        <Tab id="files">Files</Tab>
        <Tab id="edits">Edits</Tab>
      </TabList>
      <TabPanel id="emails">Emails panel</TabPanel>
      <TabPanel id="files">Files panel</TabPanel>
      <TabPanel id="edits">Edits panel</TabPanel>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders tablist, tab, and tabpanel roles', () => {
    render(<BasicTabs />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
  })

  it('selects the first tab by default', () => {
    render(<BasicTabs />)
    expect(screen.getByRole('tab', { name: 'Emails' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Files' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Emails panel')
  })

  it('respects defaultSelectedKey', () => {
    render(<BasicTabs defaultSelectedKey="files" />)
    expect(screen.getByRole('tab', { name: 'Files' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Files panel')
  })

  it('respects controlled selectedKey', () => {
    render(<BasicTabs selectedKey="edits" />)
    expect(screen.getByRole('tab', { name: 'Edits' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Edits panel')
  })

  it('selects a tab on click and updates the panel', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    await user.click(screen.getByRole('tab', { name: 'Files' }))
    expect(screen.getByRole('tab', { name: 'Files' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Files panel')
  })

  it('navigates with ArrowRight / ArrowLeft', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)

    screen.getByRole('tab', { name: 'Emails' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Files' })).toHaveAttribute(
      'aria-selected',
      'true',
    )

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Emails' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('wraps from last tab to first with ArrowRight', async () => {
    const user = userEvent.setup()
    render(<BasicTabs defaultSelectedKey="edits" />)
    screen.getByRole('tab', { name: 'Edits' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Emails' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('supports Home and End keys', async () => {
    const user = userEvent.setup()
    render(<BasicTabs defaultSelectedKey="files" />)
    screen.getByRole('tab', { name: 'Files' }).focus()
    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Edits' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Emails' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('propagates Pill and Underline variant to the list and tabs', () => {
    const { rerender } = render(<BasicTabs variant="Pill" className="extra-root" />)
    expect(document.querySelector('.ds-tabs')).toHaveClass('ds-tabs--Pill', 'extra-root')
    expect(screen.getByRole('tablist')).toHaveClass('ds-tab-list--Pill')
    expect(screen.getByRole('tab', { name: 'Emails' })).toHaveClass('ds-tab--Pill')

    rerender(<BasicTabs variant="Underline" />)
    expect(document.querySelector('.ds-tabs')).toHaveClass('ds-tabs--Underline')
    expect(screen.getByRole('tablist')).toHaveClass('ds-tab-list--Underline')
    expect(screen.getByRole('tab', { name: 'Emails' })).toHaveClass('ds-tab--Underline')
  })

  it('renders badge slots inside collection tabs', () => {
    render(<BasicTabs withBadge />)
    const emails = screen.getByRole('tab', { name: /Emails/ })
    expect(within(emails).getByText('12')).toHaveClass('ds-badge')
  })

  it('fires onSelectionChange in controlled mode', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()
    render(<BasicTabs selectedKey="emails" onSelectionChange={onSelectionChange} />)
    await user.click(screen.getByRole('tab', { name: 'Files' }))
    expect(onSelectionChange).toHaveBeenCalledWith('files')
  })

  it('forwards className on TabList and TabPanel', () => {
    render(
      <Tabs aria-label="Forwarding" defaultSelectedKey="a">
        <TabList className="list-extra">
          <Tab id="a" className="tab-extra">
            A
          </Tab>
          <Tab id="b">B</Tab>
        </TabList>
        <TabPanel id="a" className="panel-extra">
          Panel A
        </TabPanel>
        <TabPanel id="b">Panel B</TabPanel>
      </Tabs>,
    )
    expect(screen.getByRole('tablist')).toHaveClass('list-extra')
    expect(screen.getByRole('tab', { name: 'A' })).toHaveClass('tab-extra')
    expect(screen.getByRole('tabpanel')).toHaveClass('panel-extra')
  })

  it('passes aria-label to the tablist and omits it when absent', () => {
    const { rerender } = render(<BasicTabs aria-label="Workspace sections" />)
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-label',
      'Workspace sections',
    )

    rerender(
      <Tabs variant="Pill" defaultSelectedKey="a">
        <TabList>
          <Tab id="a">A</Tab>
          <Tab id="b">B</Tab>
        </TabList>
        <TabPanel id="a">A</TabPanel>
        <TabPanel id="b">B</TabPanel>
      </Tabs>,
    )
    expect(screen.getByRole('tablist')).not.toHaveAttribute('aria-label')
  })

  it('ignores non-navigation keys and keydowns outside tabs', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)
    const emails = screen.getByRole('tab', { name: 'Emails' })
    emails.focus()
    await user.keyboard('{Escape}')
    expect(emails).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' })
    expect(emails).toHaveAttribute('aria-selected', 'true')
  })

  it('associates panels with aria-controls and aria-labelledby', () => {
    render(<BasicTabs />)
    const emails = screen.getByRole('tab', { name: 'Emails' })
    expect(emails).toHaveAttribute('aria-controls', 'ds-tabpanel-emails')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'ds-tab-emails')
  })

  it('falls back to the first tab when defaultSelectedKey is not in the list', () => {
    render(
      <Tabs defaultSelectedKey="missing" aria-label="Fallback tabs">
        <TabList>
          <Tab id="a">A</Tab>
          <Tab id="b">B</Tab>
        </TabList>
        <TabPanel id="a">Panel A</TabPanel>
        <TabPanel id="b">Panel B</TabPanel>
      </Tabs>,
    )
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(<BasicTabs withBadge />)
    expect(await axe(container)).toHaveNoViolations()
  })


  it('throws when TabList is used outside Tabs', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <TabList>
          <Tab id="x">X</Tab>
        </TabList>,
      ),
    ).toThrow(/must be used within <Tabs>/)
    spy.mockRestore()
  })
})

describe('Tabs.variants', () => {
  it('builds container class names', () => {
    expect(tabsClassName({ variant: 'Pill' })).toBe('ds-tabs ds-tabs--Pill')
    expect(tabsClassName({ variant: 'Underline', className: 'x' })).toBe(
      'ds-tabs ds-tabs--Underline x',
    )
    expect(tabListClassName({ variant: 'Pill' })).toBe('ds-tab-list ds-tab-list--Pill')
    expect(tabListClassName({ variant: 'Underline' })).toBe(
      'ds-tab-list ds-tab-list--Underline',
    )
    expect(tabPanelClassName({})).toBe('ds-tab-panel')
    expect(tabPanelClassName({ className: 'z' })).toBe('ds-tab-panel z')
  })
})

describe('Tabs.metrics', () => {
  it('maps desktop and mobile TabList gap tokens', () => {
    expect(spacingTokens[tabsMetrics.desktop.tabListGap.Pill.token].px).toBe(12)
    expect(spacingTokens[tabsMetrics.desktop.tabListGap.Underline.token].px).toBe(32)
    expect(spacingTokens[tabsMetrics.mobile.tabListGap.Pill.token].px).toBe(8)
    expect(spacingTokens[tabsMetrics.mobile.tabListGap.Underline.token].px).toBe(24)
  })
})

describe('useTabsContext', () => {
  it('throws outside of Tabs provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    function Probe() {
      useTabsContext()
      return null
    }
    expect(() => render(<Probe />)).toThrow(/must be used within <Tabs>/)
    spy.mockRestore()
  })
})
