import { colors } from "./colors";

export const screenOptions = {
  headerStyle: {
    backgroundColor: colors.bar,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  headerTintColor: '#fff',
  tabBarStyle: { backgroundColor: colors.bar },
  tabBarActiveTintColor: '#fff',
  tabBarInactiveTintColor: colors.inactiveTabBar,
};