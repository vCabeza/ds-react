import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from '../Button'
import type { ButtonIntent, ButtonVariant } from '../Button.types'

const variants: ButtonVariant[] = ['solid', 'outline', 'ghost']
const intents: ButtonIntent[] = ['neutral', 'primary', 'danger']

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Save',
    variant: 'solid',
    size: 'md',
    intent: 'primary',
  },
  argTypes: {
    onPress: { action: 'press' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Solid: Story = {}

export const Outline: Story = { args: { variant: 'outline' } }

export const Ghost: Story = { args: { variant: 'ghost' } }

export const Neutral: Story = { args: { intent: 'neutral' } }

export const Danger: Story = { args: { intent: 'danger' } }

export const Small: Story = { args: { size: 'sm' } }

export const Large: Story = { args: { size: 'lg' } }

export const Disabled: Story = { args: { isDisabled: true } }

export const Pending: Story = {
  args: { isPending: true, pendingLabel: 'Saving' },
}

export const IconOnly: Story = {
  args: {
    children: undefined,
    'aria-label': 'Close',
    start: '×',
  },
}

export const WithSlots: Story = {
  args: {
    start: '↓',
    end: '→',
    children: 'Export',
  },
}

export const FullWidth: Story = { args: { fullWidth: true } }

export const TypeSubmit: Story = {
  args: { type: 'submit', children: 'Submit' },
}

export const VariantIntentMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--ds-space-xs)',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      {variants.flatMap((variant) =>
        intents.map((intent) => (
          <Button key={`${variant}-${intent}`} variant={variant} intent={intent}>
            {variant} {intent}
          </Button>
        )),
      )}
    </div>
  ),
}

export const FocusVisible: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Save' })
    await userEvent.tab()
    await expect(button).toHaveFocus()
  },
}

export const Pressed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Save' })
    button.focus()
    await userEvent.keyboard('{Enter}')
  },
}
