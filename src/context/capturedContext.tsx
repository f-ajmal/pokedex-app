import { createContext, useState, ReactNode } from 'react';
import { ICapturedContext } from "../utils/interface";

const CapturedContext = createContext<ICapturedContext>({
    capturedList: [],
    capturePokemon: () => {},
    releasePokemon: () => {}
});

const CapturedProvider = ({ children }: { children: ReactNode }) => {
  const [capturedList, setCapturedList] = useState<string[]>([]);

  const capturePokemon = (pokemon: string) => {
    if (capturedList.length < 6 && !!pokemon) {
      setCapturedList((list) => [...list, pokemon]);
    } else if (capturedList.length === 6) {
      alert('Maximum number of Pokémon captured.');
    }
  };

  const releasePokemon = (pokemon: string) => {
    setCapturedList((list) => list.filter((p) => p !== pokemon));
  };

  return (
    <CapturedContext.Provider value={{ capturedList, capturePokemon, releasePokemon }}>
      {children}
    </CapturedContext.Provider>
  );
};

export { CapturedProvider, CapturedContext };