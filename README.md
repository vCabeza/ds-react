# ds-react

Accessible React component library for a design system.

**Public API:** `Button`, `Badge`, `Tab`, `Tabs`, `TabList`, `TabPanel`, plus typed design tokens (`colorTokens`, `spacingTokens`, `typographyTokens`, and related helpers/types from `ds-react`).

**Stack (behavior vs presentation):**

- Interactive behavior (Button press model; Tabs selection, keyboard navigation, and panel association) is implemented in this library with **raw React** and semantic HTML.
- Styles and tokens are owned by the design system (plain CSS + `--ds-*` custom properties).
- The package does **not** depend on `react-aria` or `react-aria-components`.
- Accessibility follows the WAI-ARIA APG and **WCAG 2.2 Level AA** as the testable floor toward WCAG 3.0 outcomes.

Peer dependencies: `react` and `react-dom` (18 or 19).

## Installation

```bash
npm install ds-react
```

Ensure `react` and `react-dom` are installed in the host app. Styles are not injected on import (keeps generated types clean):

```ts
import 'ds-react/styles'
import {
  Badge,
  Button,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from 'ds-react'
```

## Button

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

## Badge

Static status label. Variants: `Neutral` | `Positive` | `Negative`. Size modes are **viewport-driven** (no `mobile` prop):

- Desktop (`min-width: 769px`): padding `3XS`/`2XS`, radius `lg` (12px), height 26px
- Mobile (`max-width: 768px`): padding `4XS`/`3XS`, radius `md` (8px), height 22px
- Typography (all modes): `body-s` (12px / 150%), Inter, weight 700, color `OnNeutral`

```tsx
import { Badge } from 'ds-react'

<Badge variant="Positive">New</Badge>
<Badge variant="Negative">Alert</Badge>
```

## Tabs and Tab

Compound tabs for switching content. Visual variants: **`Pill`** | **`Underline`** only. Interactive states in CSS follow design specs (Default, Hover, Active, Focus via `data-*` attributes). There is no `disabled` or `loading` Tab API in the shipped design.

**Responsive layout** uses CSS media queries only (`>768px` desktop, `≤768px` mobile). There is **no** JavaScript `mobile` prop.

Selecting a tab updates which **`TabPanel`** is shown (same public `id` on `Tab` and `TabPanel`).

```tsx
import { Badge, Tab, TabList, TabPanel, Tabs } from 'ds-react'

export function WorkspaceTabs() {
  return (
    <Tabs
      variant="Pill"
      defaultSelectedKey="emails"
      aria-label="Workspace"
      onSelectionChange={(key) => console.log(key)}
    >
      <TabList>
        <Tab id="emails" badge={<Badge variant="Neutral">12</Badge>}>
          Emails
        </Tab>
        <Tab id="files" badge={<Badge variant="Negative">!</Badge>}>
          Files
        </Tab>
        <Tab id="edits">Edits</Tab>
      </TabList>
      <TabPanel id="emails">Emails content</TabPanel>
      <TabPanel id="files">Files content</TabPanel>
      <TabPanel id="edits">Edits content</TabPanel>
    </Tabs>
  )
}
```

**Tabs props:** `variant`, `selectedKey`, `defaultSelectedKey`, `onSelectionChange`, `aria-label`, `className`.

**Tab props:** `id`, `children`, optional `badge` (pass the design-system `Badge`; choose `Badge` variant on `Badge` itself), optional `variant` / `isSelected` when used standalone outside `Tabs`.

**Storybook:** `Components/Tab` (single-tab matrices and variants), `Components/Tabs` (lists, badges, interactive panels).

## Tokens

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

`npm test` runs Vitest **with coverage**. The run fails if lines, branches, functions, or statements drop below **85%** globally and for public modules under `src/components/Button/**`, `src/components/Badge/**`, `src/components/Tab/**`, `src/components/Tabs/**`, and `src/tokens/**`.

## Accessibility

This library targets **WCAG 3.0** outcomes for interactive controls. Until WCAG 3.0 is a W3C Recommendation, **WCAG 2.2 Level AA** is the automated and reviewable floor (axe, keyboard tests, token contrast). Storybook: **Overview**. Per-control mapping tables: [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Publish

`npm run build` emits `dist/` (ESM, CJS, types, CSS). `exports` points at those artifacts. `react` and `react-dom` are not bundled.
