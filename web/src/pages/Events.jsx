import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import EventPanel from '../components/EventPanel';

const days = [1, 2, 3];

export default function Events() {
  return (
    <Tabs
      colorScheme='green'
      size='lg'
      variant='solid-rounded'
      isFitted
      isLazy
      isManual
    >
      <TabList>
        <Tab>Day One</Tab>
        <Tab>Day Two</Tab>
        <Tab>Day Three</Tab>
      </TabList>
      <TabPanels>
        {days.map(day => (
          <TabPanel key={day} px={0} py={6}>
            <EventPanel day={day} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
