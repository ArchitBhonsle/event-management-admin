import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createHandleChange } from '../utils/createHandleChange';

export default function AddUserModal({
  isOpen,
  onClose,
  finalFocusRef,
  mutate,
}) {
  const [fields, setFields] = useState({
    rollNo: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    rollNo: null,
    email: null,
  });

  const handleChange = createHandleChange(setFields, setErrors);

  return (
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
          <Heading>Add User</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl isInvalid={errors.rollNo}>
              <FormLabel htmlFor='rollNo'>roll number</FormLabel>
              <Input
                id='rollNo'
                name='rollNo'
                placeholder='[1|2|3|4|5]XXXXX(X)'
                value={fields.rollNo}
                onChange={handleChange}
              />
              <FormHelperText>
                For 'other' students leave this blank
              </FormHelperText>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>email</FormLabel>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='abc@def.com'
                value={fields.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='green'
            onClick={() => {
              mutate();
              onClose();
            }}
          >
            Add User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
