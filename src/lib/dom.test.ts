import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { cx, mergeRefs } from './dom'

describe('cx', () => {
  it('joins truthy class names', () => {
    expect(cx('a', false, null, undefined, 'b')).toBe('a b')
  })

  it('returns an empty string when every part is omitted', () => {
    expect(cx(false, null, undefined)).toBe('')
  })
})

describe('mergeRefs', () => {
  it('assigns the node to function and object refs and skips null refs', () => {
    const objectRef = createRef<HTMLButtonElement>()
    const fn = vi.fn()
    const node = document.createElement('button')
    mergeRefs(undefined, null, fn, objectRef)(node)
    expect(fn).toHaveBeenCalledWith(node)
    expect(objectRef.current).toBe(node)
  })

  it('clears object refs when the node is null', () => {
    const objectRef = createRef<HTMLButtonElement>()
    const node = document.createElement('button')
    const merged = mergeRefs(objectRef)
    merged(node)
    merged(null)
    expect(objectRef.current).toBe(null)
  })
})
