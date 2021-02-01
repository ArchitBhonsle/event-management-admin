import {
  Grid,
  Input,
  VStack,
  HStack,
  Button,
  useBreakpointValue,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import useSWR from 'swr';

import Layout from '../components/Layout';
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
  const [maxPage, setMaxPage] = useState(1);
  const bigSearch = useBreakpointValue({ base: false, md: true });

  const { data, error } = useSWR(getFetchUri(search, page));

  let usersList = null;
  if (error) {
    usersList = <Center>Something went wrong</Center>;
  } else if (!data) {
    usersList = <Center>Loading...</Center>;
  } else {
    usersList = data.data.users.map(user => (
      <UserCard key={user.rollNo} user={user} />
    ));
  }

  useEffect(() => {
    if (data?.data?.maxPage) {
      setMaxPage(data?.data?.maxPage);
    }
  }, [data]);

  function setNewSearch(newSearchText) {
    setSearch(newSearchText);
    setPage(1);
  }

  return (
    <Layout>
      <VStack spacing={6}>
        <HStack w='100%'>
          <Input
            type='text'
            placeholder='Roll Number or Email'
            size='lg'
            colorScheme='green'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={async e => {
              if (e.key === 'Enter') setNewSearch(searchText);
            }}
          />
          {bigSearch ? (
            <Button
              colorScheme='green'
              size='lg'
              rightIcon={<MdSearch fontSize='1.5rem' />}
              onClick={() => setNewSearch(searchText)}
            >
              Search
            </Button>
          ) : (
            <IconButton
              colorScheme='green'
              size='lg'
              icon={<MdSearch fontSize='1.5rem' />}
              onClick={() => setNewSearch(searchText)}
            ></IconButton>
          )}
        </HStack>
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          gap={4}
          w='100%'
        >
          {usersList}
        </Grid>
        <PageControls
          page={page}
          changePage={newPage => setPage(newPage)}
          maxPage={maxPage}
        />
      </VStack>
    </Layout>
  );
}
