import { Center, Grid, Spinner, Flex } from '@chakra-ui/react';
import useSWR from 'swr';
import Error from './Error';
import EventCard from './EventCard';
import Loading from './Loading';

export default function EventPanel({ day }) {
  const { data, error } = useSWR(`events/${day}`);

  let eventList = null;
  if (error) {
    eventList = <Error />;
  } else if (!data) {
    eventList = <Loading />;
  } else {
    eventList = (
      <Grid
        gridTemplateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gap={4}
        w='100%'
      >
        {data.data.map((event, ind) => (
          <EventCard key={ind} event={event} />
        ))}
      </Grid>
    );
  }

  return eventList;
}
