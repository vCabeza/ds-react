import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  async onSuccess() {
    const { copyFile, mkdir, readFile, writeFile } = await import('node:fs/promises')
    await mkdir('dist', { recursive: true })
    await copyFile('src/styles/tokens.css', 'dist/tokens.css')
    const tokens = await readFile('src/styles/tokens.css', 'utf8')
    const button = await readFile('src/components/Button/Button.css', 'utf8')
    const badge = await readFile('src/components/Badge/Badge.css', 'utf8')
    const tab = await readFile('src/components/Tab/Tab.css', 'utf8')
    const tabs = await readFile('src/components/Tabs/Tabs.css', 'utf8')
    await writeFile('dist/styles.css', `${tokens}\n${button}\n${badge}\n${tab}\n${tabs}\n`)
  },
})
