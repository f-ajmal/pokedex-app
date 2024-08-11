import { ChakraProvider, Text } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { CapturedProvider } from "./context/capturedContext";
import queryClient from "./utils/queryClient";
import SearchContainer from "./views/SearchContainer/SearchContainer";
import CapturedContainer from "./views/CapturedContainer/CapturedContainer";
import './App.css';



function AppContent() {
  return (
    <div className="app">
      <div className="pokedex">
        <SearchContainer />
        <CapturedContainer />
      </div>
      <Text className="footer" fontSize="8px" data-testid="footer">
        <a href="https://github.com/f-ajmal/pokedex-app" title="Github repo">Web application created by Fardeen Ajmal</a>
        <a href="https://pokeapi.co/" title="pokemon api">Pokémon API by PokéAPI</a>
        <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">Poké Ball favicon created by Nikita Golubev - Flaticon</a>
      </Text>
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
