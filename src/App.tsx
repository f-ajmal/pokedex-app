import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CapturedProvider } from "./context/capturedContext";
import SearchContainer from "./views/SearchContainer/SearchContainer";
import CapturedContainer from "./views/CapturedContainer/CapturedContainer";
import './App.css';

const queryClient = new QueryClient();

function AppContent() {
  return (
    <div className="app">
      <SearchContainer />
      <CapturedContainer />
    </div>
  );
}

function App() {
  return (
    <CapturedProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </ChakraProvider>
    </CapturedProvider>
  )
}

export default App;
