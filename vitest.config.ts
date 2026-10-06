import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.types.ts',
        'src/**/*.d.ts',
        'src/test/**',
        'src/index.ts',
        'src/components/**/index.ts',
      ],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 85,
        statements: 85,
        'src/components/Button/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/components/Badge/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/components/Tabs/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/components/Tab/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/tokens/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
      },
    },
  },
})
