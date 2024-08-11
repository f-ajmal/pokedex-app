import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { CapturedProvider } from "./context/capturedContext";
import queryClient from "./utils/queryClient";
import SearchContainer from "./views/SearchContainer/SearchContainer";
import CapturedContainer from "./views/CapturedContainer/CapturedContainer";
import './App.css';



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
