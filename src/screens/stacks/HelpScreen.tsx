import React from 'react'
import { Stack } from 'expo-router'
import { stackScreenOptions } from '@/constants/stackScreenOptions'
import ScrollBox from '@/components/scrollBox/scrollBox'
import TextTitle from '@/utils/textTitle'
import SubTitleText from '@/utils/textSubtitle'
import { View, StyleSheet } from 'react-native'
import HelpInfo from '@/components/helpInfo'
import { colors } from '@/constants/colors'

export default function HelpScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Dúvidas' }} />
      <ScrollBox>

        <View style={style.container}>
          <TextTitle>Como cadastro meu carro ? </TextTitle>
          <SubTitleText>
            Basta selecionar a opção adicionar carro, digitar a placa do veículo para cadastra-lo e seleciona-lo na aba carros
          </SubTitleText>
        </View>

        <View style={style.container}>
          <TextTitle>Como funciona a precificação ?</TextTitle>
          <SubTitleText>Todos os carros possuem um preço base próprio</SubTitleText>

          <HelpInfo main mainTitle='Carros:' secondText='Preços' />

          <HelpInfo mainTitle='Sub-compacto:' secondText='R$ 2,00' />
          <HelpInfo mainTitle='Compacto:' secondText='R$ 3,00' />
          <HelpInfo mainTitle='Hatch, Suv ou Sedan:' secondText='R$ 5,00' />
          <HelpInfo mainTitle='Caminhonete:' secondText='R$ 7,00' />
          <HelpInfo mainTitle='Motocicleta:' secondText='R$ 2,00' />
          <HelpInfo mainTitle='Outros:' secondText='R$ 5,00' />

          <View style={{ marginTop: 12 }}>
            <SubTitleText>
              Carros elétricos possuem 50% de desconto no valor base. É cobrado igualmente uma taxa de R$ 2,00 por hora.
            </SubTitleText>
          </View>
        </View>

        <View style={style.container}>
          <TextTitle>Como adiciono saldo ?</TextTitle>
          <SubTitleText>
            Selecione a opção saldo, você será redirecionado a uma tela de loja onde você podera adicionar o valor que deseja.
          </SubTitleText>
        </View>

        <View style={style.container}>
          <TextTitle>Para que servem os avisos ? </TextTitle>
          <SubTitleText>
            Caso você receba uma multa ou seu tempo seja expirado você receberá uma notificação e um aviso.
          </SubTitleText>
        </View>

      </ScrollBox>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '90%',
    backgroundColor: colors.platinum,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000', // Opção para sombra
    shadowOffset: { width: 0, height: 2 }, // Sombra leve
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    elevation: 5, // Sombra no Android
  }
})