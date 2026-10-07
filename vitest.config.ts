import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@tokens': path.resolve(__dirname, 'src/tokens'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@test-utils': path.resolve(__dirname, 'src/test-utils'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-utils/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.types.ts',
        'src/**/*.styles.ts',
        'src/**/*.d.ts',
        'src/**/__docs__/**',
        'src/test-utils/**',
        'src/docs/**',
        'src/index.ts',
        'src/components/index.ts',
        'src/components/**/index.ts',
        'src/utils/index.ts',
      ],
      thresholds: {
        lines: 85,
        branches: 85,
        functions: 85,
        statements: 85,
        'src/components/button/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/components/badge/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/components/tabs/**': {
          lines: 85,
          branches: 85,
          functions: 85,
          statements: 85,
        },
        'src/components/tab/**': {
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
