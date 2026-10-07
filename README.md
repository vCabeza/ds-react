# ds-react — Design System home test

Take-home exercise for a **selection process**: build an accessible, reusable **Tabs** experience (with Badge support) as if it belonged to a larger Design System.


---

## How to run

**Requirements:** Node.js **≥ 20**, npm.

```bash
npm install
```

### Storybook (primary review surface)

```bash
npm install
npm run build
npm run storybook
```

### Quality gates

```bash
npm test          # Vitest + coverage (85% floor)
npm run typecheck
npm run lint
npm run build     # library artifacts in dist/
```

`npm test` fails if lines, branches, functions, or statements drop below **85%** (global and per public component/token modules).

---

## Technology choices (and why)

Decisions below are deliberate for a **Design System home test**: show ownership of behavior and CSS, keep the stack reviewable in a short session, and stay inside the brief.

### React (raw) + TypeScript

- **Why React:** required by the brief; DS consumers typically already use it.
- **Why TypeScript (strict):** safer public APIs for a DS (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, no `any`). Discriminated types enforce accessible names (e.g. icon-only Button requires `aria-label`).

### Plain CSS + design tokens (no Tailwind / CSS frameworks)

- **Why plain CSS over CSS-in-JS:** keeps presentation inspectable in Storybook and in `tokens.css`, avoids runtime style engines, and maps 1:1 to Figma token names (`--ds-*`, semantic colors).
- **Responsive Badge/Tab metrics:** CSS media queries only (`>768px` / `≤768px`). No JS `mobile` prop—layout stays in CSS where the design defines breakpoints.

### Storybook 8 (React + Vite)

- Optional in the brief; chosen as the **canonical demo**: variants, Badge on Tab, Mobile Viewport frames, Tokens, and a11y addon.
- Docs are split so **Overview** holds shared stack/a11y/setup, and component MDX stays API- and specimen-focused.

### Vitest + Testing Library + jest-axe

- Fast unit/integration feedback in CI-like local runs.
- RTL + `user-event` for keyboard/pointer parity; jest-axe for automated a11y smoke.
- **85% coverage** watermarks on public modules so the exercise shows test discipline, not only happy-path demos.

### Vite / tsup / ESLint

| Tool | Role | Why |
| --- | --- | --- |
| **Vite** | Storybook builder | Fast DX; same ecosystem as Vitest |
| **tsup** | Library build (ESM + CJS + types + CSS) | Simple packaging for a small DS package without a heavy rollup config |
| **ESLint** (+ jsx-a11y, react-hooks) | Static quality | Catch a11y and React pitfalls early; `no-explicit-any` |

---

## Accessibility (short)

- Focus visible, keyboard parity, accessible names, state not by color alone, token contrast, `prefers-reduced-motion`, minimum targets.
- Full mapping and per-control notes: Storybook **Overview** → Accessibility.

---

## Suggested review path

1. `npm install` → `npm run storybook`
2. Read **Overview**, then **Components / Tabs** (Desktop Specs, Mobile Viewport, With badges)
3. Skim **Tab** + **Badge** Docs and the Tokens gallery
4. `npm test` and glance at `__test__` next to Tabs/Tab/Badge
5. Open `src/components/tabs/` and `src/utils/interaction.ts` for the raw behavior implementation

Questions about trade-offs are welcome in the pair-programming session—this README is the map, Storybook and tests are the evidence.
