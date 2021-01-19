import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Navbar />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
