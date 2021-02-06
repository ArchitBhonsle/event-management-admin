import { Input, IconButton, Grid, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { MdSearch } from 'react-icons/md';
import useSWR from 'swr';
import Error from '../components/Error';
import PaymentCard from '../components/PaymentCard';
import PageControls from '../components/PageControls';
import createGetUri from '../utils/createGetUri';
import { createHandleChange } from '../utils/createHandleChange';
import Loading from '../components/Loading';

function paymentsParams(page, adminUsername, userRollNo) {
  const params = [['page', page]];
  if (adminUsername) params.push(['admin', adminUsername]);
  if (userRollNo) params.push(['user', userRollNo]);
  return params;
}

export default function Payments() {
  const [page, setPage] = useState(1);
  const [fields, setFields] = useState({
    adminUsername: null,
    userRollNo: null,
  });
  const [searchFields, setSearchFields] = useState({
    adminUsername: '',
    userRollNo: '',
  });
  const handleChange = createHandleChange(setFields);

  const { data, error } = useSWR(
    createGetUri(
      'payments',
      paymentsParams(page, searchFields.adminUsername, searchFields.userRollNo)
    )
  );

  let paymentsList = null;
  if (error) {
    paymentsList = <Error />;
  } else if (!data) {
    paymentsList = <Loading />;
  } else {
    paymentsList = (
      <>
        <Grid
          w='100%'
          gap={4}
          gridTemplateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          {data.data.payments.map(payment => (
            <PaymentCard payment={payment} />
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

  function searchPayments() {
    setSearchFields(fields);
  }

  return (
    <VStack spacing={6} w='100%'>
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr auto' }}
        gap={2}
        w='100%'
      >
        <Input
          name='userRollNo'
          size='lg'
          placeholder='User Roll No'
          value={fields.userRollNo}
          onChange={handleChange}
        />
        <Input
          name='adminUsername'
          size='lg'
          placeholder='Admin Username'
          value={fields.adminUsername}
          onChange={handleChange}
        />
        <IconButton
          aria-label='search'
          size='lg'
          icon={<MdSearch fontSize='1.5rem' />}
          colorScheme='green'
          onClick={searchPayments}
        />
      </Grid>
      {paymentsList}
    </VStack>
  );
}
