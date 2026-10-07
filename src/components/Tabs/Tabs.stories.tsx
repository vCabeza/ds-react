import { type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../Badge'
import { Tab } from '../Tab'
import type { TabVariant } from '../Tab/Tab.types'
import '../Tab/tab-stories.css'
import { TabList, TabPanel, Tabs } from './Tabs'

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
  parameters: {
    docs: {
      description: {
        component:
          'Tabs collection container (tablist gaps, selection, TabPanel). Variants are strictly Pill and Underline. Responsive list gaps use CSS media queries. There is no `mobile` prop — Storybook mobile sections use a constrained preview frame that mirrors production media-query metrics.',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

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

function SpecsSection(props: {
  title: string
  meta: string
  mobile?: boolean
  idPrefix: string
}) {
  const { title, meta, mobile = false, idPrefix } = props
  const rows = (
    <>
      <div className="ds-story-row">
        <p className="ds-story-frame__title">Variant: Pill</p>
        <p className="ds-story-frame__meta">
          {mobile
            ? 'Gap 2XS (8px), height 42px, first tab selected.'
            : 'Gap XS (12px), height 50px, first tab selected.'}
        </p>
        <SpecsTabRow
          variant="Pill"
          ariaLabel={`${title} Pill`}
          idPrefix={`${idPrefix}-pill`}
        />
      </div>
      <div className="ds-story-row">
        <p className="ds-story-frame__title">Variant: Underline</p>
        <p className="ds-story-frame__meta">
          {mobile
            ? 'Gap L (24px), height 42px, first tab selected with bottom indicator.'
            : 'Gap XL (32px), height 50px, first tab selected with bottom indicator.'}
        </p>
        <SpecsTabRow
          variant="Underline"
          ariaLabel={`${title} Underline`}
          idPrefix={`${idPrefix}-underline`}
        />
      </div>
    </>
  )

  return (
    <section className="ds-story-section">
      <p className="ds-story-frame__title">{title}</p>
      <p className="ds-story-frame__meta">{meta}</p>
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

export const FigmaSpecsMatrix: Story = {
  name: 'FigmaSpecsMatrix (Full 4-Variant Overview)',
  render: () => (
    <div className="ds-story-frame">
      <p className="ds-story-frame__title">Tabs Specs</p>
      <p className="ds-story-frame__meta">
        Full overview matching the Figma Tabs Specs card: desktop (Mobile: Off) and mobile
        preview (Mobile: True) for Pill and Underline, five labels each, first tab selected.
      </p>

      <SpecsSection
        title="Section 1 — Mobile: Off (Desktop > 768px)"
        meta="Uses live desktop CSS (viewport wider than 768px). Pill gap XS · Underline gap XL · Tab height 50px."
        idPrefix="desktop"
      />

      <SpecsSection
        title="Section 2 — Mobile: True (Mobile ≤ 768px)"
        meta="Constrained preview (max-width 400px) mirroring production @media (max-width: 768px) tokens. Pill gap 2XS · Underline gap L · Tab height 42px. No `mobile` prop."
        mobile
        idPrefix="mobile"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Figma Tabs Specs card: desktop Pill/Underline rows and mobile Pill/Underline rows (five Label tabs, first selected). Mobile section uses a story preview frame; components remain media-query driven.',
      },
    },
  },
}

export const InteractivePillTabs: Story = {
  args: { variant: 'Pill' },
  render: (args) => (
    <div className="ds-story-interactive-split">
      <div className="ds-story-frame">
        <p className="ds-story-frame__title">Desktop / current viewport</p>
        <Tabs {...args} defaultSelectedKey="emails" aria-label="Interactive Pill tabs">
          <TabList>
            <Tab id="emails">Emails</Tab>
            <Tab id="files">Files</Tab>
            <Tab id="edits">Edits</Tab>
            <Tab id="dashboard">Dashboard</Tab>
            <Tab id="messages">Messages</Tab>
          </TabList>
          <TabPanel id="emails">Emails panel — Arrow keys, Home, and End navigate.</TabPanel>
          <TabPanel id="files">Files panel</TabPanel>
          <TabPanel id="edits">Edits panel</TabPanel>
          <TabPanel id="dashboard">Dashboard panel</TabPanel>
          <TabPanel id="messages">Messages panel</TabPanel>
        </Tabs>
      </div>
      <div className="ds-story-frame">
        <p className="ds-story-frame__title">Mobile preview frame (≤768px metrics)</p>
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
            <TabPanel id="m-emails">Emails panel (mobile metrics preview)</TabPanel>
            <TabPanel id="m-files">Files panel</TabPanel>
            <TabPanel id="m-edits">Edits panel</TabPanel>
            <TabPanel id="m-dashboard">Dashboard panel</TabPanel>
            <TabPanel id="m-messages">Messages panel</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Working accessible Pill tabs with TabPanel switching. Desktop and mobile-metric preview frames side by side.',
      },
    },
  },
}

export const InteractiveUnderlineTabs: Story = {
  args: { variant: 'Underline' },
  render: (args) => (
    <div className="ds-story-interactive-split">
      <div className="ds-story-frame">
        <p className="ds-story-frame__title">Desktop / current viewport</p>
        <Tabs {...args} defaultSelectedKey="emails" aria-label="Interactive Underline tabs">
          <TabList>
            <Tab id="emails">Emails</Tab>
            <Tab id="files">Files</Tab>
            <Tab id="edits">Edits</Tab>
            <Tab id="dashboard">Dashboard</Tab>
            <Tab id="messages">Messages</Tab>
          </TabList>
          <TabPanel id="emails">Emails panel — selection indicator follows the active tab.</TabPanel>
          <TabPanel id="files">Files panel</TabPanel>
          <TabPanel id="edits">Edits panel</TabPanel>
          <TabPanel id="dashboard">Dashboard panel</TabPanel>
          <TabPanel id="messages">Messages panel</TabPanel>
        </Tabs>
      </div>
      <div className="ds-story-frame">
        <p className="ds-story-frame__title">Mobile preview frame (≤768px metrics)</p>
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
            <TabPanel id="m-emails">Emails panel (mobile metrics preview)</TabPanel>
            <TabPanel id="m-files">Files panel</TabPanel>
            <TabPanel id="m-edits">Edits panel</TabPanel>
            <TabPanel id="m-dashboard">Dashboard panel</TabPanel>
            <TabPanel id="m-messages">Messages panel</TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Working accessible Underline tabs with Inverse selection indicator and panel switching, plus a mobile metrics preview.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          'Real-world Tabs list integrating the design-system Badge (Neutral, Negative warning, Positive) on selected and unselected items.',
      },
    },
  },
}
