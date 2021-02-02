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
  HStack,
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
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Fragment, useRef, useState } from 'react';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
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
  const amountRef = useRef();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={finalFocusRef}
        initialFocusRef={amountRef}
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
                <InputGroup
                  w='50%'
                  style={{
                    borderRadius: 0,
                  }}
                >
                  <InputLeftElement children='₹' />
                  <Input
                    ref={amountRef}
                    variant='filled'
                    type='number'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    textAlign='right'
                    style={{
                      borderRadius: '0.375rem 0 0 0.375rem',
                    }}
                  />
                </InputGroup>
                <Button
                  colorScheme='green'
                  onClick={paidConfOnOpen}
                  borderLeftRadius={0}
                >
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
  ['criteria', 'Criteria'],
];

function ModalDisplay({ user }) {
  const colorRed = useColorModeValue('red.500', 'red.200');
  const colorGreen = useColorModeValue('green.500', 'green.200');

  const table = tableFields.map(([key, val]) => [val, user[key]]);

  function tableRow(key, val) {
    if (key === 'Money Owed') {
      return (
        <Fragment key={key}>
          <Text fontWeight='bold'>{key}</Text>
          <Text fontWeight='bold' color={val < 0 ? colorRed : colorGreen}>
            ₹ {val}
          </Text>
        </Fragment>
      );
    } else if (key === 'Criteria') {
      return (
        <Fragment key={key}>
          <Text fontWeight='bold'>{key}</Text>
          <HStack spacing={6}>
            {Object.entries(val).map(([crit, state]) => (
              <HStack alignItems='center' key={crit}>
                <Text color={state ? colorGreen : colorRed}>
                  {state ? (
                    <MdCheckCircle size='1.25rem' />
                  ) : (
                    <MdCancel size='1.25rem' />
                  )}
                </Text>
                <Text>{crit}</Text>
              </HStack>
            ))}
          </HStack>
        </Fragment>
      );
    } else {
      return (
        <Fragment key={key}>
          <Text fontWeight='bold'>{key}</Text>
          <Text>{val}</Text>
        </Fragment>
      );
    }
  }

  return (
    <>
      <Grid
        alignItems='center'
        gridTemplateColumns='max-content auto'
        gap='1rem 2rem'
      >
        {table.map(([key, val]) => tableRow(key, val))}
      </Grid>
      <Text fontWeight='bold' mt={4} mb={2}>
        Events
      </Text>
      <Table>
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
