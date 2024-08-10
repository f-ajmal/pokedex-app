import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CapturedProvider } from "./context/capturedContext";
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
        <AppContent />
      </ChakraProvider>
    </CapturedProvider>
  )
}

export default App;
