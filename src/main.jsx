import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools} from '@tanstack/react-query-devtools'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools/>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
