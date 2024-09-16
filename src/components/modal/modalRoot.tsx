import { View, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '@/constants/colors'

interface ModalProps {
  children: React.ReactNode
  onClose?: () => void
  visible: boolean
}

export default function ModalRoot({ children, onClose, visible }: ModalProps) {
  return (
    <Modal
      animationType='fade'
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: colors.mainBackground,
    borderRadius: 10,
    elevation: 5,
  },
})