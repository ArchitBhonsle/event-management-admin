import {
  Grid,
  Input,
  VStack,
  HStack,
  IconButton,
  Center,
  Spinner,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import useSWR from 'swr';
import AddUserModal from '../components/AddUserModal';

import PageControls from '../components/PageControls';
import UserCard from '../components/UserCard';
import createGetUri from '../utils/createGetUri';

function getFetchUri(searchText, page) {
  const params = [['page', page]];
  if (searchText) params.push(['search', searchText]);
  return createGetUri('users', params);
}

export default function Users() {
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const searchRef = useRef();
  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();

  const { data, error } = useSWR(getFetchUri(search, page));

  let usersList = null;
  if (error) {
    usersList = (
      <Center>
        <Text>Something went wrong</Text>
      </Center>
    );
  } else if (!data) {
    usersList = (
      <Flex w='100%' justifyContent='center'>
        <Spinner size='lg' colorScheme='green' />
      </Flex>
    );
  } else {
    usersList = (
      <>
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap={4}
          w='100%'
        >
          {data.data.users.map(user => (
            <UserCard key={user.rollNo} user={user} />
          ))}
        </Grid>
        <PageControls
          page={page}
          changePage={newPage => setPage(newPage)}
          maxPage={data.data.maxPage}
        />
      </>
    );
  }

  function setNewSearch(newSearchText) {
    setSearch(newSearchText);
    setPage(1);
  }

  useEffect(() => searchRef.current?.focus(), []);

  return (
    <VStack spacing={6}>
      <HStack w='100%'>
        <Input
          ref={searchRef}
          type='text'
          placeholder='Roll Number'
          size='lg'
          colorScheme='green'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={async e => {
            if (e.key === 'Enter') setNewSearch(searchText);
          }}
        />
        <IconButton
          colorScheme='green'
          size='lg'
          icon={<MdSearch fontSize='1.5rem' />}
          onClick={() => setNewSearch(searchText)}
        />
        <IconButton
          colorScheme='green'
          variant='outline'
          size='lg'
          icon={<MdAdd fontSize='1.5rem' />}
          onClick={addOnOpen}
        />
        <AddUserModal
          isOpen={addIsOpen}
          onClose={addOnClose}
          finalFocusRef={searchRef}
        />
      </HStack>
      {usersList}
    </VStack>
  );
}
