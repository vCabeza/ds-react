# ds-react

Accessible React component library. Current public API: **Button**, built on [React Aria](https://react-aria.adobe.com/) hooks (`useButton`, `useFocusRing`, `useHover`). Markup, tokens, and the public API are owned by this package; **React Aria Components is not a dependency**.

## Installation

```bash
npm install ds-react react-aria
```

Peer dependencies: `react` and `react-dom` (18 or 19).

Styles are not injected on import (keeps generated types clean):

```ts
import 'ds-react/styles'
import { Button } from 'ds-react'
```

## Usage

```tsx
import 'ds-react/styles'
import { Button } from 'ds-react'

export function Example() {
  return (
    <Button intent="primary" onPress={() => console.log('saved')}>
      Save
    </Button>
  )
}
```

Public interaction contract: **`onPress`** (mouse, keyboard, and touch). Do not use `onClick` as the library API.

### Variants

- `variant`: `solid` | `outline` | `ghost`
- `size`: `sm` | `md` | `lg` (minimum pointer targets 32 / 40 / 44 CSS px)
- `intent`: `neutral` | `primary` | `danger`
- `isDisabled`, `isPending`, `fullWidth`
- `start` / `end`: icon slots (`aria-hidden`; accessible name comes from text or `aria-label`)

Icon-only: `aria-label` is required at the type level.

```tsx
<Button aria-label="Close" start="×" />
```

Pending (accessible name is preserved; `onPress` does not fire; extra clicks do not submit):

```tsx
<Button isPending pendingLabel="Saving">
  Save
</Button>
```

`pendingLabel` is the i18n hook. Default: `"Loading"`.

### Badge

Static status label. Variants: `Neutral` | `Positive` | `Negative`. Size modes are **viewport-driven** (no `mobile` prop):

- Desktop (`min-width: 769px`): padding `3XS`/`2XS`, radius `lg` (12px), height 26px
- Mobile (`max-width: 768px`): padding `4XS`/`3XS`, radius `md` (8px), height 22px
- Typography (all modes): `body-s` (12px / 150%), Inter, weight 700, color `OnNeutral`

```tsx
import { Badge } from 'ds-react'

<Badge variant="Positive">New</Badge>
<Badge variant="Negative">Alert</Badge>
```

### Tokens

Core spacing scale (TypeScript: `spacingTokens` from `ds-react`):

| Token | px | rem |
| --- | --- | --- |
| `0` | 0 | 0 |
| `4XS` | 2 | 0.125rem |
| `3XS` | 4 | 0.25rem |
| `2XS` | 8 | 0.5rem |
| `XS` | 12 | 0.75rem |
| `S` | 16 | 1rem |
| `M` | 20 | 1.25rem |
| `L` | 24 | 1.5rem |
| `XL` | 32 | 2rem |
| `2XL` | 48 | 3rem |

CSS variables: `--ds-space-0` … `--ds-space-2xl`. Browse all categories in Storybook → **Design System / Tokens Gallery**.

```css
:root {
  --Inverse: #1b2134;
  --SurfaceHigh: #f1f1f7;
}
```

Full list: `src/styles/tokens.css` / `ds-react/styles`.

## Scripts

```bash
npm install
npm test
npm run typecheck
npm run lint
npm run build
npm run storybook
```

`npm test` runs Vitest **with coverage**. The run fails if lines, branches, functions, or statements drop below **85%** (global and `src/components/Button/**`).

## Accessibility

Target: **WCAG 3.0** outcomes for this control. Until WCAG 3.0 is a W3C Recommendation, **WCAG 2.2 Level AA** is the automated floor (axe, keyboard tests, documented token contrast). Mapping: [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Publish

`npm run build` emits `dist/` (ESM, CJS, types, CSS). `exports` points at those artifacts. `react` and `react-dom` are not bundled.
