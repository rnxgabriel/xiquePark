import { Text, TextStyle } from 'react-native'
import React from 'react'

interface SubTitleTextProps {
  children: string | string[] | React.ReactNode
  color?: string
  size?: number
  style?: TextStyle
}

export default function SubTitleText({ children, color = 'black', size = 12, style }: SubTitleTextProps) {

  const textStyle: TextStyle = {
    fontSize: size,
    marginBottom: 2,
    color: color,
    fontWeight: 'bold'
  }

  return <Text style={[textStyle, style]}>{children}</Text>
}
