import { useState } from 'react';
import { Alert } from 'react-native';
import { validateSign } from '@/utils/validateSign';
import { Login } from '@/services/api/Login';
import Consulta from '@/services/api/Consulta';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

export const useCarManager = () => {

  const {
    user,
    addCarToUser,
    updateActiveCar,
    removeCarFromUser,
    addCar,
    removeCar,
    updateHistory,
    addValueToHistory
  } = useAppContext();

  const [addCarModal, setAddCarModal] = useState<boolean>(false);
  const [activeCarModal, setActiveCarModal] = useState<boolean>(false);
  const [typeCarModal, setTypeCarModal] = useState<boolean>(false);
  const [removeCarModal, setRemoveModal] = useState<boolean>(false);
  const [indexCar, setIndexCar] = useState<number>(0);
  const [carSign, setCarSign] = useState<string>('');

  const handleConfirmAddCar = async (sign: string) => {
    const cars = user?.carros || [];
    // Verifica se o carro já está cadastrado
    if (cars.some((car) => car.placa === sign)) {
      Alert.alert('Erro', 'Esta placa já está cadastrada.');
      return;
    }

    if (validateSign(sign)) {
      try {
        const token = Login();
        const vehicleInfo = await Consulta(sign, token);
        if (vehicleInfo) {
          setAddCarModal(false);
          addCar(vehicleInfo);
          if (user) {
            addCarToUser(user, vehicleInfo);
            addValueToHistory(`Adicionado o veículo ${vehicleInfo.placa.toString()}`);
          }
        } else {
          Alert.alert('Erro', 'Erro de conexão, não foi possível consultar o veículo.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao adicionar o carro.');
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
          onPress: () => setRemoveModal(false),
        },
        {
          text: 'Remover',
          onPress: () => {
            if (user && user.carros) {
              const carToRemove = user.carros[indexCar];

              if (user.carro_ativo == carToRemove) {
                updateActiveCar(user, null); // Atualiza o carro ativo para nulo
              }

              // Remove o carro do usuário
              removeCarFromUser(user, carToRemove);

              // Verifica se o carro removido é o carro ativo

              // Remove o carro da lista local
              removeCar(indexCar);
              addValueToHistory('Veículo removido: ' + carToRemove.placa.toString());

              // Fecha o modal
              setRemoveModal(false);
            } else {
              Alert.alert('Erro', 'Nenhum usuário ativo encontrado.');
            }
          },
        },
      ]
    );
  };

  const handleSelectActiveCar = () => {
    if (user && user.carros) {
      const selectedCar = user.carros[indexCar];
      const carType = selectedCar.tipoVeiculo;

      if (carType === 'Automovel' || carType === 'Nao Identificado') {
        setActiveCarModal(false);
        setTypeCarModal(true);
      } else if (carType === 'Camioneta') {
        selectedCar.tipoVeiculo = 'Suv';
        if (user) {
          updateActiveCar(user, selectedCar);
          addValueToHistory('Veículo Ativo: ' + selectedCar.placa.toString());
        }
        setActiveCarModal(false);
        router.navigate('/(tabs)/home');
      } else {
        if (user) {
          updateActiveCar(user, selectedCar);
          addValueToHistory('Veículo Ativo: ' + selectedCar.placa.toString());
        }
        setActiveCarModal(false);
        router.navigate('/(tabs)/home');
      }
    }
  };

  const handleTypeCarConfirm = (value: string) => {
    if (user && user.carros) {
      const selectedCar = user.carros[indexCar];
      selectedCar.tipoVeiculo = value;
      setTypeCarModal(false);
    }
  };

  return {
    addCarModal,
    typeCarModal,
    activeCarModal,
    removeCarModal,
    carSign,
    indexCar,
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
  };
};
