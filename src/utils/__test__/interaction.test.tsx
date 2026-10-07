import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  mergeInteractionProps,
  useFocusVisible,
  useHover,
  usePressHandler,
  usePressed,
} from '../interaction'

function FocusProbe() {
  const { isFocused, isFocusVisible, focusProps } = useFocusVisible()
  return (
    <button type="button" {...focusProps} data-focused={isFocused || undefined} data-focus-visible={isFocusVisible || undefined}>
      Focus
    </button>
  )
}

function HoverProbe({ isDisabled = false }: { isDisabled?: boolean }) {
  const { isHovered, hoverProps } = useHover({ isDisabled })
  return (
    <button type="button" {...hoverProps} data-hovered={isHovered || undefined}>
      Hover
    </button>
  )
}

function PressedProbe({ isDisabled = false }: { isDisabled?: boolean }) {
  const { isPressed, pressProps } = usePressed({ isDisabled })
  return (
    <button type="button" {...pressProps} data-pressed={isPressed || undefined}>
      Pressed
    </button>
  )
}

function PressHandlerProbe({
  isDisabled = false,
  onPress,
}: {
  isDisabled?: boolean
  onPress?: () => void
}) {
  const { pressHandlerProps } = usePressHandler({
    isDisabled,
    ...(onPress !== undefined ? { onPress } : {}),
  })
  return (
    <button type="button" {...pressHandlerProps}>
      Press
    </button>
  )
}

describe('useFocusVisible', () => {
  it('marks focus and focus-visible after keyboard focus', async () => {
    const user = userEvent.setup()
    render(<FocusProbe />)
    await user.tab()
    const button = screen.getByRole('button', { name: 'Focus' })
    expect(button).toHaveFocus()
    expect(button).toHaveAttribute('data-focused')
    expect(button).toHaveAttribute('data-focus-visible')
  })
})

describe('useHover', () => {
  it('sets data-hovered on pointer enter and clears on leave', async () => {
    const user = userEvent.setup()
    render(<HoverProbe />)
    const button = screen.getByRole('button', { name: 'Hover' })
    await user.hover(button)
    expect(button).toHaveAttribute('data-hovered')
    await user.unhover(button)
    expect(button).not.toHaveAttribute('data-hovered')
  })

  it('does not hover when disabled', async () => {
    const user = userEvent.setup()
    render(<HoverProbe isDisabled />)
    const button = screen.getByRole('button', { name: 'Hover' })
    await user.hover(button)
    expect(button).not.toHaveAttribute('data-hovered')
  })
})

describe('usePressed', () => {
  it('sets data-pressed while the pointer is down', async () => {
    const user = userEvent.setup()
    render(<PressedProbe />)
    const button = screen.getByRole('button', { name: 'Pressed' })
    await user.pointer({ keys: '[MouseLeft>]', target: button })
    expect(button).toHaveAttribute('data-pressed')
    await user.pointer({ keys: '[/MouseLeft]', target: button })
    expect(button).not.toHaveAttribute('data-pressed')
  })
})

describe('usePressHandler', () => {
  it('calls onPress from click and keyboard on a button', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(<PressHandlerProbe onPress={onPress} />)
    const button = screen.getByRole('button', { name: 'Press' })
    await user.click(button)
    button.focus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onPress).toHaveBeenCalledTimes(3)
  })

  it('does not call onPress when disabled', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(<PressHandlerProbe isDisabled onPress={onPress} />)
    await user.click(screen.getByRole('button', { name: 'Press' }))
    expect(onPress).not.toHaveBeenCalled()
  })
})

function DivPressProbe({ onPress }: { onPress: () => void }) {
  const { pressHandlerProps } = usePressHandler({ onPress })
  return (
    <div role="button" tabIndex={0} {...pressHandlerProps}>
      DivPress
    </div>
  )
}

describe('usePressHandler on non-button hosts', () => {
  it('activates on Enter and Space for non-button elements', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    render(<DivPressProbe onPress={onPress} />)
    screen.getByRole('button', { name: 'DivPress' }).focus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onPress).toHaveBeenCalledTimes(2)
  })
})

describe('mergeInteractionProps', () => {
  it('chains handlers with the same event name', () => {
    const a = vi.fn()
    const b = vi.fn()
    const merged = mergeInteractionProps({ onClick: a, id: 'x' }, { onClick: b })
    expect(merged.id).toBe('x')
    const onClick = merged.onClick
    expect(typeof onClick).toBe('function')
    ;(onClick as (event: unknown) => void)({})
    expect(a).toHaveBeenCalledTimes(1)
    expect(b).toHaveBeenCalledTimes(1)
  })

  it('skips null bags', () => {
    const merged = mergeInteractionProps(null, { id: 'y' }, undefined)
    expect(merged.id).toBe('y')
  })
})

