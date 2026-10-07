import { Fragment, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tab } from './Tab'
import type { TabVariant } from './Tab.types'
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
    label: 'Variant: Pill, Selected: True',
  },
  {
    variant: 'Pill',
    selected: false,
    label: 'Variant: Pill, Selected: False',
  },
  {
    variant: 'Underline',
    selected: true,
    label: 'Variant: Underline, Selected: True',
  },
  {
    variant: 'Underline',
    selected: false,
    label: 'Variant: Underline, Selected: False',
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
  parameters: {
    docs: {
      description: {
        component:
          'Individual Tab item. Variants are strictly Pill and Underline. Interactive visuals cover Default, Hover, Active, and Focus via data attributes. Responsive height and padding use CSS media queries (desktop >768px, mobile ≤768px). There is no `mobile` prop.',
      },
    },
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
          <div className="ds-story-matrix__row">State: {state}</div>
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

export const SpecsMatrixDesktop: Story = {
  name: 'SpecsMatrixDesktop (Mobile: Off)',
  render: () => (
    <div className="ds-story-frame">
      <p className="ds-story-frame__title">Tab Specs — Mobile: Off (Desktop &gt; 768px)</p>
      <p className="ds-story-frame__meta">
        Height 50px. Pill padding block 3XS / inline S, gap 2XS. Columns: Pill/Underline ×
        Selected True/False. Rows: Default, Hover, Active, Focus.
      </p>
      <SpecsMatrixGrid />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    a11y: { disable: true },
    docs: {
      description: {
        story:
          'Figma 4×4 Tab matrix at desktop metrics (Mobile: Off). Hover/Active/Focus are forced with data-hovered, data-pressed, and data-focus-visible.',
      },
    },
  },
}

export const SpecsMatrixMobile: Story = {
  name: 'SpecsMatrixMobile (Mobile: True)',
  render: () => (
    <div className="ds-story-frame">
      <p className="ds-story-frame__title">Tab Specs — Mobile: True (≤ 768px preview)</p>
      <p className="ds-story-frame__meta">
        Same 4×4 matrix inside a constrained mobile frame (max-width 400px) simulating
        height 42px and compact Pill padding (block 0 / inline XS, gap 3XS). No `mobile`
        prop — preview CSS mirrors the production media query.
      </p>
      <div className="ds-story-mobile-frame">
        <SpecsMatrixGrid />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    a11y: { disable: true },
    docs: {
      description: {
        story:
          'Identical Figma Tab matrix under a mobile viewport preview container. Production sizing remains CSS media-query driven.',
      },
    },
  },
}
