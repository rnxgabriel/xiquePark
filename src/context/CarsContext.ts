import { useState } from 'react';
import { VehicleT } from '@/types/Vehicle.Type';

// Define a interface para o contexto
export interface CarsContextProps {
  cars: VehicleT[];
  addCar: (car: VehicleT) => void;
  setCars: React.Dispatch<React.SetStateAction<VehicleT[]>>;
  removeCar: (indexToRemove: number) => void; // Nova função de remoção
}

// Hook para usar o contexto
export const useCars = () => {
  const [cars, setCars] = useState<VehicleT[]>([]);

  const addCar = (newCar: VehicleT) => {
    setCars(prevCars => [...prevCars, newCar]);
  };

  const removeCar = (index: number) => {
    setCars((prevCars) => prevCars.filter((_, i) => i !== index));
  };

  return {
    cars,
    addCar,
    setCars,
    removeCar
  }
};

