'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type PointerEventHandler,
} from 'react'

/** Last input modality — used so focus rings appear for keyboard, not pointer. */
let modality: 'keyboard' | 'pointer' | null = null
let modalityListenersAttached = false

function ensureModalityListeners(): void {
  if (typeof window === 'undefined' || modalityListenersAttached) {
    return
  }
  modalityListenersAttached = true

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey || event.altKey || event.ctrlKey) {
      return
    }
    modality = 'keyboard'
  }
  const onPointer = () => {
    modality = 'pointer'
  }

  window.addEventListener('keydown', onKeyDown, true)
  window.addEventListener('pointerdown', onPointer, true)
  window.addEventListener('mousedown', onPointer, true)
}

export interface FocusVisibleResult {
  isFocused: boolean
  isFocusVisible: boolean
  focusProps: {
    onFocus: FocusEventHandler
    onBlur: FocusEventHandler
  }
}

export function useFocusVisible(): FocusVisibleResult {
  const [isFocused, setIsFocused] = useState(false)
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  useEffect(() => {
    ensureModalityListeners()
  }, [])

  const onFocus: FocusEventHandler = useCallback(() => {
    setIsFocused(true)
    setIsFocusVisible(modality !== 'pointer')
  }, [])

  const onBlur: FocusEventHandler = useCallback(() => {
    setIsFocused(false)
    setIsFocusVisible(false)
  }, [])

  return {
    isFocused,
    isFocusVisible,
    focusProps: { onFocus, onBlur },
  }
}

export interface HoverResult {
  isHovered: boolean
  hoverProps: {
    onPointerEnter: PointerEventHandler
    onPointerLeave: PointerEventHandler
  }
}

export function useHover(options: { isDisabled?: boolean } = {}): HoverResult {
  const { isDisabled = false } = options
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isDisabled) {
      setIsHovered(false)
    }
  }, [isDisabled])

  const onPointerEnter: PointerEventHandler = useCallback(() => {
    if (!isDisabled) {
      setIsHovered(true)
    }
  }, [isDisabled])

  const onPointerLeave: PointerEventHandler = useCallback(() => {
    setIsHovered(false)
  }, [])

  return {
    isHovered: isHovered && !isDisabled,
    hoverProps: { onPointerEnter, onPointerLeave },
  }
}

export interface PressedResult {
  isPressed: boolean
  pressProps: {
    onPointerDown: PointerEventHandler
    onPointerUp: PointerEventHandler
    onPointerCancel: PointerEventHandler
    onPointerLeave: PointerEventHandler
  }
}

export function usePressed(options: { isDisabled?: boolean } = {}): PressedResult {
  const { isDisabled = false } = options
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    if (isDisabled) {
      setIsPressed(false)
    }
  }, [isDisabled])

  const onPointerDown: PointerEventHandler = useCallback(
    (event) => {
      if (isDisabled || event.button !== 0) {
        return
      }
      setIsPressed(true)
    },
    [isDisabled],
  )

  const endPress = useCallback(() => {
    setIsPressed(false)
  }, [])

  return {
    isPressed: isPressed && !isDisabled,
    pressProps: {
      onPointerDown,
      onPointerUp: endPress,
      onPointerCancel: endPress,
      onPointerLeave: endPress,
    },
  }
}

export interface PressHandlerOptions {
  isDisabled?: boolean
  onPress?: () => void
}

export interface PressHandlerResult {
  pressHandlerProps: {
    onClick: MouseEventHandler
    onKeyDown: KeyboardEventHandler
  }
}

export function usePressHandler(options: PressHandlerOptions = {}): PressHandlerResult {
  const { isDisabled = false, onPress } = options
  const onPressRef = useRef(onPress)
  onPressRef.current = onPress

  const onClick: MouseEventHandler = useCallback(
    (event) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }
      onPressRef.current?.()
    },
    [isDisabled],
  )

  const onKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (isDisabled) {
        return
      }
      if (event.currentTarget instanceof HTMLButtonElement) {
        return
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onPressRef.current?.()
      }
    },
    [isDisabled],
  )

  return { pressHandlerProps: { onClick, onKeyDown } }
}

/** Chains handlers that share the same event name across prop bags. */
export function mergeInteractionProps(
  ...bags: Array<Record<string, unknown> | undefined | null>
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const eventHandlers: Record<string, Array<(...args: unknown[]) => void>> = {}

  for (const bag of bags) {
    if (bag == null) {
      continue
    }
    for (const [key, value] of Object.entries(bag)) {
      if (typeof value === 'function' && key.startsWith('on')) {
        const list = eventHandlers[key] ?? []
        list.push(value as (...args: unknown[]) => void)
        eventHandlers[key] = list
      } else if (value !== undefined) {
        result[key] = value
      }
    }
  }

  for (const [key, handlers] of Object.entries(eventHandlers)) {
    result[key] = (...args: unknown[]) => {
      for (const handler of handlers) {
        handler(...args)
      }
    }
  }

  return result
}
