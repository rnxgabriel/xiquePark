import React, { createContext, useContext, useMemo, useState } from 'react';

// Define o tipo para o contexto
export interface StoreContextProps {
  Money: number;
  setMoney: (value: number) => void;
}

// Cria o contexto com valor inicial padrão
const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// Provider para o contexto
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Money, setMoney] = useState<number>(0);

  const contextValue = useMemo(() => ({ Money, setMoney }), [Money]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook para usar o contexto em outros componentes
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('use must be used within a Provider');
  }
  return context;
};
