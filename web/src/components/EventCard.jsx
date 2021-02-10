import { Text, Grid, Heading, HStack } from '@chakra-ui/react';

import { MdPeopleOutline, MdPersonOutline } from 'react-icons/md';

import useModeColors from '../hooks/useModeColors';
import parseEventTime from '../utils/parseEventTime';

const categoryToEmojiMap = {
  C: '💃',
  T: '💻',
  F: '🎲',
};

export default function EventCard({
  event: {
    eventCode = 'CODE',
    title = 'Mock Event',
    start = '1-12:00',
    seats = 4,
    maxSeats = 10,
    category = 'C',
    isSeminar = true,
    teamSize,
  },
  setEditEvent,
  editEventOnOpen,
}) {
  const { green } = useModeColors();

  return (
    <Grid
      p={4}
      w='100%'
      borderWidth='2px'
      borderRadius='lg'
      gridTemplateColumns='auto min-content'
      gridTemplateRows='auto min-content'
      alignItems='center'
      gap={4}
      _hover={{
        borderColor: green,
      }}
      cursor='pointer'
      onClick={() => {
        setEditEvent(eventCode);
        editEventOnOpen();
      }}
    >
      <HStack alignItems='center'>
        <Heading size='lg'>{eventCode}</Heading>
        <Text>
          {categoryToEmojiMap[category]}
          {isSeminar && '🎤'}
        </Text>
      </HStack>
      <HStack alignItems='center' justifySelf='flex-end' spacing={1}>
        {teamSize === 1 ? <MdPersonOutline /> : <MdPeopleOutline />}
        <Text>
          {seats}/{maxSeats}
        </Text>
      </HStack>
      <Text>{title}</Text>
      <Text fontSize='sm' justifySelf='flex-end'>
        {parseEventTime(start).time}
      </Text>
    </Grid>
  );
}
