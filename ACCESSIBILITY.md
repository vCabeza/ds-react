# Accessibility — ds-react

This library targets **WCAG 3.0** outcomes for interactive controls (focus, keyboard, names, contrast, assistive technologies).

WCAG 3.0 is a W3C **Working Draft**. It is not a final conformance standard. **WCAG 2.2 Level AA** is the testable floor used in CI (axe, keyboard tests, token contrast). Meeting 2.2 AA is how we currently prove the WCAG 3.0 outcomes that apply to each control.

Interactive behavior is implemented with **raw React** and semantic HTML. Shared helpers in `src/lib/interaction.ts` provide hover, pressed, and keyboard-only focus-visible (`data-*`) without depending on `react-aria` or `react-aria-components`.

---

## Button

| WCAG 3.0 outcome (control) | WCAG 2.2 AA check (CI / review) | Implementation |
| --- | --- | --- |
| Accessible name (visible text or programmatic name) | 4.1.2 Name, Role, Value; 1.1.1 Non-text Content | Discriminated types: icon-only requires `aria-label`. Icon slots are `aria-hidden`. Tests query `role="button"` + `name`. |
| Text contrast ≥ 4.5:1 | 1.4.3 Contrast (Minimum) | Solid primary uses `Inverse` (`#1B2134`) on `OnInverse` (`#FFFFFF`). Neutral uses `OnNeutral` on `SurfaceHigh`. Danger uses `OnNeutral` on `SurfaceNegative`. |
| UI / focus contrast ≥ 3:1 | 1.4.11 Non-text Contrast | 2px focus ring uses `Inverse`, `outline-offset: 2px`. Focus is never removed without a replacement (`data-focus-visible`). |
| Visible, unclipped focus | 2.4.7 Focus Visible; 2.4.13 Focus Appearance (2.2) | Keyboard-only ring via `data-focus-visible` from library focus-visible tracking. |
| Keyboard operation | 2.1.1 Keyboard | Native `<button>`: Tab, Enter, Space. Native `type` `button` / `submit` / `reset`. Covered in `Button.test.tsx`. |
| Pointer target | 2.5.8 Target Size (Minimum) | `min-height` / `min-width`: sm 32px, md 40px, lg 44px (≥ 24px CSS). Tokens `--ds-target-*`. |
| Motion not essential | 2.3.3 Animation from Interactions | `prefers-reduced-motion: reduce` disables transitions and spinner spin. |
| State not by color alone | 1.4.1 Use of Color | `data-hovered`, `data-pressed`, `data-disabled` (opacity), `data-pending` (spinner + AT text). |
| Equivalent pointer and keyboard | 2.5.1 Pointer Gestures (press model) | Public API is `onPress` (library-owned), not `onClick`. |
| Pending / busy announced | 4.1.3 Status Messages | `aria-busy` on the button. `pendingLabel` is announced on a polite `role="status"` live region **outside** the button so the accessible name stays the visible label. `onPress` is omitted; click `preventDefault` avoids double submit. Native `disabled` is not used while pending so focus is kept. |
| Language of defaults | 3.1.2 Language of Parts (host app) | Default `pendingLabel` is English (`Loading`) and overridable. |
| Forms | 3.2.2 On Input / 3.3.1 | Native `type`, `name`, `value`, `form*`. Consumers must bind `isPending` to submit state. |

### Button — design notes

- Markup is always a native `<button>`. There is no `<div role="button">`. This version does not render links as buttons (avoids href vs submit conflicts).
- Behavior is owned by this library (raw React). Tokens and CSS are owned by this package.
- `isDisabled` uses the native `disabled` attribute.
- Axe in Vitest covers default, disabled, pending, icon-only, outline, and ghost. Axe does not reliably measure contrast of CSS custom properties; contrast is guaranteed by reference tokens.
- Storybook uses `@storybook/addon-a11y` for per-story checks.

---

## Tabs and Tab

