import { StyleSheet, View } from 'react-native'
import React from 'react'
import TextTitle from '@/utils/textTitle'

interface HelpInfoProps {
  mainTitle: string
  secondText: string
  main?: boolean
}

export default function HelpInfo({ mainTitle, secondText, main }: HelpInfoProps) {
  const mainStyle = main ? { marginVertical: 10 } : null
  return (
    <View style={[mainStyle, style.content]}>
      <TextTitle>{mainTitle}</TextTitle>
      <TextTitle>{secondText}</TextTitle>
    </View >
  )
}

const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})