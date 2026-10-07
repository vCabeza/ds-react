import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../../badge'
import type { BadgeVariant } from '../Badge.types'
import './badge-stories.css'

const variants: BadgeVariant[] = ['Neutral', 'Positive', 'Negative']

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Label',
    variant: 'Neutral',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
    children: { control: 'text' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Positive: Story = {
  args: { variant: 'Positive', children: 'Positive' },
}

export const Negative: Story = {
  args: { variant: 'Negative', children: 'Negative' },
}

export const Matrix: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-space-2xs)',
        alignItems: 'center',
        fontFamily: 'var(--ds-font-family)',
      }}
    >
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}

export const MobileViewport: Story = {
  name: 'Mobile Viewport',
  args: { children: 'Mobile', variant: 'Neutral' },
  render: (args) => (
    <div className="ds-story-frame">
      <div className="ds-story-mobile-frame">
        <Badge {...args} />
      </div>
    </div>
  ),
}
