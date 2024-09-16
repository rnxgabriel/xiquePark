import { colors } from '@/constants/colors';
import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScrollBoxProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ScrollBox({ children, style }: ScrollBoxProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.mainBackground }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[{ backgroundColor: colors.mainBackground, flex: 1, alignItems: 'center' }, style]}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
