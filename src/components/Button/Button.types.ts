import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'

/** Default (`md`) meets a 40px CSS pointer target. */
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonIntent = 'neutral' | 'primary' | 'danger'

type NativeButtonRest = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'children'
  | 'className'
  | 'style'
  | 'disabled'
  | 'onClick'
  | 'type'
  | 'aria-label'
>

interface ButtonVisualProps {
  /** @default 'solid' */
  variant?: ButtonVariant
  /** @default 'md' */
  size?: ButtonSize
  /** @default 'primary' */
  intent?: ButtonIntent
  isDisabled?: boolean
  /**
   * Blocks `onPress` and form submit, sets `aria-busy`, keeps focus, and
   * announces {@link ButtonVisualProps.pendingLabel} without changing the accessible name.
   */
  isPending?: boolean
  fullWidth?: boolean
  className?: string
  /**
   * Accessible pending description (English default). Override for i18n.
   * @default 'Loading'
   */
  pendingLabel?: string
  /** Leading icon; `aria-hidden` — not part of the accessible name. */
  start?: ReactNode
  /** Trailing icon; `aria-hidden` — not part of the accessible name. */
  end?: ReactNode
  /** Public press contract (pointer and keyboard). Prefer this over `onClick`. */
  onPress?: () => void
  /** @default 'button' */
  type?: 'button' | 'submit' | 'reset'
}

type ButtonShared = ButtonVisualProps & NativeButtonRest

type ButtonWithVisibleContent = ButtonShared & {
  children: ReactNode
  'aria-label'?: string
}

type IconOnlyButton = ButtonShared & {
  children?: undefined
  /** Required when there is no visible text. */
  'aria-label': string
}

/** Icon-only usage requires `aria-label`. */
export type ButtonProps = ButtonWithVisibleContent | IconOnlyButton
