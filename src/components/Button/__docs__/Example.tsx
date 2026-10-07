import { Button } from '../Button'

/** Minimal consumer example for Button docs. */
export function Example() {
  return (
    <Button intent="primary" onPress={() => undefined}>
      Save
    </Button>
  )
}
