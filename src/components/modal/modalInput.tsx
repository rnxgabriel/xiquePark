import { TextInput, StyleSheet, KeyboardTypeOptions, Platform } from 'react-native'
import React from 'react'

interface ModalInputProps {
  placeholder?: string
  keyboard?: KeyboardTypeOptions
  onChangeText?: (value: string) => void
  autoCapitalize?: "characters" | "none" | "sentences" | "words" | undefined
  isCurrency?: boolean // Nova prop para ativar/desativar o formato monetário
}

export default function ModalInput({
  placeholder,
  keyboard,
  onChangeText,
  autoCapitalize,
  isCurrency = false,
}: ModalInputProps) {
  const [inputValue, setInputValue] = React.useState('')

  // Função para formatar o valor monetário
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    const formattedValue = (Number(numericValue) / 100).toFixed(2).replace('.', ','); // Converte para valor monetário
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona separadores de milhar
  }

  const handleChange = (value: string) => {
    let newValue = value;

    if (isCurrency) {
      newValue = formatCurrency(value); // Formata como moeda se isCurrency for true
    }

    setInputValue(newValue);
    if (onChangeText) {
      onChangeText(newValue);
    }
  }

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder || 'Digite aqui'}
      value={inputValue}
      onChangeText={handleChange}
      keyboardType={keyboard}
      autoCapitalize={autoCapitalize}
      placeholderTextColor={Platform.OS == 'ios' ? "#000" : ''}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
})
