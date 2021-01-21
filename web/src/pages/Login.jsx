import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import Layout from '../components/Layout';

import { createHandleChange } from '../utils/createHandleChange';
import easyFetch from '../utils/easyFetch';

export default function Login() {
  const [ passShow, setPassShow ] = useState(false);

  const [ fields, setFields ] = useState({
    username : '',
    password : ''
  });
  const [ errors, setErrors ] = useState({
    username : null,
    password : null
  });

  const handleChange = createHandleChange(setFields, setErrors);

  const history = useHistory();

  const handleSubmit = async () => {
    const response = await easyFetch('login', fields);
    const { data, error } = response;
    if (error) {
      error.map(({ field, message }) =>
        setErrors({ ...errors, [field]: message })
      );
    } else {
      console.log(data);
      history.push('/dashboard');
    }
  };

  return (
    <Layout>
      <VStack w='400px' maxW='100%' mx='auto' spacing={4}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor='username'>username</FormLabel>
          <Input
            id='username'
            name='username'
            placeholder='username'
            value={fields.username}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor='password'>password</FormLabel>
          <InputGroup size='md'>
            <Input
              id='password'
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
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Button colorScheme='green' alignSelf='flex-end' onClick={handleSubmit}>
          Log In
        </Button>
      </VStack>
    </Layout>
  );
}
