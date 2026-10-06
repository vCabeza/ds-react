'use client'

import { forwardRef, useRef, type MouseEventHandler, type ReactNode } from 'react'
import { mergeProps, useButton, useFocusRing, useHover } from 'react-aria'
import { mergeRefs } from '../../lib/dom'
import type { ButtonProps } from './Button.types'
import { buttonClassName } from './Button.variants'

function ButtonSlot({ children }: { children: ReactNode }) {
  return (
    <span className="ds-button__slot" aria-hidden="true">
      {children}
    </span>
  )
}

function ButtonPendingStatus({ label }: { label: string }) {
  return (
    <span className="ds-button__sr-only" role="status" aria-live="polite" aria-atomic="true">
      {label}
    </span>
  )
}

/**
 * Accessible button primitive.
 *
 * Behavior (press, keyboard, focus, hover) comes from React Aria hooks
 * (`useButton`, `useFocusRing`, `useHover`). React Aria Components is not used:
 * this library owns markup, tokens, and the public API.
 *
 * The public interaction contract is `onPress`, not `onClick`.
 *
 * Icon-only usage requires `aria-label` at the type level. While `isPending`
 * is true, interaction is blocked, `aria-busy` is set, and `pendingLabel` is
 * announced on a polite live region without changing the accessible name.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  forwardedRef,
) {
  const {
    children,
    className,
    variant = 'solid',
    size = 'md',
    intent = 'primary',
    isDisabled = false,
    isPending = false,
    fullWidth = false,
    pendingLabel = 'Loading',
    start,
    end,
    onPress,
    autoFocus,
    type = 'button',
    ...ariaRest
  } = props

  const innerRef = useRef<HTMLButtonElement>(null)
  const isInactive = isDisabled || isPending

  const { buttonProps, isPressed } = useButton(
    {
      ...ariaRest,
      type,
      isDisabled,
      ...(autoFocus ? { autoFocus } : {}),
      ...(isPending ? {} : { onPress }),
    },
    innerRef,
  )

  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    isTextInput: false,
    ...(autoFocus ? { autoFocus } : {}),
  })

  const { hoverProps, isHovered } = useHover({ isDisabled: isInactive })

  const handlePendingSubmitGuard: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isPending) {
      return
    }
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <>
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps, {
          onClick: handlePendingSubmitGuard,
        })}
        ref={mergeRefs(innerRef, forwardedRef)}
        {...(isPending ? { 'aria-busy': true as const } : {})}
        className={buttonClassName({ variant, size, intent, fullWidth, className })}
        data-hovered={isHovered || undefined}
        data-pressed={(isPressed && !isPending) || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={isDisabled || undefined}
        data-pending={isPending || undefined}
      >
        {start ? <ButtonSlot>{start}</ButtonSlot> : null}
        {children != null ? <span className="ds-button__label">{children}</span> : null}
        {end ? <ButtonSlot>{end}</ButtonSlot> : null}
        {isPending ? <span className="ds-button__spinner" aria-hidden="true" /> : null}
      </button>
      {isPending ? <ButtonPendingStatus label={pendingLabel} /> : null}
    </>
  )
})

Button.displayName = 'Button'
