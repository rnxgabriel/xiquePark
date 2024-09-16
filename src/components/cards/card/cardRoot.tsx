import { DimensionValue, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'

interface CardRootProps extends TouchableOpacityProps {
  children: React.ReactNode
  onPress?: () => void
  color?: string
  height?: DimensionValue
  onLongPress?: () => void
}

export default function CardRoot({ height, children, color, onPress, onLongPress, ...rest }: CardRootProps) {
  const containerStyle: ViewStyle = {
    marginTop: 16,
    width: '90%',
    height: height || "15%",
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: color || colors.terciary,
  }


  return (
    <TouchableOpacity {...rest} onPress={onPress} onLongPress={onLongPress}
      style={containerStyle}
      activeOpacity={0.6} >
      {children}
    </TouchableOpacity>
  )
}
