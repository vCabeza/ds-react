import { Badge } from '../../badge'
import { Tab } from '../../tab'
import { TabList, TabPanel, Tabs } from '../Tabs'

/** Minimal compound Tabs example for docs. */
export function Example() {
  return (
    <Tabs variant="Pill" defaultSelectedKey="emails" aria-label="Workspace">
      <TabList>
        <Tab id="emails" badge={<Badge variant="Neutral">12</Badge>}>
          Emails
        </Tab>
        <Tab id="files">Files</Tab>
      </TabList>
      <TabPanel id="emails">Emails content</TabPanel>
      <TabPanel id="files">Files content</TabPanel>
    </Tabs>
  )
}
