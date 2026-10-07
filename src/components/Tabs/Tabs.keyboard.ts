/** Next key with wrap-around, or null when `tabIds` is empty. */
export function getNextTabKey(
  tabIds: readonly string[],
  currentKey: string | null,
): string | null {
  if (tabIds.length === 0) {
    return null
  }
  const index = currentKey == null ? -1 : tabIds.indexOf(currentKey)
  if (index === -1) {
    return tabIds[0]!
  }
  return tabIds[(index + 1) % tabIds.length]!
}

/** Previous key with wrap-around, or null when `tabIds` is empty. */
export function getPreviousTabKey(
  tabIds: readonly string[],
  currentKey: string | null,
): string | null {
  if (tabIds.length === 0) {
    return null
  }
  const index = currentKey == null ? -1 : tabIds.indexOf(currentKey)
  if (index === -1) {
    return tabIds[0]!
  }
  const nextIndex = (index - 1 + tabIds.length) % tabIds.length
  return tabIds[nextIndex]!
}

export function getFirstTabKey(tabIds: readonly string[]): string | null {
  return tabIds.length === 0 ? null : tabIds[0]!
}

export function getLastTabKey(tabIds: readonly string[]): string | null {
  return tabIds.length === 0 ? null : tabIds[tabIds.length - 1]!
}
