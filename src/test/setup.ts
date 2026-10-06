import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
import '../styles/tokens.css'
import '../components/Button/Button.css'
import '../components/Badge/Badge.css'
import '../components/Tab/Tab.css'
import '../components/Tabs/Tabs.css'

expect.extend(toHaveNoViolations)
