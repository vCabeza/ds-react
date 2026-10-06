import { cx } from '../../lib/dom'
import type { ButtonIntent, ButtonSize, ButtonVariant } from './Button.types'

const variantClass: Record<ButtonVariant, string> = {
  solid: 'ds-button--solid',
  outline: 'ds-button--outline',
  ghost: 'ds-button--ghost',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'ds-button--sm',
  md: 'ds-button--md',
  lg: 'ds-button--lg',
}

const intentClass: Record<ButtonIntent, string> = {
  neutral: 'ds-button--neutral',
  primary: 'ds-button--primary',
  danger: 'ds-button--danger',
}

export function buttonClassName(options: {
  variant: ButtonVariant
  size: ButtonSize
  intent: ButtonIntent
  fullWidth: boolean
  className?: string | undefined
}): string {
  return cx(
    'ds-button',
    variantClass[options.variant],
    sizeClass[options.size],
    intentClass[options.intent],
    options.fullWidth && 'ds-button--full-width',
    options.className,
  )
}
