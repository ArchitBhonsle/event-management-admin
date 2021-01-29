import { Grid, Input, VStack, HStack, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';

import Layout from '../components/Layout';
import PageControls from '../components/PageControls';
import UserCard from '../components/UserCard';
import createGetUri from '../utils/createGetUri';

const users = [
  {
    rollNo: '100000',
    dept: 'COMPS',
    criteria: [true, true, true],
    moneyOwed: 200,
    isPaid: false,
    name: 'Abcd Efgh',
  },
  {
    rollNo: '200000',
    dept: 'ELEC',
    criteria: [false, false, true],
    moneyOwed: 200,
    isPaid: true,
    name: 'Abcd Efgh',
  },
  {
    rollNo: '300000',
    dept: 'EXTC',
    criteria: [true, true, true],
    moneyOwed: 200,
    isPaid: false,
    name: 'Abcd Efgh',
  },
  {
    rollNo: '400000',
    dept: 'MECH',
    criteria: [false, false, true],
    moneyOwed: 200,
    isPaid: true,
    name: 'Abcd Efgh',
  },
  {
    rollNo: '500000',
    dept: 'IT',
    criteria: [false, false, true],
    moneyOwed: 200,
    isPaid: false,
    name: 'Abcd Efgh',
  },
];

function fetchUsers(searchText = '', page = 1) {
  const params = [['page', page]];
  if (searchText) params.push(['search', searchText]);
  const uri = createGetUri('users', params);
  console.log('getUsers uri: ', uri);
}

export default function Users() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => fetchUsers(), []);

  function changePage(newPage) {
    setPage(newPage);
    fetchUsers(searchText, newPage);
  }

  return (
    <Layout>
      <VStack spacing={4}>
        <HStack w="100%">
          <Input
            type="text"
            placeholder="Roll Number or Email"
            size="lg"
            colorScheme="green"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') fetchUsers(searchText, page);
            }}
          />
          <Button
            colorScheme="green"
            size="lg"
            rightIcon={<MdSearch fontSize="1.5rem" />}
            onClick={() => fetchUsers(searchText, page)}
          >
            Search
          </Button>
        </HStack>
        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={4}
          w="100%"
        >
          {users.map(opts => (
            <UserCard key={opts.rollNo} {...opts} />
          ))}
        </Grid>
        <PageControls page={page} changePage={changePage} max={30} />
      </VStack>
    </Layout>
  );
}
