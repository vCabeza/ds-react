import type { MutableRefObject, Ref } from 'react'

/** Joins class names, dropping falsy entries. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(' ')
}

/**
 * Calls every ref with the same node (function refs and object refs).
 * Skips `null` / `undefined` entries.
 */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined | null>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (ref == null) {
        continue
      }
      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as MutableRefObject<T | null>).current = node
      }
    }
  }
}
