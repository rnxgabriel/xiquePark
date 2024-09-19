import { Image } from 'react-native'
import { Card } from '@/components/cards/card'
import { colors } from '@/constants/colors'
import SubTitleText from '@/utils/textSubtitle'
import TextTitle from '@/utils/textTitle'
import React from 'react'
import { useAppContext } from '@/context/AppContext'

export default function HomeActiveCar() {
  const { user } = useAppContext()

  return (
    <>
      <Card.Root color={colors.second}
        onPress={() => console.log(user)}
        onLongPress={() => console.log(user?.carros)}
      >
        <Card.Content>
          <TextTitle>
            {user?.carro_ativo?.modelo ? user?.carro_ativo?.modelo : "Nenhum carro selecionado"}
          </TextTitle>
          <SubTitleText style={{ marginTop: 12 }}>
            {user?.carro_ativo?.placa ? "Placa: " + user?.carro_ativo?.placa : 'Selecione um veículo'}
          </SubTitleText>
        </Card.Content>
        <Image key={user?.carro_ativo?.logo} style={{ marginRight: 16 }}
          source={{ uri: user?.carro_ativo?.logo }}
          width={72} height={72}
        />
      </Card.Root>
    </>
  )
}