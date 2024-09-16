import { useState } from 'react';
import { Alert } from 'react-native';
import { useCars } from '@/context/CarsContext';
import { validateSign } from '@/utils/validateSign';
import { Login } from '@/services/api/Login';
import Consulta from '@/services/api/Consulta';
import { useActiveCar } from '@/context/ActiveCarContext';
import { router } from 'expo-router';

export const useCarManager = () => {
  const { addActiveCar, activeCar } = useActiveCar();
  const [addCarModal, setAddCarModal] = useState<boolean>(false);
  const [activeCarModal, setActiveCarModal] = useState<boolean>(false);
  const [typeCarModal, setTypeCarModal] = useState<boolean>(false);
  const [removeCarModal, setRemoveModal] = useState<boolean>(false);
  const [indexCar, setIndexCar] = useState<number>(0);
  const [carSign, setCarSign] = useState<string>('');

  const { addCar, cars, removeCar } = useCars();

  const handleConfirmAddCar = async (sign: string) => {

    if (cars.findIndex((car) => car.placa === sign) !== -1) {
      Alert.alert('Erro', 'Esta Placa ja está cadastrada');
      return;
    }

    if (validateSign(sign)) {
      const token = Login();
      const vehicleInfo = await Consulta(sign, token);
      if (vehicleInfo) {
        setAddCarModal(false);
        addCar(vehicleInfo);
      }
      else {
        Alert.alert('Erro', 'Erro de conexão, não foi possível consultar o veículo');
      }
    } else {
      setAddCarModal(false);
      Alert.alert('Erro', 'Placa inválida!');
    }
  };

  const handleOpenActiveCarModal = (index: number) => {
    setActiveCarModal(true);
    setIndexCar(index);
  };

  const handleOpenRemoveCarModal = (index: number) => {
    setRemoveModal(true);
    setIndexCar(index);
  };

  const handleConfirmRemoveCar = () => {
    Alert.alert(
      'Remover carro',
      'Tem certeza que deseja remover este veículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            setRemoveModal(false);
          }
        },
        {
          text: 'Remover',
          onPress: () => {
            addActiveCar(null); removeCar(indexCar); setRemoveModal(false);
          },
        },
      ]
    )
  };

  const handleSelectActiveCar = () => {
    const carType = cars[indexCar].tipoVeiculo;
    if (carType == 'Automovel' || carType == 'Nao Identificado') {
      setActiveCarModal(false);
      setTypeCarModal(true);
    } else if (carType == 'Camioneta') {
      cars[indexCar].tipoVeiculo = 'Suv';
    } else {
      const car = cars[indexCar];
      addActiveCar(car);
      setActiveCarModal(false);
      router.navigate('/(tabs)/');
    }

  };
  const handleTypeCarConfirm = (value: string) => {
    cars[indexCar].tipoVeiculo = value;
    setTypeCarModal(false);
  }

  return {
    addCarModal,
    typeCarModal,
    activeCarModal,
    removeCarModal,
    carSign,
    indexCar,
    cars,
    setCarSign,
    setAddCarModal,
    setActiveCarModal,
    setRemoveModal,
    setTypeCarModal,
    handleConfirmAddCar,
    handleOpenActiveCarModal,
    handleOpenRemoveCarModal,
    handleConfirmRemoveCar,
    handleSelectActiveCar,
    handleTypeCarConfirm,
    activeCar,
  };
};
