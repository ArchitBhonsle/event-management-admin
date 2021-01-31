import {
  Grid,
  Heading,
  Tag,
  Text,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import UserModal from './UserModal';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalFocusRef = useRef();

  return (
    <>
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
          borderColor: 'green.200',
          cursor: 'pointer',
        }}
        onClick={onOpen}
        ref={finalFocusRef}
      >
        <HStack>
          <Heading size='lg'>{rollNo}</Heading>
          {Object.values(criteria).every(v => v === true) ? (
            <MdCheck size='1.5rem' />
          ) : (
            <MdClose size='1.5rem' />
          )}
        </HStack>
        <Text fontSize='xl' variant='outline' textAlign='center'>
          ₹{moneyOwed}
        </Text>
        <HStack>
          <Tag colorScheme={tagMap[department]} fontSize='xs'>
            {department}
          </Tag>
          <Text>{name}</Text>
        </HStack>
      </Grid>
      <UserModal
        rollNo={rollNo}
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={finalFocusRef}
      />
    </>
  );
}
