import { Grid, Heading, IconButton, Tag, Text, HStack } from '@chakra-ui/react';
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
      borderWidth='2px'
      borderRadius='lg'
      boxShadow='1md'
      gridTemplateColumns='auto min-content'
      gridTemplateRows='auto min-content'
      gap={2}
      _hover={{
        borderColor: 'green.200',
      }}
    >
      <HStack>
        <Heading size='lg'>{rollNo}</Heading>
        {Object.values(criteria).every(v => v === true) ? (
          <MdCheck size='1.5rem' />
        ) : (
          <MdClose size='1.5rem' />
        )}
      </HStack>
      <IconButton aria-label='events' icon={<MdArrowForward />} />
      <HStack>
        <Tag colorScheme={tagMap[department]} fontSize='xs'>
          {department}
        </Tag>
        <Text>{name}</Text>
      </HStack>
      <Text fontSize='xl' variant='outline' textAlign='center'>
        ₹{moneyOwed}
      </Text>
    </Grid>
  );
}
