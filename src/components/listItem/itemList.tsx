import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface ListItemProps {
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
}

export default function ItemList({ disabled, children, onPress }: ListItemProps) {
  return (
    <TouchableOpacity disabled={disabled} style={style.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16
  },
})