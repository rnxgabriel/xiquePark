import { useEffect } from 'react';
import { useCars } from '@/context/CarsContext';
import Consulta from '@/services/api/Consulta'
import { Login } from '@/services/api/Login'

const useFetchVehicleData = (placa: string) => {
  const { addCar } = useCars();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await Login();
        const vehicleInfo = await Consulta(placa, Promise.resolve(token));

        if (vehicleInfo) {
          addCar(vehicleInfo);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do veículo:', error);
      }
    };

    fetchData();
  }, [placa, addCar]);
};

export default useFetchVehicleData;
