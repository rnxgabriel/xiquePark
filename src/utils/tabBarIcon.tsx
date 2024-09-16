import { MaterialCommunityIcons } from "@expo/vector-icons";

export function HomeTabBarIcon({ color, focused }: { color: string; focused: boolean }) {
  if (focused) {
    return <MaterialCommunityIcons name="home-variant"
      size={24} color={color} />;
  } else {
    return <MaterialCommunityIcons name="home-variant-outline"
      size={24} color={color} />;
  }
}

export function CarTabBarIcon({ color, focused }: { color: string; focused: boolean }) {
  if (focused) {
    return <MaterialCommunityIcons name="car"
      size={24} color={color} />;
  } else {
    return <MaterialCommunityIcons name="car-outline"
      size={24} color={color} />;
  }
}

export function HistoryTabBarIcon({ color }: { color: string }) {
  return (
    <MaterialCommunityIcons name="history"
      size={24} color={color} />
  )
}
