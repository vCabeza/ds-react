import type { Meta, StoryObj } from '@storybook/react'
import {
  ColorsTokensView,
  InteractionTokensView,
  SpacingTokensView,
  TypographyTokensView,
} from './TokenViews'

const meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
    a11y: {
      test: 'todo',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  name: 'Colors',
  render: () => <ColorsTokensView />,
}

export const Spacing: Story = {
  name: 'Spacing',
  render: () => <SpacingTokensView />,
}

export const Typography: Story = {
  name: 'Typography',
  render: () => <TypographyTokensView />,
}

export const Interaction: Story = {
  name: 'Interaction',
  render: () => <InteractionTokensView />,
}
