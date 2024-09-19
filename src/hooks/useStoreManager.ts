import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Alert } from "react-native";

export const useStoreManager = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const { Money, setMoney, user, updateUserBalance, updateHistory, addValueToHistory } = useAppContext();

  const handleConfirm = async () => {
    const value = inputValue;

    // Se o valor for inválido
    if (value === '') {
      setMoney(Money); // Mantém o saldo sem mudanças
      setModalVisible(false);
      setInputValue('');
      return Alert.alert('Erro', 'Insira um valor válido!');
    }

    const formattedValue = parseFloat(value.replace(',', '.'));
    const newMoney = Number(formattedValue) + Money;

    // Atualiza o saldo e o histórico de maneira síncrona
    if (user) {
      // Atualiza o saldo
      setMoney(newMoney);

      try {
        const DateValue = new Date()
        const DateValueHour = DateValue.getHours().toString().padStart(2, '0')
        const DateValueMinutes = DateValue.getMinutes().toString().padStart(2, '0')
        // Atualiza o histórico primeiro
        addValueToHistory(`Saldo Adicionado: R$ ${formattedValue} - ${DateValueHour}:${DateValueMinutes}`);

        // Depois atualiza o saldo do usuário
        updateUserBalance(user, newMoney);
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar o saldo ou o histórico');
      }
    }

    setModalVisible(false);
    setInputValue('');
  };

  return {
    modalVisible,
    setModalVisible,
    setInputValue,
    handleConfirm,
    Money
  };
}
