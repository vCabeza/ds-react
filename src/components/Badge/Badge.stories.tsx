import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'
import type { BadgeVariant } from './Badge.types'

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
  parameters: {
    docs: {
      description: {
        component:
          'Static badge for short status labels. Variants map to SurfaceHigh, SurfacePositive, and SurfaceNegative. Size modes are viewport-driven: desktop metrics above 768px, mobile metrics at max-width 768px. Label typography is body-s (12px / 150%), Inter Bold (700), color OnNeutral.',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: { variant: 'Neutral', children: 'Neutral' },
}

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
        flexDirection: 'column',
        gap: 'var(--ds-space-l)',
        fontFamily: 'var(--ds-font-family)',
        color: 'var(--OnNeutral)',
      }}
    >
      <p style={{ margin: 0, fontSize: 'var(--font-size-body-s)' }}>
        Viewport-driven: desktop styles when width &gt; 768px; mobile styles when width ≤ 768px.
        Use the Storybook viewport toolbar to switch.
      </p>
      <div style={{ display: 'flex', gap: 'var(--ds-space-2xs)', alignItems: 'center' }}>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Neutral, Positive, and Negative. Resize the canvas to ≤768px to verify mobile padding (4XS/3XS) and height (22px).',
      },
    },
  },
}

export const DesktopViewport: Story = {
  args: { children: 'Desktop', variant: 'Neutral' },
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        story: 'Inspect at width > 768px: height 26px, padding 3XS/2XS, radius lg.',
      },
    },
  },
}

export const MobileViewport: Story = {
  args: { children: 'Mobile', variant: 'Neutral' },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Inspect at width ≤ 768px: height 22px, padding 4XS/3XS, radius md.',
      },
    },
  },
}
