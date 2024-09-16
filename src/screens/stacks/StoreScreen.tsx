import { Platform } from 'react-native';
import React from 'react';

import TextTitle from '@/utils/textTitle';
import Icon from '@/utils/Icon';
import { useStoreManager } from '@/hooks/useStoreManager';

import ScrollBox from '@/components/scrollBox/scrollBox';
import { ListItem } from '@/components/listItem';
import ListContainer from '@/components/listItem/ListContainer';
import { CardBox } from '@/components/cards/cardBox';
import { Modal } from '@/components/modal';

export default function StoreScreen() {
  const { handleConfirm, modalVisible, setModalVisible, setInputValue, Money } = useStoreManager()

  return (
    <>
      <ScrollBox>
        <CardBox.Root>
          <CardBox.Container color="transparent" disabled>
            <TextTitle size={32}>R$ {Money.toFixed(2) || '0,00'}</TextTitle>
          </CardBox.Container>
        </CardBox.Root>

        <Modal.Root onClose={() => setModalVisible(false)} visible={modalVisible}>
          <Modal.Title>Digite o valor</Modal.Title>
          <Modal.Input isCurrency placeholder='R$ 0,00' keyboard="decimal-pad" onChangeText={(value) => setInputValue(value)} />
          <Modal.Buttons
            onClose={() => setModalVisible(false)}
            onConfirm={handleConfirm}
          />
        </Modal.Root>

        {Platform.OS === 'ios' ? (
          <ListItem.Root onPress={() => setModalVisible(true)}>
            <ListItem.Container>
              <Icon name="apple" />
              <TextTitle>Pay</TextTitle>
            </ListItem.Container>
            <ListContainer>
              <Icon name="chevron-right" />
            </ListContainer>
          </ListItem.Root>
        ) : (
          <ListItem.Root onPress={() => setModalVisible(true)}>
            <ListItem.Container>
              <Icon name="google-play" />
              <TextTitle>Pay</TextTitle>
            </ListItem.Container>
            <ListContainer>
              <Icon name="chevron-right" />
            </ListContainer>
          </ListItem.Root>
        )}
        {/* 
        <ListItem.Root onPress={() => setModalVisible(true)}>
          <ListItem.Container>
            <Icon name="clock-outline" />
            <TextTitle>Horas</TextTitle>
          </ListItem.Container>
          <ListContainer>
            <Icon name="chevron-right" />
          </ListContainer>
        </ListItem.Root> */}

        <ListItem.Root onPress={() => setModalVisible(true)}>
          <ListItem.Container>
            <Icon name="credit-card-chip" />
            <TextTitle>Débito</TextTitle>
          </ListItem.Container>
          <ListContainer>
            <Icon name="chevron-right" />
          </ListContainer>
        </ListItem.Root>

        <ListItem.Root onPress={() => setModalVisible(true)}>
          <ListItem.Container>
            <Icon name="credit-card-chip" />
            <TextTitle>Crédito</TextTitle>
          </ListItem.Container>
          <ListContainer>
            <Icon name="chevron-right" />
          </ListContainer>
        </ListItem.Root>

        <ListItem.Root onPress={() => setModalVisible(true)}>
          <ListItem.Container>
            <Icon name="pix" icon="MaterialIcons" />
            <TextTitle>Pix</TextTitle>
          </ListItem.Container>
          <ListContainer>
            <Icon name="chevron-right" />
          </ListContainer>
        </ListItem.Root>
      </ScrollBox>
    </>
  );
}
