import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

export default function UserModal({ isOpen, onClose, rollNo, finalFocusRef }) {
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={finalFocusRef}
        size='xl'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>{rollNo}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hello</ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              <Button colorScheme='red' onClick={alertOnOpen}>
                Delete
              </Button>
              <Button
                colorScheme='green'
                variant='ghost'
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteConfirmation
        rollNo={rollNo}
        isOpen={alertIsOpen}
        onClose={alertOnClose}
      />
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
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
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
