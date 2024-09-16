import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import ScrollBox from '@/components/scrollBox/scrollBox';
import CarDetails from './carDetails';
import { Card } from '@/components/cards/card';
import { Modal } from '@/components/modal';

import TextTitle from '@/utils/textTitle';
import Icon from '@/utils/Icon';
import SubTitleText from '@/utils/textSubtitle';
import { colors } from '@/constants/colors';
import { useCarManager } from '@/hooks/useCarManager';
import Dropdown from '@/components/dropdown';
import { carTypes } from '@/constants/carTypes';




export default function CarsScreen() {

  const {
    addCarModal,
    activeCarModal,
    removeCarModal,
    typeCarModal,
    carSign,
    indexCar,
    cars,
    setCarSign,
    setAddCarModal,
    setActiveCarModal,
    setRemoveModal,
    handleConfirmAddCar,
    handleOpenActiveCarModal,
    handleOpenRemoveCarModal,
    handleConfirmRemoveCar,
    handleSelectActiveCar,
    handleTypeCarConfirm,
    activeCar
  } = useCarManager();

  return (
    <>
      {/* Carro Activo */}
      {activeCarModal && (
        <Modal.Root visible={activeCarModal} onClose={() => setActiveCarModal(false)}>
          <Modal.Title>Informações do carro: </Modal.Title>
          <CarDetails car={cars[indexCar]} index={indexCar} />
          <Modal.Buttons
            onClose={() => setActiveCarModal(false)}
            confirmTitle='Selecionar'
            onConfirm={handleSelectActiveCar} />
        </Modal.Root>
      )}


      {/* Car Type */}
      {typeCarModal && (
        <Modal.Root visible={typeCarModal}>
          <View>
            <SubTitleText>AVISO: Não será possivel alterar depois</SubTitleText>
            <Modal.Title>Selecione o tipo de veículo</Modal.Title>
            <Dropdown data={carTypes} placeholder='Tipo do veículo ex: Sedan'
              onChange={(value) => handleTypeCarConfirm(value.value)}
            />
          </View>
        </Modal.Root>
      )}

      {/* Remove Car */}
      <Modal.Root onClose={() => setRemoveModal(false)} visible={removeCarModal}>
        <Modal.Title>Deseja Remover este carro ?</Modal.Title>
        <Modal.Buttons
          onClose={() => setRemoveModal(false)}
          onConfirm={handleConfirmRemoveCar}
        />
      </Modal.Root>

      {/* Add Car Modal */}
      <Modal.Root visible={addCarModal} onClose={() => setAddCarModal(false)}>
        <Modal.Title>Insira a placa do carro</Modal.Title>
        <Modal.Input onChangeText={setCarSign} autoCapitalize='characters' />
        <Modal.Buttons
          onClose={() => setAddCarModal(false)}
          onConfirm={() => handleConfirmAddCar(carSign)} />
      </Modal.Root>

      <ScrollBox>
        {/* Lista de Carros */}
        {cars.map((car, index) => (
          <Card.Root
            key={index}
            height={'10%'}
            onPress={() => handleOpenActiveCarModal(index)}
            onLongPress={() => handleOpenRemoveCarModal(index)}
          >
            <Image style={style.image} source={{ uri: car.logo }} />
            <Card.Content>
              <SubTitleText size={16}>{car.modelo}</SubTitleText>
              <SubTitleText size={14}>{car.placa}</SubTitleText>
            </Card.Content>
            {activeCar?.placa === car.placa && <Icon name="check-bold" color={colors.secondGreen} />}
          </Card.Root>
        ))}

        {/* Adicionar Carro */}
        <Card.Root color={colors.platinum} height={'6%'} onPress={() => setAddCarModal(true)}>
          <Card.Content>
            <TextTitle color="white">Adicionar Carro</TextTitle>
          </Card.Content>
          <Icon name="plus" color="white" />
        </Card.Root>
      </ScrollBox>
    </>
  );
}

const style = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginLeft: 16,
  },
});
