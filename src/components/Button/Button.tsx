'use client'

import { forwardRef, useRef, type MouseEventHandler, type ReactNode } from 'react'
import { mergeRefs } from '@utils/dom'
import './Button.styles'
import {
  mergeInteractionProps,
  useFocusVisible,
  useHover,
  usePressHandler,
  usePressed,
} from '@utils/interaction'
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
 * Press primitive. Public contract is `onPress` (not `onClick`).
 * Icon-only requires `aria-label`. Pending keeps focus, sets `aria-busy`, and
 * announces `pendingLabel` on a polite live region without renaming the button.
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
    ...rest
  } = props

  const innerRef = useRef<HTMLButtonElement>(null)
  const isInactive = isDisabled || isPending

  const { focusProps, isFocused, isFocusVisible } = useFocusVisible()
  const { hoverProps, isHovered } = useHover({ isDisabled: isInactive })
  const { pressProps, isPressed } = usePressed({ isDisabled: isInactive })
  const { pressHandlerProps } = usePressHandler({
    isDisabled: isInactive,
    ...(onPress !== undefined && !isPending ? { onPress } : {}),
  })

  const handlePendingSubmitGuard: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isPending) {
      return
    }
    event.preventDefault()
    event.stopPropagation()
  }

  const interactionProps = mergeInteractionProps(
    focusProps as Record<string, unknown>,
    hoverProps as Record<string, unknown>,
    pressProps as Record<string, unknown>,
    pressHandlerProps as Record<string, unknown>,
    { onClick: handlePendingSubmitGuard },
  )

  return (
    <>
      <button
        {...rest}
        {...interactionProps}
        ref={mergeRefs(innerRef, forwardedRef)}
        type={type}
        disabled={isDisabled}
        {...(autoFocus ? { autoFocus: true as const } : {})}
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
