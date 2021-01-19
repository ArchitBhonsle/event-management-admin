import { useState } from 'react';
import {
  Button,
  Input,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Layout from '../components/Layout';

import { createHandleChange } from '../utils/createHandleChange';

export default function Login() {
  const [ passShow, setPassShow ] = useState(false);

  const [ fields, setFields ] = useState({
    username : '',
    password : ''
  });

  const handleChange = createHandleChange(setFields);

  function handleSubmit() {
    console.log(fields);
  }

  return (
    <Layout>
      <VStack w='400px' maxW='100%' mx='auto' spacing={4}>
        <VStack w='100%' spacing={1}>
          <Text alignSelf='flex-start'>Username</Text>
          <Input
            name='username'
            placeholder='username'
            value={fields.username}
            onChange={handleChange}
          />
        </VStack>
        <VStack w='100%' spacing={1}>
          <Text alignSelf='flex-start'>Password</Text>
          <InputGroup size='md'>
            <Input
              name='password'
              type={passShow ? 'text' : 'password'}
              placeholder='password'
              value={fields.password}
              onChange={handleChange}
            />
            <InputRightElement width='4.5rem'>
              <IconButton
                aria-label={passShow ? 'Hide' : 'Show'}
                icon={passShow ? <MdVisibility /> : <MdVisibilityOff />}
                onClick={() => setPassShow(!passShow)}
                colorScheme='black'
                color='black'
              />
            </InputRightElement>
          </InputGroup>
        </VStack>
        <Button colorScheme='green' alignSelf='flex-end' onClick={handleSubmit}>
          Log In
        </Button>
      </VStack>
    </Layout>
  );
}
