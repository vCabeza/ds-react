import type { Preview } from '@storybook/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '../src/styles/tokens.css'
import '../src/components/Button/Button.css'
import '../src/components/Badge/Badge.css'
import '../src/components/Tab/Tab.css'
import '../src/components/Tabs/Tabs.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'ds-react accessible primitives. Interactive controls use React Aria; visual values come from design tokens.',
      },
    },
    a11y: {
      test: 'error',
    },
  },
}

export default preview
