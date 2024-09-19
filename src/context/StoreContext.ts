import { useState } from 'react';

// Define o tipo para o contexto
export interface StoreContextProps {
  Money: number;
  setMoney: (value: number) => void;
}


// Hook para usar o contexto em outros componentes
export const useStore = () => {
  const [Money, setMoney] = useState<number>(0);
  return {
    Money,
    setMoney
  }
};
