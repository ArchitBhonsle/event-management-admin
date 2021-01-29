import {
  Grid,
  Heading,
  HStack,
  IconButton,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdCheck, MdClose, MdArrowForward } from 'react-icons/md';

const tagMap = {
  COMPS: 'blue',
  ELEC: 'purple',
  MECH: 'pink',
  EXTC: 'yellow',
  IT: 'red',
};

export default function UserCard({
  user: { rollNo, department, criteria, moneyOwed, name },
}) {
  return (
    <Grid
      p={4}
      w='100%'
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='1md'
      gridTemplateColumns='auto min-content'
      gridTemplateRows='auto min-content'
      gap={4}
    >
      <HStack>
        <Heading size='lg'>{rollNo}</Heading>
        {Object.values(criteria).every(v => v === true) ? (
          <MdCheck size='1.5rem' />
        ) : (
          <MdClose size='1.5rem' />
        )}
      </HStack>
      <VStack
        alignItems='center'
        justifyContent='space-between'
        gridColumn={2}
        gridRowStart={1}
        gridRowEnd={3}
      >
        <IconButton aria-label='events' icon={<MdArrowForward />} />
        <Text fontSize='xl' variant='outline'>
          ₹{moneyOwed}
        </Text>
      </VStack>
      <HStack>
        <Tag colorScheme={tagMap[department]} fontSize='xs'>
          {department}
        </Tag>
        <Text>{name}</Text>
      </HStack>
    </Grid>
  );
}
