import { useHistory } from "@/context/HistoryContext";
import { useStore } from "@/context/StoreContext";
import React from "react";
import { Alert } from "react-native";

export const useStoreManager = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');
  const { Money, setMoney } = useStore();
  const { addValueToHistory } = useHistory();

  const handleConfirm = () => {
    const value = inputValue;
    if (value === '') {
      setMoney(Number(0) + Money);
      setModalVisible(false);
      setInputValue('');
      return Alert.alert('Erro', 'Insira um valor válido!');
    }
    const formattedValue = parseFloat(value.replace(',', '.'));
    const newMoney = Number(formattedValue) + Money;
    setMoney(newMoney);
    addValueToHistory('Adicionado saldo de R$ ' + value);
    setModalVisible(false);
  };

  return {
    modalVisible,
    setModalVisible,
    setInputValue,
    handleConfirm,
    Money
  }
}