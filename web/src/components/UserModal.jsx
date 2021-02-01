import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Fragment, useRef, useState } from 'react';
import useSWR from 'swr';

export default function UserModal({ isOpen, onClose, rollNo, finalFocusRef }) {
  const { data, error } = useSWR(`users/${rollNo}`);

  let content = null;
  if (error || data?.error) {
    content = <Heading>Something Went Wrong</Heading>;
  } else if (!data) {
    content = <Spinner />;
  } else if (data?.data) {
    content = <ModalDisplay user={data?.data} />;
  }

  const {
    isOpen: deleteConfIsOpen,
    onOpen: deleteConfOnOpen,
    onClose: deleteConfOnClose,
  } = useDisclosure();
  const {
    isOpen: paidConfIsOpen,
    onOpen: paidConfOnOpen,
    onClose: paidConfOnClose,
  } = useDisclosure();
  const [amount, setAmount] = useState(0);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={finalFocusRef}
        size='xl'
        isCentered
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>{rollNo}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            <Flex justifyContent='space-between' w='100%'>
              <Button
                variant='ghost'
                colorScheme='red'
                onClick={deleteConfOnOpen}
              >
                Delete
              </Button>
              <Flex w='60%' justifyContent='flex-end'>
                <InputGroup w='50%'>
                  <InputLeftElement children='₹' />
                  <Input
                    variant='filled'
                    type='number'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                </InputGroup>
                <Button colorScheme='green' onClick={paidConfOnOpen}>
                  Paid
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteConfirmation
        rollNo={rollNo}
        isOpen={deleteConfIsOpen}
        onClose={deleteConfOnClose}
      />
      <PaidConfirmation
        rollNo={rollNo}
        amount={amount}
        isOpen={paidConfIsOpen}
        onClose={paidConfOnClose}
      />
    </>
  );
}

const tableFields = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['department', 'Department'],
  ['moneyOwed', 'Money Owed'],
];

function ModalDisplay({ user }) {
  const table = tableFields.map(([key, val]) => [val, user[key]]);

  return (
    <>
      <Grid alignItems='center' gridTemplateColumns='max-content auto' gap={4}>
        {table.map(([key, val]) => (
          <Fragment key={key}>
            <Text fontWeight='bold'>{key}</Text>
            {key === 'Money Owed' ? (
              <Text fontSize='3xl' fontWeight='bold' textAlign='right'>
                ₹ {val}
              </Text>
            ) : (
              <Text>{val}</Text>
            )}
          </Fragment>
        ))}
      </Grid>
      <Table>
        <TableCaption placement='top'>Events</TableCaption>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Timing</Th>
            <Th isNumeric>Cost</Th>
          </Tr>
        </Thead>
        {user.events.map(({ code, timing, cost }) => (
          <Tr key={code}>
            <Th>{code}</Th>
            <Th>{timing}</Th>
            <Th isNumeric>{cost}</Th>
          </Tr>
        ))}
      </Table>
    </>
  );
}

function DeleteConfirmation({ rollNo, isOpen, onClose }) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='xl' fontWeight='bold'>
            Delete User
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete {rollNo}? This can't be undone!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onClose} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

function PaidConfirmation({ rollNo, amount, isOpen, onClose }) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='xl' fontWeight='bold'>
            ₹{amount} by {rollNo}
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to confirm payment of {amount} by {rollNo}?
            This action cannot be undone!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='green' onClick={onClose} ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
