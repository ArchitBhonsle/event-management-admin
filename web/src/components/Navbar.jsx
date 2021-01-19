import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Flex, Heading, Stack, Box } from '@chakra-ui/react';
import { MdClose, MdMenu } from 'react-icons/md';

function NavButton({ children, link, func }) {
  const history = useHistory();
  const { pathname } = useLocation();
  const active = link && pathname.includes(link);

  return (
    <Button
      colorScheme={`${active ? 'green' : 'black'}`}
      variant='link'
      fontSize='lg'
      p={3}
      bg={`${active && 'white'}`}
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
  const [ isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Flex
      as='nav'
      w='100%'
      wrap='wrap'
      alignItems='center'
      justifyContent='space-between'
      py={6}
      px={{ base: 8, md: '10%', lg: '15%' }}
      backgroundColor='green.400'
      color='white'
    >
      <Heading fontSize='4xl'>η</Heading>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
        {isOpen ? <MdClose size={'2rem'} /> : <MdMenu size={'2rem'} />}
      </Box>
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
        pt={{ base: 4, md: 0 }}
      >
        <Stack
          spacing={2}
          direction={{ base: 'column', md: 'row' }}
          justify={[ 'center', 'space-between', 'flex-end', 'flex-end' ]}
        >
          <NavButton link='/dashboard'>dashboard</NavButton>
          <NavButton link='/users'>users</NavButton>
          <NavButton link='/events'>events</NavButton>
          <NavButton func={() => console.log('log out')}>log out</NavButton>
        </Stack>
      </Box>
    </Flex>
  );
}
