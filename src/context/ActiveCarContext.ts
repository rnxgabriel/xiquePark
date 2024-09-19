import { VehicleT } from '@/types/Vehicle.Type';
import { useState } from 'react';

// Define a interface para o contexto
export interface ActiveCarContextProps {
  activeCar: VehicleT | null;
  addActiveCar: (car: VehicleT | null) => void;
}

// Hook para usar o contexto
export const useActiveCar = () => {
  const [activeCar, setActiveCar] = useState<VehicleT | null>(null);

  return {
    activeCar,
    addActiveCar: (car: VehicleT | null) => {
      if (car == null) {
        setActiveCar(null)
      } else if (car) {
        setActiveCar(car);
      }
    }
  }
};

