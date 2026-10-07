import type { CSSProperties, ReactNode } from 'react'
import { colorTokens } from '../color'
import {
  spacingCssVar,
  spacingTokenOrder,
  spacingTokens,
  type SpacingToken,
} from '../spacing'
import { typographyTokens } from '../typography'

const pageStyle: CSSProperties = {
  fontFamily: 'var(--ds-font-family)',
  color: 'var(--OnNeutral)',
  maxWidth: '56rem',
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

function TokensPage({ children }: { children: ReactNode }) {
  return <div style={pageStyle}>{children}</div>
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

export function ColorsTokensView() {
  return (
    <TokensPage>
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
    </TokensPage>
  )
}

export function SpacingTokensView() {
  return (
    <TokensPage>
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
    </TokensPage>
  )
}

export function TypographyTokensView() {
  return (
    <TokensPage>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-s)' }}>
        <p
          style={{
            margin: 0,
            fontFamily: typographyTokens['body-m'].fontFamily,
            fontSize: 'var(--font-size-body-m)',
            lineHeight: 'var(--line-height-body-m)',
          }}
        >
          Body M
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: typographyTokens['body-s'].fontFamily,
            fontSize: 'var(--font-size-body-s)',
            lineHeight: 'var(--line-height-body-s)',
          }}
        >
          Body S
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
                <code>{token.lineHeight}</code>
              </td>
              <td style={tdStyle}>
                <code>{token.fontFamily}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TokensPage>
  )
}

/** Radius, target size, and focus tokens from `tokens.css` (no TypeScript mirror yet). */
export function InteractionTokensView() {
  const rows = [
    { name: 'radius-sm', css: '--ds-radius-sm' },
    { name: 'radius-md', css: '--ds-radius-md' },
    { name: 'radius-lg', css: '--ds-radius-lg' },
    { name: 'target-sm', css: '--ds-target-sm' },
    { name: 'target-md', css: '--ds-target-md' },
    { name: 'target-lg', css: '--ds-target-lg' },
    { name: 'focus-offset', css: '--ds-focus-offset' },
    { name: 'focus-width', css: '--ds-focus-width' },
    { name: 'disabled-opacity', css: '--ds-disabled-opacity' },
  ] as const

  return (
    <TokensPage>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>CSS variable</th>
            <th style={thStyle}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td style={tdStyle}>
                <code>{row.name}</code>
              </td>
              <td style={tdStyle}>
                <code>{row.css}</code>
              </td>
              <td style={tdStyle}>
                {row.name.startsWith('radius') ? (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 'var(--ds-space-xl)',
                      height: 'var(--ds-space-l)',
                      background: 'var(--Inverse)',
                      borderRadius: `var(${row.css})`,
                    }}
                  />
                ) : row.name.startsWith('target') ? (
                  <div
                    aria-hidden="true"
                    style={{
                      width: `var(${row.css})`,
                      height: `var(${row.css})`,
                      background: 'var(--SurfaceHigh)',
                      border: '1px solid var(--Outline)',
                      borderRadius: 'var(--ds-radius-sm)',
                    }}
                  />
                ) : row.name.startsWith('focus') ? (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 'var(--ds-space-xl)',
                      height: 'var(--ds-space-l)',
                      background: 'var(--SurfaceHigh)',
                      outline: `${row.name === 'focus-width' ? 'var(--ds-focus-width)' : '2px'} solid var(--Inverse)`,
                      outlineOffset:
                        row.name === 'focus-offset' ? 'var(--ds-focus-offset)' : '2px',
                      borderRadius: 'var(--ds-radius-sm)',
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 'var(--ds-space-xl)',
                      height: 'var(--ds-space-l)',
                      background: 'var(--Inverse)',
                      opacity: 'var(--ds-disabled-opacity)',
                      borderRadius: 'var(--ds-radius-sm)',
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TokensPage>
  )
}
