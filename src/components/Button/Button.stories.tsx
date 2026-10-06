import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from './Button'
import type { ButtonIntent, ButtonVariant } from './Button.types'

const variants: ButtonVariant[] = ['solid', 'outline', 'ghost']
const intents: ButtonIntent[] = ['neutral', 'primary', 'danger']

const meta = {
  title: 'Button',
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
  parameters: {
    docs: {
      description: {
        component:
          'Button is the library press primitive. Use onPress (React Aria). Icon-only buttons must set aria-label. Pending state is announced on a polite live region and does not change the accessible name.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

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
  parameters: {
    docs: {
      description: {
        story:
          'Busy state: aria-busy on the button, polite live region with pendingLabel, spinner is presentational.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Native submit button for forms. Pair with isPending to block double submit.',
      },
    },
  },
}

export const VariantIntentMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '0.75rem',
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
  parameters: {
    docs: {
      description: {
        story: 'Every shipped fill × intent combination.',
      },
    },
  },
}

export const FocusVisible: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Save' })
    await userEvent.tab()
    await expect(button).toHaveFocus()
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs onto the control so the focus-visible ring can be reviewed.',
      },
    },
  },
}

export const Pressed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Save' })
    button.focus()
    await userEvent.keyboard('{Enter}')
  },
  parameters: {
    docs: {
      description: {
        story: 'Activates the button with Enter after focus (press model).',
      },
    },
  },
}
