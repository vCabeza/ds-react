/** DOM id for the tab trigger; the public `id` prop remains the selection key. */
export function tabDomId(key: string): string {
  return `ds-tab-${key}`
}

/** DOM id for the panel paired to a selection key. */
export function panelDomId(key: string): string {
  return `ds-tabpanel-${key}`
}
