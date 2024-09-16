import { useActiveCar } from "@/context/ActiveCarContext";
import { useState } from "react";
import { Alert } from "react-native";
import { formatTime } from "@/utils/formatTime";
import { useStore } from "@/context/StoreContext";

export function useHourManager() {
  const [hour, setHour] = useState(0);
  const [hourModal, setHourModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);
  const { activeCar } = useActiveCar();
  const { Money, setMoney } = useStore();

  const handleAddHour = () => {

    const baseHour = Money - (hour * 2);
    if (activeCar) {
      if (Money <= 0) {
        return Alert.alert('Erro', 'Pro favor, recarregue o seu saldo antes de adicionar horas');
      }

      if (hour > 0) {
        setMoney(baseHour);
      }
      switch (activeCar.tipoVeiculo) {
        case 'Sub-compacto' || 'Motocicleta':
          setMoney(baseHour - 2);
          break;
        case 'Compacto':
          setMoney(baseHour - 3);
          break;
        case 'Pickup':
          setMoney(baseHour - 7);
          break;
        default:
          setMoney(baseHour - 5);
          break;
      }

      setHourModal(false)
      setActiveTimer(true);
      console.log(hour);

      return
    }
    setHourModal(false);
    return Alert.alert('Erro', 'Por favor, adicione um veículo para adicionar horas');
  };

  const handleDurationChange = (remainingTime: number) => {
    if (activeCar) {
      setTimer(remainingTime);
      if (remainingTime === 0) {
        setHour(0);
      }
      return
    }
    setHour(0)
    setTimer(0)
  };

  const hourText = formatTime(timer)

  return {
    hour,
    activeTimer,
    setHourModal,
    setHour,
    hourText,
    hourModal,
    timer,
    handleAddHour,
    handleDurationChange
  }
}