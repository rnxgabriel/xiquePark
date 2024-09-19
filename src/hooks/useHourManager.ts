import { useState } from "react";
import { Alert } from "react-native";
import { formatTime } from "@/utils/formatTime";
import { useAppContext } from "@/context/AppContext";
import { useHourNotification } from "./useNotification";

export function useHourManager() {
  const [hour, setHour] = useState<number>(0); // Estado para o número de horas
  const [hourModal, setHourModal] = useState(false); // Modal para adicionar horas
  const [timer, setTimer] = useState(0); // Estado para o temporizador
  const [activeTimer, setActiveTimer] = useState(false); // Indica se o temporizador está ativo
  const { user, setMoney, updateUserBalance, addValueToHistory } = useAppContext(); // Contexto da aplicação

  const handleAddHour = () => {
    if (!user?.carro_ativo) {
      // Verifica se há um carro ativo associado ao usuário
      setHourModal(false);
      return Alert.alert("Erro", "Por favor, adicione um veículo para adicionar horas");
    }

    if (user.saldo <= 0) {
      // Verifica se o saldo do usuário é suficiente
      return Alert.alert("Erro", "Por favor, recarregue o seu saldo antes de adicionar horas");
    }
    addValueToHistory(`Saldo Atualizado: R$ ${user.saldo - hour * 2}`)
    addValueToHistory(`Horas adicionadas: ${hourText}`);
    useHourNotification()


    const baseHour = user.saldo - hour * 2; // Calcula o novo saldo com base nas horas selecionadas
    setMoney(baseHour); // Atualiza o saldo do contexto

    // Atualiza o saldo do usuário com base no tipo do veículo
    if (hour !== 0) {
      switch (user.carro_ativo.tipoVeiculo) {
        case "Sub-compacto":
          updateUserBalance(user, baseHour - 2);
          break;
        case "Motocicleta":
          updateUserBalance(user, baseHour - 2);
          break;
        case "Compacto":
          updateUserBalance(user, baseHour - 3);
          break;
        case "Pickup":
          updateUserBalance(user, baseHour - 7);
          break;
        default:
          updateUserBalance(user, baseHour - 5);
          break;
      }
    }
    setHourModal(false);
    setActiveTimer(true); // Ativa o temporizador
    console.log(`Horas adicionadas: ${hour}`);

  };

  const handleDurationChange = (remainingTime: number) => {
    if (user?.carro_ativo) {
      // Atualiza o temporizador se houver um carro ativo
      setTimer(remainingTime);
      if (remainingTime === 0) {
        setHour(0); // Reseta as horas quando o tempo acabar
      }
      return;
    }

    // Reseta o temporizador e as horas se não houver um carro ativo
    setHour(0);
    setTimer(0);
  };

  const hourText = formatTime(timer); // Converte o tempo restante em um formato legível

  return {
    hour, // Horas selecionadas
    activeTimer, // Estado do temporizador
    setHourModal, // Função para abrir/fechar o modal de horas
    setHour, // Função para definir as horas
    hourText, // Texto formatado do temporizador
    hourModal, // Estado do modal de horas
    timer, // Tempo restante no temporizador
    handleAddHour, // Função para adicionar horas
    handleDurationChange, // Função para atualizar a duração do temporizador
  };
}