Tabs follow the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). **Tabs**, **TabList**, **TabPanel**, and **Tab** implement selection, focus management, and keyboard behavior in this library. Standalone **Tab** (outside `Tabs`) uses a native `<button role="tab">` with library hover / press / focus-visible helpers.

Shipped variants are **Pill** and **Underline** only. Visual states are Default, Hover, Active, and Focus (via `data-hovered`, `data-pressed`, `data-focus-visible`, `data-selected`). Responsive sizing is **CSS media-query driven** (`>768px` / `≤768px`); there is no `mobile` prop and no disabled/loading Tab states in the design scope.

| WCAG 3.0 outcome (control) | WCAG 2.2 AA check (CI / review) | Implementation |
| --- | --- | --- |
| Correct roles and structure | 4.1.2 Name, Role, Value | `role="tablist"` on `TabList`, `role="tab"` on each tab, `role="tabpanel"` on the visible panel. Tests in `Tabs.test.tsx` assert roles. |
| Selected state programmatically available | 4.1.2 Name, Role, Value | `aria-selected="true|false"` on tabs. Roving `tabIndex`: selected tab `0`, others `-1`. Covered in `Tabs.test.tsx` and standalone `Tab.test.tsx`. |
| Keyboard navigation | 2.1.1 Keyboard | Arrow Left/Right moves focus and selection (with wrap). Home/End jump to first/last tab. Enter/Space activate the focused tab via native `<button>` behavior. Covered in `Tabs.test.tsx`. |
| Accessible name for tab list | 4.1.2 Name, Role, Value | Pass `aria-label` on `Tabs`; forwarded to `TabList` when no visible label is present. |
| Accessible name for each tab | 4.1.2 Name, Role, Value | Name from visible label text in `.ds-tab__label`. Optional **badge** slot renders after the label; badge text contributes to the tab’s accessible name when present (use concise badge labels). Choose **Badge** variant on the `Badge` component, not on `Tab`. |
| Panel association / content change | 4.1.2 Name, Role, Value | Matching public `id` on `Tab` and `TabPanel`; DOM ids use `ds-tab-*` / `ds-tabpanel-*` with `aria-controls` / `aria-labelledby`. Selecting a tab shows the corresponding panel and hides others. |
| Focus visible | 2.4.7 Focus Visible; 2.4.13 Focus Appearance (2.2) | Library focus-visible tracking → `data-focus-visible`. Outline uses design tokens (`--Inverse`, `--ds-focus-width`, `--ds-focus-offset`). Pill unselected focus may use black outline per spec where no token exists. |
| State not by color alone | 1.4.1 Use of Color | Selection, hover, and press conveyed with `data-selected`, `data-hovered`, `data-pressed`, and underline indicator (not color alone). |
| Text contrast ≥ 4.5:1 | 1.4.3 Contrast (Minimum) | Tab label uses `OnNeutral` / `OnInverse` (selected Pill) via tokens. Badge uses `OnNeutral` on surface tokens. |
| UI / focus contrast ≥ 3:1 | 1.4.11 Non-text Contrast | Focus rings and underline indicators use tokenized or spec-defined colors. |
| Pointer target (tab height) | 2.5.8 Target Size (Minimum) | Desktop tab height 50px; mobile 42px (CSS). Meets minimum target guidance for default sizes. |
| No invented disabled/error states | 4.1.2 (predictable behavior) | No disabled Tab API in scope; consumers should not add conflicting ARIA without design approval. |

### Tabs / Tab — design notes

- Prefer a native `<button role="tab">` for tab triggers.
- Standalone `Tab` must sit inside a `role="tablist"` (or parent `Tabs`) for valid axe `aria-required-parent` when tested in isolation; collection usage is the primary consumer path.
- **Badge** in the badge slot should remain short status text; avoid replacing the tab label with badge-only content without an accessible name strategy.
- Vitest + jest-axe: `Tabs.test.tsx` (collection + keyboard), `Tab.test.tsx` (standalone + tablist wrapper for axe).
- Storybook: `@storybook/addon-a11y` enabled in preview; stories under **Components/Tab** and **Components/Tabs**.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/)
- [WAI-ARIA APG: Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
