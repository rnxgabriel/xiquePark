import { useState } from "react";
import { UserT } from "@/types/User.Type";
import { VehicleT } from "@/types/Vehicle.Type";

// Interface para o contexto de usuários
export interface UserContextProps {
  user: UserT | null; // Usuário atualmente ativo
  users: UserT[];     // Lista de todos os usuários
  addUser: (newUser: UserT) => void; // Função para adicionar um novo usuário
  setUser: (user: UserT) => void;    // Função para definir o usuário ativo
  updateActiveCar: (user: UserT, carId: VehicleT | null) => void; // Atualizar o carro ativo do usuário
  addCarToUser: (user: UserT, newCar: VehicleT) => void; // Adicionar um carro ao usuário ativo
  removeCarFromUser: (user: UserT, carId: VehicleT) => void; // Remover um carro do usuário
  updateUserBalance: (user: UserT, amount: number) => void;  // Atualizar saldo do usuário
  updateHistory: (user: UserT, history: string) => void; // Atualizar o histórico do usuário
  updateUserProfileImage: (user: UserT, profileImage: string) => void; // Atualizar imagem de perfil do usuário
}

const useUser = (): UserContextProps => {
  const [user, setUser] = useState<UserT | null>(null); // Usuário ativo
  const [users, setUsers] = useState<UserT[]>([]);      // Lista de usuários

  // Função para adicionar um novo usuário à lista e defini-lo como o usuário ativo
  const addUser = (newUser: UserT) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Adiciona o novo usuário à lista
    setUser(newUser); // Define o novo usuário como o usuário ativo
  };

  // Função para definir manualmente o usuário ativo
  const handleSetUser = (selectedUser: UserT) => {
    setUser(selectedUser);
  };

  // Atualizar o carro ativo do usuário ativo
  const updateActiveCar = (user: UserT, carId: VehicleT | null) => {
    if (user) {
      const activeCar = user.carros?.find((car) => car === carId) || null;
      setUser({ ...user, carro_ativo: activeCar });
    }
  };

  // Adicionar um novo carro ao usuário ativo
  const addCarToUser = (user: UserT, newCar: VehicleT) => {
    if (user) {
      const updatedCars = user.carros ? [...user.carros, newCar] : [newCar];
      setUser({ ...user, carros: updatedCars });
    }
  };

  const removeCarFromUser = (user: UserT, carId: VehicleT) => {
    if (user) {
      const updatedCars = user.carros?.filter((car) => car !== carId) || [];
      setUser({ ...user, carros: updatedCars });
    }
  };

  // Atualizar o saldo do usuário ativo
  const updateUserBalance = (user: UserT, amount: number) => {
    if (user) {
      setUser({ ...user, saldo: amount });
    }
  };

  // Atualizar o histórico do usuário ativo
  const updateHistory = (user: UserT, history: string) => {
    if (user) {
      const updatedHistory = user.historico ? [...user.historico, history] : [history];
      setUser({ ...user, historico: updatedHistory });
    }

  };

  const updateUserProfileImage = (user: UserT, profileImage: string) => {
    if (user) {
      setUser({ ...user, profileImage });
    }
  };

  return {
    user,   // Usuário ativo
    users,  // Lista de todos os usuários
    addUser, // Função para adicionar um novo usuário
    setUser: handleSetUser, // Função para definir o usuário ativo manualmente
    updateActiveCar, // Atualiza o carro ativo do usuário
    addCarToUser, // Adiciona um carro ao usuário ativo
    removeCarFromUser, // Remove um carro do usuário
    updateUserBalance, // Aumenta o saldo do usuário ativo
    updateHistory, // Atualiza o histórico do usuário ativo
    updateUserProfileImage,
  };
};

export default useUser;
