import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useAppContext } from '@/context/AppContext';
import { colors } from '@/constants/colors';
import TextTitle from '@/utils/textTitle';
import SubTitleText from '@/utils/textSubtitle';
import { Card } from '@/components/cards/card';
import { router } from 'expo-router';
import ScrollBox from '@/components/scrollBox/scrollBox';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { user, updateUserProfileImage } = useAppContext();
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);

  // Função para selecionar uma imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Necessária', 'É necessário conceder permissão para acessar a galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      if (user) {
        updateUserProfileImage(user, result.assets[0].uri);
      }
    }
  };

  // Simulação de uma função para visualizar o histórico
  const handleViewHistory = () => {
    router.navigate('/history');
  };

  const handleGoToAuth = () => {
    // Implementar a lógica para autorização
    router.replace('/');
  };

  return (
    <ScrollBox style={{ padding: 20 }}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        </TouchableOpacity>
        <TextTitle size={24} style={styles.profileName}>
          {user?.name || 'Nome do Usuário'}
        </TextTitle>
        <SubTitleText size={18} color={colors.mainGreen}>
          {user?.email || 'email@example.com'}
        </SubTitleText>
        <SubTitleText size={18} color={colors.mainGreen}>
          Saldo: R$ {user?.saldo?.toFixed(2) ?? '0.00'}
        </SubTitleText>
      </View>

      <Card.Root color={colors.mainGreen} height={'10%'} onPress={handleViewHistory}>
        <Card.Content>
          <TextTitle color='white'>Ver Histórico</TextTitle>
        </Card.Content>
      </Card.Root>

      <Card.Root color={'#ff5252'} height={'10%'} onPress={handleGoToAuth}>
        <Card.Content>
          <TextTitle color='white'>Sair</TextTitle>
        </Card.Content>
      </Card.Root>
    </ScrollBox>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    marginBottom: 10,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.mainGreen,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// OQH3065