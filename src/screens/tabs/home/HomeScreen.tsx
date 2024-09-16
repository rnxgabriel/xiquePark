import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

import ScrollBox from '@/components/scrollBox/scrollBox';
import { CardBox } from '@/components/cards/cardBox';
import { Modal } from '@/components/modal';
import CircularProgress from '@/components/circle';
import ModalButtons from '@/components/modal/modalButtons';

import { useStore } from '@/context/StoreContext';
import { colors } from '@/constants/colors';
import Icon from '@/utils/Icon';
import TextTitle from '@/utils/textTitle';
import SubTitleText from '@/utils/textSubtitle';
import HomeButtons from './HomeButtons';
import { useHourManager } from '@/hooks/useHourManager';
import HomeActiveCar from './HomeActiveCar';

export default function HomeScreen() {
  const { Money } = useStore();
  const { hour, setHour, hourText, hourModal, setHourModal, activeTimer, handleAddHour, handleDurationChange } = useHourManager();

  return (
    <>
      {/* Modal  de Horas */}
      <Modal.Root visible={hourModal}>
        <Modal.Title>Digite a quantidade de Horas:</Modal.Title>
        <Picker
          selectedValue={hour}
          onValueChange={setHour}
          mode='dropdown'
        >
          <Picker.Item label="Selecione" value={0} />
          <Picker.Item label="2 Horas" value={2} />
          <Picker.Item label="4 Horas" value={4} />
          <Picker.Item label="6 Horas" value={6} />
          <Picker.Item label="8 Horas" value={8} />
        </Picker>
        <ModalButtons
          onConfirm={() => handleAddHour()}
          onClose={() => setHourModal(false)} />
      </Modal.Root>

      <ScrollBox>
        {/* Carro Selecionado */}
        <HomeActiveCar />

        {/* Tempo */}
        <CardBox.Root>
          <CardBox.Container color={colors.mainGreen} onPress={() => { setHourModal(true) }}>
            <TextTitle color='white' style={{ position: 'absolute' }}>
              {hour ? `${hourText}` : 'Tempo'}
            </TextTitle>
            <CircularProgress
              key={hour}
              size={140}
              strokeWidth={2.5}
              duration={activeTimer ? hour * 60 * 60 : 0} // Define a duração com base nas horas selecionadas
              color="#fff"
              backgroundColor={colors.mainGreen}
              onDurationChange={handleDurationChange}
            />
          </CardBox.Container>

          {/* Saldo */}
          <CardBox.Container color={colors.mainGreen} onPress={() => { router.push('/store') }}>
            <Icon name="wallet" color={colors.gold} />
            {Money < 0 ? <TextTitle color={'#FF4C4C'}>
              Saldo: R$ {Money.toFixed(2) || '0,00'}
            </TextTitle> :
              <TextTitle color={colors.gold}>
                Saldo: R$ {Money.toFixed(2) || '0,00'}
              </TextTitle>}
            <SubTitleText color={colors.gold}>
              clique para adicionar
            </SubTitleText>
          </CardBox.Container>
        </CardBox.Root>

        {/* Botoes */}
        <HomeButtons />
      </ScrollBox>
    </>
  );
}
