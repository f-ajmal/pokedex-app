import React, { createContext, useState, ReactNode } from 'react';

interface CapturedContextType {
    capturedList: string[];
    capturePokemon: (pokemon: string) => void;
    releasePokemon: (pokemon: string) => void;
};

const CapturedContext = createContext<CapturedContextType>({
    capturedList: [],
    capturePokemon: () => {},
    releasePokemon: () => {}
});

const CapturedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [capturedList, setCapturedList] = useState<string[]>([]);

  const capturePokemon = (pokemon: string) => {
    setCapturedList((list) => [...list, pokemon]);
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