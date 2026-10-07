import { Fragment, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tab } from '../../tab'
import type { TabVariant } from '../Tab.types'
import './tab-stories.css'

const variants: TabVariant[] = ['Pill', 'Underline']

type TabVisualState = 'Default' | 'Hover' | 'Active' | 'Focus'

const visualStates: TabVisualState[] = ['Default', 'Hover', 'Active', 'Focus']

const matrixColumns: Array<{
  variant: TabVariant
  selected: boolean
  label: string
}> = [
  {
    variant: 'Pill',
    selected: true,
    label: 'Pill · Selected',
  },
  {
    variant: 'Pill',
    selected: false,
    label: 'Pill · Unselected',
  },
  {
    variant: 'Underline',
    selected: true,
    label: 'Underline · Selected',
  },
  {
    variant: 'Underline',
    selected: false,
    label: 'Underline · Unselected',
  },
]

const meta = {
  title: 'Components/Tab',
  component: Tab,
  args: {
    id: 'sample',
    children: 'Label',
    variant: 'Pill',
    isSelected: false,
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    isSelected: { control: 'boolean' },
    children: { control: 'text' },
    badge: { control: false },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

/** SpecsMatrix-only: forces visual states via `data-*` (not live pointer). */
function TabStateSpecimen(props: {
  variant: TabVariant
  selected: boolean
  state: TabVisualState
  label?: string
  badge?: ReactNode
}) {
  const { variant, selected, state, label = 'Label', badge } = props
  const dataAttrs = {
    ...(selected ? { 'data-selected': true as const } : {}),
    ...(state === 'Hover' ? { 'data-hovered': true as const } : {}),
    ...(state === 'Active' ? { 'data-pressed': true as const } : {}),
    ...(state === 'Focus' ? { 'data-focus-visible': true as const } : {}),
  }

  return (
    <button
      type="button"
      className={`ds-tab ds-tab--${variant}`}
      data-variant={variant}
      aria-hidden="true"
      tabIndex={-1}
      {...dataAttrs}
    >
      <span className="ds-tab__label">{label}</span>
      {badge != null ? <span className="ds-tab__badge">{badge}</span> : null}
    </button>
  )
}

function SpecsMatrixGrid() {
  return (
    <div className="ds-story-matrix" role="presentation">
      <div className="ds-story-matrix__corner" />
      {matrixColumns.map((column) => (
        <div key={column.label} className="ds-story-matrix__col">
          {column.label}
        </div>
      ))}
      {visualStates.map((state) => (
        <Fragment key={state}>
          <div className="ds-story-matrix__row">{state}</div>
          {matrixColumns.map((column) => (
            <TabStateSpecimen
              key={`${column.label}-${state}`}
              variant={column.variant}
              selected={column.selected}
              state={state}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <div role="tablist" aria-label="Sample tabs">
      <Tab {...args} />
    </div>
  ),
}

export const DesktopStateMatrix: Story = {
  name: 'Desktop State Matrix',
  render: () => (
    <div className="ds-story-frame">
      <SpecsMatrixGrid />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    a11y: { disable: true },
  },
}

export const MobileViewport: Story = {
  name: 'Mobile Viewport',
  render: () => (
    <div className="ds-story-frame">
      <div
        className="ds-story-mobile-frame"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-space-s)',
          alignItems: 'flex-start',
        }}
      >
        <div role="tablist" aria-label="Pill mobile preview">
          <Tab id="pill" variant="Pill" isSelected>
            Label
          </Tab>
        </div>
        <div role="tablist" aria-label="Underline mobile preview">
          <Tab id="underline" variant="Underline" isSelected>
            Label
          </Tab>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}
