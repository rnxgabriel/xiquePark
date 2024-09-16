import { View, StyleSheet, Button } from 'react-native'
import React from 'react'

interface ModalButtonsProps {
  onClose: () => void
  onConfirm: (value: any) => void
  singleButton?: boolean
  confirmTitle?: string
}

export default function ModalButtons({ onClose, onConfirm, singleButton, confirmTitle }: ModalButtonsProps) {
  return (
    <View style={styles.buttonContainer}>
      {singleButton && <Button title="Fechar" onPress={() => onClose()} />}
      <Button title="Cancelar" onPress={() => onClose()} />
      <Button title={confirmTitle || 'Confirmar'} onPress={(value) => onConfirm(value)} />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})