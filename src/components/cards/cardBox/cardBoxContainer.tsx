import { TouchableOpacity, StyleSheet, DimensionValue } from 'react-native'
import React from 'react'

interface CardBoxContainerProps {
  children: React.ReactNode
  color: string
  height?: DimensionValue
  direction?: 'row' | 'column'
  onPress?: () => void
  disabled?: boolean
}

export default function CardBoxContainer({ disabled, onPress, direction, height, children, color }: CardBoxContainerProps) {

  const handleColor = color ? color : 'black';
  const handleTransparent = color == 'transparent' ? false : true;
  const heightStyle = height ? height : '100%';

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.6}
      style={[style.container, { backgroundColor: handleColor }, { flexDirection: direction, height: heightStyle }, handleTransparent && style.shadow]}>
      {children}
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    gap: 16,
  },
  shadow: {
    shadowColor: '#000', // Opção para sombra
    shadowOffset: { width: 0, height: 2 }, // Sombra leve
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    elevation: 5, // Sombra no Android
  }
})