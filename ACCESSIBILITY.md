# Accessibility — Button

This library targets **WCAG 3.0** outcomes for a button (focus, keyboard, name, contrast, assistive technologies).

WCAG 3.0 is a W3C **Working Draft** (updated September 2026). It is not a final conformance standard. **WCAG 2.2 Level AA** is the testable floor used in CI (axe, keyboard tests, token contrast). Meeting 2.2 AA is how we currently prove the WCAG 3.0 outcomes that already apply to this control.

| WCAG 3.0 outcome (control) | WCAG 2.2 AA check (CI / review) | Implementation |
| --- | --- | --- |
| Accessible name (visible text or programmatic name) | 4.1.2 Name, Role, Value; 1.1.1 Non-text Content | Discriminated types: icon-only requires `aria-label`. Icon slots are `aria-hidden`. Tests query `role="button"` + `name`. |
| Text contrast ≥ 4.5:1 | 1.4.3 Contrast (Minimum) | Solid primary uses `Inverse` (`#1B2134`) on `OnInverse` (`#FFFFFF`). Neutral uses `OnNeutral` on `SurfaceHigh`. Danger uses `OnNeutral` on `SurfaceNegative`. |
| UI / focus contrast ≥ 3:1 | 1.4.11 Non-text Contrast | 2px focus ring uses `Inverse`, `outline-offset: 2px`. Focus is never removed without a replacement (`useFocusRing` → `data-focus-visible`). |
| Visible, unclipped focus | 2.4.7 Focus Visible; 2.4.13 Focus Appearance (2.2) | Keyboard-only ring via `data-focus-visible`. |
| Keyboard operation | 2.1.1 Keyboard | React Aria: Tab, Enter, Space. Native `type` `button` / `submit` / `reset`. Covered in `Button.test.tsx`. |
| Pointer target | 2.5.8 Target Size (Minimum) | `min-height` / `min-width`: sm 32px, md 40px, lg 44px (≥ 24px CSS). Tokens `--ds-target-*`. |
| Motion not essential | 2.3.3 Animation from Interactions | `prefers-reduced-motion: reduce` disables transitions and spinner spin. |
| State not by color alone | 1.4.1 Use of Color | `data-hovered`, `data-pressed`, `data-disabled` (opacity), `data-pending` (spinner + AT text). |
| Equivalent pointer and keyboard | 2.5.1 Pointer Gestures (press model) | Public API is `onPress` (React Aria), not `onClick`. |
| Pending / busy announced | 4.1.3 Status Messages | `aria-busy` on the button. `pendingLabel` is announced on a polite `role="status"` live region **outside** the button so the accessible name stays the visible label. `onPress` is omitted; click `preventDefault` avoids double submit. Native `disabled` is not used while pending so focus is kept. |
| Language of defaults | 3.1.2 Language of Parts (host app) | Default `pendingLabel` is English (`Loading`) and overridable. |
| Forms | 3.2.2 On Input / 3.3.1 | Aria `type`, `name`, `value`, `form*`. Consumers must bind `isPending` to submit state. |

## Design notes

- Markup is always a native `<button>`. There is no `<div role="button">`. This version does not render links as buttons (avoids href vs submit conflicts).
- Behavior comes from React Aria **hooks**. React Aria Components is intentionally not used so the library owns DOM, CSS, and the exported contract.
- `isDisabled` uses React Aria’s native `disabled` model.
- Axe in Vitest covers default, disabled, pending, icon-only, outline, and ghost. Axe does not reliably measure contrast of CSS custom properties; contrast is guaranteed by reference tokens.
- Storybook uses `@storybook/addon-a11y` for per-story checks.

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/)
- [React Aria useButton](https://react-aria.adobe.com/Button/useButton)
