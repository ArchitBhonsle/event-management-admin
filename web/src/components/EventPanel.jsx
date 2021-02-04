import { Grid } from '@chakra-ui/react';
import EventCard from './EventCard';

export default function EventPanel({ day }) {
  return (
    <Grid
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        xl: 'repeat(3, 1fr)',
      }}
      gap={4}
      w='100%'
    >
      {[...Array(30)].map((_, ind) => (
        <EventCard key={ind} />
      ))}
    </Grid>
  );
}
