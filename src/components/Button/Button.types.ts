import type { AriaButtonProps } from 'react-aria'
import type { ReactNode } from 'react'

/** Visual fill style. */
export type ButtonVariant = 'solid' | 'outline' | 'ghost'

/** Control size. Default (`md`) meets a 40px CSS pointer target. */
export type ButtonSize = 'sm' | 'md' | 'lg'

/** Semantic color intent. */
export type ButtonIntent = 'neutral' | 'primary' | 'danger'

type AriaButtonRest = Omit<
  AriaButtonProps<'button'>,
  'children' | 'elementType' | 'isDisabled' | 'className' | 'style'
>

interface ButtonVisualProps {
  /** Fill style. @default 'solid' */
  variant?: ButtonVariant
  /** Padding and minimum target size. @default 'md' */
  size?: ButtonSize
  /** Color intent. @default 'primary' */
  intent?: ButtonIntent
  /** Native disabled state via React Aria. */
  isDisabled?: boolean
  /**
   * Busy state: blocks `onPress` and form submit, sets `aria-busy`,
   * keeps focus, and announces {@link ButtonVisualProps.pendingLabel} on a
   * polite live region without changing the accessible name.
   */
  isPending?: boolean
  /** Stretch to the container width. */
  fullWidth?: boolean
  /** Extra class names appended after variant classes. */
  className?: string
  /**
   * Accessible pending description (English default). Override for i18n.
   * @default 'Loading'
   */
  pendingLabel?: string
  /** Leading visual (icons). Marked `aria-hidden`; not part of the accessible name. */
  start?: ReactNode
  /** Trailing visual (icons). Marked `aria-hidden`; not part of the accessible name. */
  end?: ReactNode
}

type ButtonShared = ButtonVisualProps & AriaButtonRest

type ButtonWithVisibleContent = ButtonShared & {
  children: ReactNode
  'aria-label'?: string
}

type IconOnlyButton = ButtonShared & {
  children?: undefined
  /** Required when there is no visible text. */
  'aria-label': string
}

/** Public Button props. Icon-only usage requires `aria-label`. */
export type ButtonProps = ButtonWithVisibleContent | IconOnlyButton
