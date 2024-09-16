import { View, StyleSheet } from 'react-native'
import React from 'react'

interface CardBoxRootProps {
  children: React.ReactNode
}

export default function CardBoxRoot({ children }: CardBoxRootProps) {
  return (
    <View style={style.container}>
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: 'transparent',
    width: '90%',
    height: '20%',
    justifyContent: 'space-around',
    borderRadius: 16,
    flexDirection: 'row',
  }
})