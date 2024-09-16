import { View, StyleSheet } from 'react-native'
import React from 'react'

interface ListContainerProps {
  children: React.ReactNode
}

export default function ListContainer({ children }: ListContainerProps) {
  return (
    <View style={style.listContainer}>
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})