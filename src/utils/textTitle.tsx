import { Text, TextStyle } from 'react-native'
import React from 'react'

interface textTitleProps {
  children: string | string[] | React.ReactNode
  color?: string
  size?: number
  style?: TextStyle
}

export default function TextTitle({ children, color = 'black', size = 20, style }: textTitleProps) {

  const textStyle: TextStyle = {
    fontSize: size,
    fontWeight: 'bold',
    marginBottom: 2,
    color: color
  }

  return <Text style={[textStyle, style]}>{children}</Text>
}
