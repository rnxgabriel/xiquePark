import { VehicleT } from '@/types/Vehicle.Type';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Define a interface para o contexto
export interface ActiveCarContextProps {
  activeCar: VehicleT | null;
  addActiveCar: (car: VehicleT | null) => void;
}

// Cria o contexto
const ActiveCarContext = createContext<ActiveCarContextProps | undefined>(undefined);

// Hook para usar o contexto
export const useActiveCar = () => {
  const context = useContext(ActiveCarContext);
  if (!context) {
    throw new Error('useActiveCar deve ser usado dentro de um ActiveCarProvider');
  }
  return context;
};

export const ActiveCarProvider = ({ children }: { children: ReactNode }) => {
  const [activeCar, setActiveCar] = useState<VehicleT | null>(null);

  const addActiveCar = (car: VehicleT | null) => {
    if (car == null) {
      setActiveCar(null)
    } else if (car) {
      setActiveCar(car);
    }
  }

  // UseMemo para evitar a recriação do valor do contexto em cada renderização
  const contextValue = useMemo(() => ({
    activeCar,
    addActiveCar
  }), [activeCar]); // Recalcula apenas quando o estado de activeCar mudar

  return (
    <ActiveCarContext.Provider value={contextValue}>
      {children}
    </ActiveCarContext.Provider>
  )
}
