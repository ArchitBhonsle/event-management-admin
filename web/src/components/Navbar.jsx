import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading, HStack } from '@chakra-ui/react';

function NavButton({ children, link, func }) {
  const history = useHistory();

  return (
    <Button
      colorScheme='black'
      variant='link'
      fontSize='lg'
      onClick={async () => {
        if (func) await func();
        if (link) history.push(link);
      }}
    >
      {children}
    </Button>
  );
}

export default function Navbar() {
  return (
    <Flex
      as='nav'
      w='100%'
      alignItems='center'
      justifyContent='space-between'
      py={6}
      px='15%'
      backgroundColor='green.400'
      color='white'
    >
      <Heading fontSize='3xl'>η admin</Heading>

      <HStack spacing={8}>
        <NavButton link='/dashboard'>dashboard</NavButton>
        <NavButton link='/users'>users</NavButton>
        <NavButton link='/events'>events</NavButton>
        <NavButton func={() => console.log('log out')}>log out</NavButton>
      </HStack>
    </Flex>
  );
}
