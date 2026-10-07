import path from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    viteConfig.resolve = viteConfig.resolve ?? {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@tokens': path.resolve(__dirname, '../src/tokens'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@test-utils': path.resolve(__dirname, '../src/test-utils'),
    }
    return viteConfig
  },
}

export default config
