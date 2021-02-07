import {
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import EventPanel from '../components/EventPanel';

const days = [1, 2, 3];

export default function Events() {
  const tabColor = useColorModeValue('green.600', 'green.300');

  return (
    <Tabs colorScheme='green' variant='solid-rounded' isFitted isLazy isManual>
      <TabList>
        <Tab>Day One</Tab>
        <Tab>Day Two</Tab>
        <Tab>Day Three</Tab>
        <IconButton
          aria-label='add an event'
          icon={<MdAdd fontSize='1.25rem' />}
          colorScheme='green'
          bgColor={tabColor}
          borderRadius='full'
          ml={1}
        />
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
