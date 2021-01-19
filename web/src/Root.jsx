import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

export default function Root() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  );
}
