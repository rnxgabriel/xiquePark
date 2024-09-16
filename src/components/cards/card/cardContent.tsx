import { View, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'

interface CardContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export default function CardContent({ children, style }: CardContentProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16
  }
})