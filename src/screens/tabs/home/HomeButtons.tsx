import React from 'react'
import { Card } from '@/components/cards/card';
import Icon from '@/utils/Icon';
import SubTitleText from '@/utils/textSubtitle';
import TextTitle from '@/utils/textTitle';
import { router } from 'expo-router';

export default function HomeButtons() {
  return (
    <>
      <Card.Root onPress={() => { router.setParams({ active: 'active' }); router.push('/(tabs)/mycars') }}>
        <Icon name="car" background />
        <Card.Content>
          <TextTitle>
            Adicionar um veículo
          </TextTitle>
          <SubTitleText>
            Clique para cadastrar um carro
          </SubTitleText>
        </Card.Content>
      </Card.Root>

      <Card.Root onPress={() => { router.push('/warning') }}>
        <Icon name="alert-box" background />
        <Card.Content>
          <TextTitle>
            Avisos
          </TextTitle>
          <SubTitleText>
            Clique para ver seus avisos
          </SubTitleText>
        </Card.Content>
      </Card.Root>

      <Card.Root onPress={() => { router.push('/help') }}>
        <Icon name="progress-question" background />
        <Card.Content>
          <TextTitle>
            Dúvidas ?
          </TextTitle>
          <SubTitleText>
            Clique para solicitar ajuda
          </SubTitleText>
        </Card.Content>
      </Card.Root>
    </>
  )
}