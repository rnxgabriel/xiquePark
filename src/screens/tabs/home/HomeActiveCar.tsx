import { Image } from 'react-native'
import { Card } from '@/components/cards/card'
import { colors } from '@/constants/colors'
import SubTitleText from '@/utils/textSubtitle'
import TextTitle from '@/utils/textTitle'
import React from 'react'
import { useActiveCar } from '@/context/ActiveCarContext'

export default function HomeActiveCar() {
  const { activeCar } = useActiveCar()
  return (
    <>
      <Card.Root color={colors.second}>
        <Card.Content>
          <TextTitle>
            {activeCar?.modelo ? activeCar?.modelo : "Nenhum carro selecionado"}
          </TextTitle>
          <SubTitleText style={{ marginTop: 12 }}>
            {activeCar?.placa ? "Placa: " + activeCar?.placa : 'Selecione um veículo'}
          </SubTitleText>
        </Card.Content>
        <Image key={activeCar?.logo} style={{ marginRight: 16 }}
          source={{ uri: activeCar?.logo }}
          width={72} height={72}
        />
      </Card.Root>
    </>
  )
}