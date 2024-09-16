import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export interface IconProps {
  name: any;
  background?: boolean;
  color?: string;
  backgroundColor?: string;
  icon?: "MaterialIcons" | string
}

export default function Icon({ name, background, color, backgroundColor, icon }: IconProps) {
  const containerStyle = [
    background ? styles.containerWithBackground : null,
    backgroundColor && background ? { backgroundColor } : null
  ];

  return (
    <View style={containerStyle}>
      {icon === "MaterialIcons" ? <MaterialIcons name={name} size={36} color={color} /> : null}
      {icon ? null : <MaterialCommunityIcons name={name} size={36} color={color} />}
    </View>
  );
}

const styles = StyleSheet.create({
  containerWithBackground: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: 10
  },
});
