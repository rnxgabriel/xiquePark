import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import {
  HistoryTabBarIcon,
  CarTabBarIcon,
  HomeTabBarIcon,
} from '../../utils/tabBarIcon';
import { screenOptions } from '../../constants/screenOptions';

export default function Layout() {
  return (
    <>
      <Tabs screenOptions={{ ...screenOptions,  }}>
        <Tabs.Screen name="home" options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => HomeTabBarIcon({ color, focused })
        }} />

        <Tabs.Screen name="mycars" options={{
          title: 'Carros',
          tabBarIcon: ({ color, focused }) => CarTabBarIcon({ color, focused })
        }} />

        <Tabs.Screen name="history" options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => HistoryTabBarIcon({ color })
        }} />
      </Tabs>
      <StatusBar style='dark' />
    </>
  )
}
