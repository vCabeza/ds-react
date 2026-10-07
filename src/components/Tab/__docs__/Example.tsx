import { Badge } from '../../badge'
import { Tab } from '../Tab'

/** Minimal standalone Tab example for docs. */
export function Example() {
  return (
    <div role="tablist" aria-label="Example">
      <Tab id="emails" variant="Pill" isSelected badge={<Badge variant="Neutral">12</Badge>}>
        Emails
      </Tab>
    </div>
  )
}
