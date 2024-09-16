import React from 'react'
import { Stack } from 'expo-router'
import { StoreProvider } from '@/context/StoreContext'
import { HistoryProvider } from '@/context/HistoryContext'
import { CarsProvider } from '@/context/CarsContext'
import { stackScreenOptions } from '@/constants/stackScreenOptions'
import { SQLiteProvider } from 'expo-sqlite'
import { AppProvider } from '@/context/AppContext'

export default function Layout() {
  return (
    <HistoryProvider>
      <CarsProvider>
        <AppProvider>
          <StoreProvider>
            <Stack initialRouteName='index' screenOptions={stackScreenOptions}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="store" options={{ headerTitle: 'Loja' }} />
              <Stack.Screen name="warning" options={{ headerTitle: 'Avisos' }} />
              <Stack.Screen name="help" options={{ headerTitle: 'Ajuda' }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </StoreProvider>
        </AppProvider>
      </CarsProvider>
    </HistoryProvider>
  )
}