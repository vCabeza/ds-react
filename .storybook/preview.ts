import type { Preview } from '@storybook/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '../src/styles/tokens.css'
import '../src/components/button/Button.css'
import '../src/components/badge/Badge.css'
import '../src/components/tab/Tab.css'
import '../src/components/tabs/Tabs.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'ds-react accessible primitives. Interactive controls use raw React and semantic HTML; visual values come from design tokens.',
      },
    },
    a11y: {
      test: 'error',
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Components',
          'Design System',
          ['Tokens', ['Colors', 'Spacing', 'Typography', 'Interaction']],
        ],
      },
    },
  },
}

export default preview
