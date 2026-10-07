import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
import '../styles/tokens.css'
import '../components/button/Button.css'
import '../components/badge/Badge.css'
import '../components/tab/Tab.css'
import '../components/tabs/Tabs.css'

expect.extend(toHaveNoViolations)
