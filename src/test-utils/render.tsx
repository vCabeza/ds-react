import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

/** Thin RTL render wrapper for library tests. */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, options)
}

export { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
