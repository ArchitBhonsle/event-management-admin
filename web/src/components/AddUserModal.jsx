import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createHandleChange } from '../utils/createHandleChange';

export default function AddUserModal({ isOpen, onClose, finalFocusRef }) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    department: 'OTHER',
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    department: null,
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
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor='username'>name</FormLabel>
              <Input
                id='username'
                name='username'
                placeholder='username'
                value={fields.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>email</FormLabel>
              <Input
                type='email'
                name='email'
                placeholder='abc@def.com'
                value={fields.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.department}>
              <FormLabel>department</FormLabel>
              <Select
                placeholder='Select country'
                name='department'
                value={fields.department}
                onChange={handleChange}
              >
                <option>COMPS</option>
                <option>ELEC</option>
                <option>MECH</option>
                <option>EXTC</option>
                <option>IT</option>
                <option>OTHER</option>
              </Select>
              <FormErrorMessage>{errors.department}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='green'
            onClick={() => {
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
