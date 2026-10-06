import type { CSSProperties, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { colorTokens } from '../tokens/colors'
import {
  spacingCssVar,
  spacingTokenOrder,
  spacingTokens,
  type SpacingToken,
} from '../tokens/spacing'
import { typographyTokens } from '../tokens/typography'

const meta = {
  title: 'Design System/Tokens Gallery',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Living documentation for design tokens. Prefer CSS custom properties (`var(--ds-…)`) in components; use the TypeScript token modules for typed references and Storybook tooling.',
      },
    },
    a11y: {
      // Documentation canvas, not a product control.
      test: 'todo',
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const pageStyle: CSSProperties = {
  fontFamily: 'var(--ds-font-family)',
  color: 'var(--OnNeutral)',
  maxWidth: '56rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ds-space-2xl)',
}

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ds-space-s)',
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 'var(--ds-font-size-sm)',
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: 'var(--ds-space-3xs) var(--ds-space-2xs)',
  borderBottom: '1px solid var(--Outline)',
}

const tdStyle: CSSProperties = {
  padding: 'var(--ds-space-2xs)',
  borderBottom: '1px solid var(--Outline)',
  verticalAlign: 'middle',
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section style={sectionStyle}>
      <div>
        <h2 style={{ margin: 0, fontSize: 'var(--ds-font-size-lg)' }}>{title}</h2>
        <p style={{ margin: 'var(--ds-space-3xs) 0 0', color: 'var(--OnNeutral)' }}>
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

function SpacingPreview({ token }: { token: SpacingToken }) {
  const size = spacingTokens[token].rem
  return (
    <div
      aria-hidden="true"
      style={{
        width: size === '0' ? '1px' : size,
        height: size === '0' ? '1px' : size,
        minWidth: size === '0' ? '1px' : size,
        background: 'var(--Inverse)',
        borderRadius: 'var(--ds-radius-sm)',
        opacity: token === '0' ? 0.35 : 1,
      }}
    />
  )
}

function TokensGalleryPage() {
  return (
    <div style={pageStyle}>
      <header>
        <h1 style={{ margin: 0 }}>Design System Tokens</h1>
        <p style={{ margin: 'var(--ds-space-3xs) 0 0' }}>
          Use these tokens instead of hardcoded spacing, color, or type values. Override on{' '}
          <code>:root</code> or a theme scope when branding the consuming app.
        </p>
      </header>

      <Section
        title="Spacing"
        description="Use for padding, gap, and margin. Prefer semantic steps (3XS, S, XL) over raw pixel values. Badge uses 3XS/2XS above 768px and 4XS/3XS at max-width 768px."
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Token</th>
              <th style={thStyle}>CSS variable</th>
              <th style={thStyle}>px</th>
              <th style={thStyle}>rem</th>
              <th style={thStyle}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {spacingTokenOrder.map((token) => {
              const value = spacingTokens[token]
              return (
                <tr key={token}>
                  <td style={tdStyle}>
                    <code>{token}</code>
                  </td>
                  <td style={tdStyle}>
                    <code>{spacingCssVar(token)}</code>
                  </td>
                  <td style={tdStyle}>{value.px}px</td>
                  <td style={tdStyle}>
                    <code>{value.rem}</code>
                  </td>
                  <td style={tdStyle}>
                    <SpacingPreview token={token} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Section>

      <Section
        title="Typography"
        description="Body text uses Inter. Prefer body-m for default copy and body-s for compact UI labels. Size and line-height are exposed as --font-size-body-* and --line-height-body-*."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-s)' }}>
          <p
            style={{
              margin: 0,
              fontFamily: typographyTokens['body-m'].fontFamily,
              fontSize: 'var(--font-size-body-m)',
              lineHeight: 'var(--line-height-body-m)',
            }}
          >
            Body M - This is a specimen
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: typographyTokens['body-s'].fontFamily,
              fontSize: 'var(--font-size-body-s)',
              lineHeight: 'var(--line-height-body-s)',
            }}
          >
            Body S - This is a specimen
          </p>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Token Name</th>
              <th style={thStyle}>Font Size</th>
              <th style={thStyle}>Line Height</th>
              <th style={thStyle}>Font Family</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['body-m', typographyTokens['body-m']],
                ['body-s', typographyTokens['body-s']],
              ] as const
            ).map(([name, token]) => (
              <tr key={name}>
                <td style={tdStyle}>
                  <code>{name}</code>
                </td>
                <td style={tdStyle}>
                  <code>{token.fontSize}</code>
                </td>
                <td style={tdStyle}>
                  <code>{token.lineHeight} (150%)</code>
                </td>
                <td style={tdStyle}>
                  <code>{token.fontFamily}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section
        title="Color Tokens"
        description="Exactly eleven color tokens. Use CSS custom properties named after each token (e.g. var(--SurfaceHigh)). Do not introduce unlisted palette steps."
      >
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Token Name</th>
              <th style={thStyle}>Hex</th>
              <th style={thStyle}>Swatch</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(colorTokens) as Array<[keyof typeof colorTokens, string]>).map(
              ([name, hex]) => (
                <tr key={name}>
                  <td style={tdStyle}>
                    <code>{name}</code>
                  </td>
                  <td style={tdStyle}>
                    <code>{hex}</code>
                  </td>
                  <td style={tdStyle}>
                    <div
                      aria-hidden="true"
                      title={name}
                      style={{
                        width: 'var(--ds-space-xl)',
                        height: 'var(--ds-space-l)',
                        background: `var(--${name})`,
                        border: '1px solid var(--Outline)',
                        borderRadius: 'var(--ds-radius-sm)',
                      }}
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </Section>
    </div>
  )
}

export const Gallery: Story = {
  name: 'Gallery',
  render: () => <TokensGalleryPage />,
}
