import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { VehicleT } from '@/types/Vehicle.Type';

// Define a interface para o contexto
export interface CarsContextProps {
  cars: VehicleT[];
  addCar: (car: VehicleT) => void;
  setCars: React.Dispatch<React.SetStateAction<VehicleT[]>>;
  removeCar: (indexToRemove: number) => void; // Nova função de remoção
}

// Cria o contexto
const CarsContext = createContext<CarsContextProps | undefined>(undefined);

// Hook para usar o contexto
export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars deve ser usado dentro de um CarsProvider');
  }
  return context;
};

export const CarsProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<VehicleT[]>([]);

  // Função para adicionar um valor à lista de carros
  const addCar = (newCar: VehicleT) => {
    setCars(prevCars => [...prevCars, newCar]);
  };

  // Função para remover um carro da lista
  const removeCar = (indexToRemove: number) => {
    setCars(prevCars => prevCars.filter((_, index) => index !== indexToRemove) );
  };

  const contextValue = useMemo(() => ({ cars, addCar, setCars, removeCar }), [cars]);

  return (
    <CarsContext.Provider value={contextValue}>
      {children}
    </CarsContext.Provider>
  );
};
