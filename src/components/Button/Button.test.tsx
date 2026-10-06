import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { act, createRef, type FormEvent, type ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import type { ButtonIntent, ButtonSize, ButtonVariant } from './Button.types'

async function expectNoA11yViolations(ui: ReactElement) {
  const { container } = render(ui)
  expect(await axe(container)).toHaveNoViolations()
}

describe('Button', () => {
  it('renders a native button with the given label', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('calls onPress from pointer', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(<Button onPress={onPress}>Save</Button>)
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('calls onPress from keyboard (Enter and Space)', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(<Button onPress={onPress}>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    button.focus()
    await act(async () => {
      await user.keyboard('{Enter}')
    })
    await act(async () => {
      await user.keyboard(' ')
    })
    expect(onPress).toHaveBeenCalledTimes(2)
  })

  it('does not call onPress when disabled', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('keeps an accessible name while pending and announces via a live region', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(
      <Button isPending pendingLabel="Saving" onPress={onPress}>
        Save
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).not.toHaveAttribute('aria-describedby')
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status).toHaveTextContent('Saving')
    await user.click(button)
    expect(onPress).not.toHaveBeenCalled()
  })

  it('uses the default pendingLabel when none is provided', () => {
    render(<Button isPending>Save</Button>)
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
  })

  it('submits a form when type is submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Save</Button>
      </form>,
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('does not submit a form while pending', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" isPending>
          Save
        </Button>
      </form>,
    )
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('requires an accessible name for icon-only buttons', () => {
    render(<Button aria-label="Close" start={<span>×</span>} />)
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('renders start and end slots as presentational', () => {
    render(
      <Button start={<span>↓</span>} end={<span>→</span>}>
        Export
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Export' })
    expect(button.querySelectorAll('[aria-hidden="true"]').length).toBe(2)
  })

  it('applies fullWidth and extra class names', () => {
    render(
      <Button fullWidth className="extra">
        Save
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveClass('ds-button--full-width')
    expect(button).toHaveClass('extra')
  })

  it.each(['sm', 'md', 'lg'] as const)('applies size class %s', (size: ButtonSize) => {
    render(<Button size={size}>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(`ds-button--${size}`)
  })

  it.each(['neutral', 'primary', 'danger'] as const)(
    'applies intent class %s',
    (intent: ButtonIntent) => {
      render(<Button intent={intent}>Save</Button>)
      expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(`ds-button--${intent}`)
    },
  )

  it.each(['solid', 'outline', 'ghost'] as const)(
    'applies variant class %s',
    (variant: ButtonVariant) => {
      render(<Button variant={variant}>Save</Button>)
      expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(`ds-button--${variant}`)
    },
  )

  it('forwards an object ref', () => {
    const objectRef = createRef<HTMLButtonElement>()
    render(<Button ref={objectRef}>Save</Button>)
    expect(objectRef.current).toBe(screen.getByRole('button', { name: 'Save' }))
  })

  it('forwards a callback ref', () => {
    const callbackRef = vi.fn()
    render(<Button ref={callbackRef}>Save</Button>)
    expect(callbackRef).toHaveBeenCalledWith(screen.getByRole('button', { name: 'Save' }))
  })

  it('focuses on mount when autoFocus is set', () => {
    // Tests React Aria autoFocus wiring; do not use autoFocus in product UI.
    // eslint-disable-next-line jsx-a11y/no-autofocus -- exercising the supported Aria prop
    render(<Button autoFocus>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
  })

  it('exposes visual states as data attributes', async () => {
    const user = userEvent.setup()
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    await user.hover(button)
    expect(button).toHaveAttribute('data-hovered')
  })

  it.each([
    ['default', <Button key="d">Save</Button>],
    ['disabled', <Button key="dis" isDisabled>Save</Button>],
    ['pending', <Button key="p" isPending>Save</Button>],
    ['icon-only', <Button key="i" aria-label="Close" />],
    ['outline', <Button key="o" variant="outline">Save</Button>],
    ['ghost', <Button key="g" variant="ghost">Save</Button>],
  ] as const)('has no obvious axe violations (%s)', async (_name, ui) => {
    await expectNoA11yViolations(ui)
  })
})
