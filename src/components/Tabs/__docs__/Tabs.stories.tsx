import { type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../../badge'
import { Tab } from '../../tab'
import type { TabVariant } from '../../tab/Tab.types'
import '../../tab/__docs__/tab-stories.css'
import { TabList, TabPanel, Tabs } from '../Tabs'

const variants: TabVariant[] = ['Pill', 'Underline']

const labelTabs = ['Label', 'Label', 'Label', 'Label', 'Label'] as const

const defaultChildren: ReactNode = (
  <>
    <TabList>
      <Tab id="emails">Emails</Tab>
      <Tab id="files">Files</Tab>
      <Tab id="edits">Edits</Tab>
    </TabList>
    <TabPanel id="emails">Emails content</TabPanel>
    <TabPanel id="files">Files content</TabPanel>
    <TabPanel id="edits">Edits content</TabPanel>
  </>
)

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    variant: 'Pill',
    'aria-label': 'Example tabs',
    children: defaultChildren,
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    selectedKey: { control: 'text' },
    defaultSelectedKey: { control: 'text' },
    onSelectionChange: { action: 'selectionChange' },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Specs card fixture: five tabs, first selected. */
function SpecsTabRow(props: {
  variant: TabVariant
  ariaLabel: string
  idPrefix: string
}) {
  const { variant, ariaLabel, idPrefix } = props

  return (
    <Tabs
      variant={variant}
      defaultSelectedKey={`${idPrefix}-0`}
      aria-label={ariaLabel}
    >
      <TabList>
        {labelTabs.map((label, index) => (
          <Tab key={`${idPrefix}-${index}`} id={`${idPrefix}-${index}`}>
            {label}
          </Tab>
        ))}
      </TabList>
      {labelTabs.map((_, index) => (
        <TabPanel key={`${idPrefix}-panel-${index}`} id={`${idPrefix}-${index}`}>
          {`Panel ${index + 1}`}
        </TabPanel>
      ))}
    </Tabs>
  )
}

function SpecsSection(props: { mobile?: boolean; idPrefix: string }) {
  const { mobile = false, idPrefix } = props
  const rows = (
    <>
      <div className="ds-story-row">
        <SpecsTabRow
          variant="Pill"
          ariaLabel={`${idPrefix} Pill`}
          idPrefix={`${idPrefix}-pill`}
        />
      </div>
      <div className="ds-story-row">
        <SpecsTabRow
          variant="Underline"
          ariaLabel={`${idPrefix} Underline`}
          idPrefix={`${idPrefix}-underline`}
        />
      </div>
    </>
  )

  return (
    <section className="ds-story-section">
      {mobile ? (
        <div className="ds-story-mobile-frame">
          <div className="ds-story-section">{rows}</div>
        </div>
      ) : (
        <div className="ds-story-section">{rows}</div>
      )}
    </section>
  )
}

export const DesktopSpecs: Story = {
  name: 'Desktop Specs',
  render: () => (
    <div className="ds-story-frame">
      <SpecsSection idPrefix="desktop" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}

export const MobileViewport: Story = {
  name: 'Mobile Viewport',
  render: () => (
    <div className="ds-story-frame">
      <SpecsSection mobile idPrefix="mobile" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}

export const InteractivePillTabs: Story = {
  args: { variant: 'Pill' },
  render: (args) => (
    <div className="ds-story-interactive-split">
      <div className="ds-story-frame">
        <Tabs {...args} defaultSelectedKey="emails" aria-label="Interactive Pill tabs">
          <TabList>
            <Tab id="emails">Emails</Tab>
            <Tab id="files">Files</Tab>
            <Tab id="edits">Edits</Tab>
            <Tab id="dashboard">Dashboard</Tab>
            <Tab id="messages">Messages</Tab>
          </TabList>
          <TabPanel id="emails">Emails panel</TabPanel>
          <TabPanel id="files">Files panel</TabPanel>
          <TabPanel id="edits">Edits panel</TabPanel>
          <TabPanel id="dashboard">Dashboard panel</TabPanel>
          <TabPanel id="messages">Messages panel</TabPanel>
        </Tabs>
      </div>
      <div className="ds-story-frame">
        <div className="ds-story-mobile-frame">
          <Tabs
            {...args}
            defaultSelectedKey="m-emails"
            aria-label="Interactive Pill tabs mobile preview"
          >
            <TabList>
              <Tab id="m-emails">Emails</Tab>
              <Tab id="m-files">Files</Tab>
              <Tab id="m-edits">Edits</Tab>
              <Tab id="m-dashboard">Dashboard</Tab>
              <Tab id="m-messages">Messages</Tab>
            </TabList>
            <TabPanel id="m-emails">Emails panel</TabPanel>
            <TabPanel id="m-files">Files panel</TabPanel>
            <TabPanel id="m-edits">Edits panel</TabPanel>
            <TabPanel id="m-dashboard">Dashboard panel</TabPanel>
            <TabPanel id="m-messages">Messages panel</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  ),
}

export const InteractiveUnderlineTabs: Story = {
  args: { variant: 'Underline' },
  render: (args) => (
    <div className="ds-story-interactive-split">
      <div className="ds-story-frame">
        <Tabs {...args} defaultSelectedKey="emails" aria-label="Interactive Underline tabs">
          <TabList>
            <Tab id="emails">Emails</Tab>
            <Tab id="files">Files</Tab>
            <Tab id="edits">Edits</Tab>
            <Tab id="dashboard">Dashboard</Tab>
            <Tab id="messages">Messages</Tab>
          </TabList>
          <TabPanel id="emails">Emails panel</TabPanel>
          <TabPanel id="files">Files panel</TabPanel>
          <TabPanel id="edits">Edits panel</TabPanel>
          <TabPanel id="dashboard">Dashboard panel</TabPanel>
          <TabPanel id="messages">Messages panel</TabPanel>
        </Tabs>
      </div>
      <div className="ds-story-frame">
        <div className="ds-story-mobile-frame">
          <Tabs
            {...args}
            defaultSelectedKey="m-emails"
            aria-label="Interactive Underline tabs mobile preview"
          >
            <TabList>
              <Tab id="m-emails">Emails</Tab>
              <Tab id="m-files">Files</Tab>
              <Tab id="m-edits">Edits</Tab>
              <Tab id="m-dashboard">Dashboard</Tab>
              <Tab id="m-messages">Messages</Tab>
            </TabList>
            <TabPanel id="m-emails">Emails panel</TabPanel>
            <TabPanel id="m-files">Files panel</TabPanel>
            <TabPanel id="m-edits">Edits panel</TabPanel>
            <TabPanel id="m-dashboard">Dashboard panel</TabPanel>
            <TabPanel id="m-messages">Messages panel</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  ),
}

export const WithBadges: Story = {
  args: { variant: 'Pill' },
  render: (args) => (
    <Tabs {...args} defaultSelectedKey="emails" aria-label="Workspace with badges">
      <TabList>
        <Tab id="emails" badge={<Badge variant="Neutral">12</Badge>}>
          Emails
        </Tab>
        <Tab id="files" badge={<Badge variant="Negative">!</Badge>}>
          Files Warning
        </Tab>
        <Tab id="edits" badge={<Badge variant="Positive">3</Badge>}>
          Edits
        </Tab>
        <Tab id="dashboard">Dashboard</Tab>
        <Tab id="messages" badge={<Badge variant="Neutral">99+</Badge>}>
          Messages
        </Tab>
      </TabList>
      <TabPanel id="emails">Emails</TabPanel>
      <TabPanel id="files">Files Warning</TabPanel>
      <TabPanel id="edits">Edits</TabPanel>
      <TabPanel id="dashboard">Dashboard</TabPanel>
      <TabPanel id="messages">Messages</TabPanel>
    </Tabs>
  ),
}
