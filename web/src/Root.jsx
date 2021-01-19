import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import fetcher from './utils/fetcher';

import App from './App';

export default function Root() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          <App />
        </SWRConfig>
      </ChakraProvider>
    </BrowserRouter>
  );
}
