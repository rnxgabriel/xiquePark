import * as Notifications from 'expo-notifications';


export default async function useNotification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  })

  Notifications.scheduleNotificationAsync({
    identifier: 'XiquePark',
    content: {
      title: 'XiquePark, seu tempo está acabando',
      body: "Seu carro está a 5m de expirar o tempo!",
    },
    trigger: { seconds: 2 },
  });
}

export async function useHourNotification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  })

  Notifications.scheduleNotificationAsync({
    identifier: 'XiquePark',
    content: {
      title: 'XiquePark, Tempo alugado com sucesso!',
      body: "Obrigado por alugar conosco!",
    },
    trigger: { seconds: 2 },
  });
}