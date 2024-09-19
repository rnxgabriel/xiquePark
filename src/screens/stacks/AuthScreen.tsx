import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, Animated, ViewStyle, Image } from 'react-native';
import ScrollBox from '@/components/scrollBox/scrollBox';
import { colors } from '@/constants/colors';
import SubTitleText from '@/utils/textSubtitle';
import TextTitle from '@/utils/textTitle';
import { UserT } from '@/types/User.Type';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [toggle, setToggle] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current; // Valor inicial da animação
  const { addUser, setUser, users } = useAppContext();

  // Função para validar o login
  const handleCheckData = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'Por favor, insira uma senha com pelo menos 6 caracteres.');
      return;
    }
  }

  const handleRegister = () => {
    handleCheckData();
    const user = users.find((user) => user.email === email && user.senha === password)
    if (user) {
      Alert.alert('Erro', 'Email ja existe');
      return;
    }
    const newUser: UserT = {
      name: name,
      email: email,
      senha: password,
      carro_ativo: null,
      carros: [],
      saldo: 0,
      historico: null,
      profileImage: ''
    };
    addUser(newUser);
    setUser(newUser);
    router.replace('/(tabs)/home');
  };

  const handleLogin = () => {
    handleCheckData();
    const user = users.find((user) => user.email === email && user.senha === password)
    if (user) {
      setUser(user);
      router.push('/(tabs)/home');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos');
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);

    // Animação ao alternar o switch
    Animated.timing(animatedValue, {
      toValue: toggle ? 0 : 1, // Se ativado, anima para 1; caso contrário, para 0
      duration: 300,
      useNativeDriver: false, // Como estamos animando altura e opacidade, o useNativeDriver precisa estar false
    }).start();
  };

  const animatedHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // A altura do TextInput vai de 0 a 50
  });

  const animatedOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // A opacidade vai de 0 a 1
  });

  const animatedViewStyle: ViewStyle = {
    height: animatedHeight, opacity: animatedOpacity, overflow: 'hidden', width: "100%", marginBottom: 15,
  }

  return (
    <ScrollBox style={styles.container}>
      <View style={{ borderColor: colors.mainGreen, borderBottomWidth: 1, marginBottom: 16, }}>
        <TextTitle size={24} style={{ borderColor: colors.mainGreen }} color={colors.mainGreen}>
          XiquePark
        </TextTitle>
      </View>

      {/* Campo de name com Animação */}
      <Animated.View style={animatedViewStyle}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setname}
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={false}
          placeholderTextColor={'#999'}
        />
      </Animated.View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={'#999'}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor={'#999'}
      />

      {toggle ?
        (<TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        )
        :
        (<TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>)
      }

      <View style={styles.switch}>
        <SubTitleText color={colors.mainGreen}>
          Já possui uma conta ?
        </SubTitleText>
        <Switch value={toggle} onChange={handleToggle} trackColor={{ true: colors.mainGreen }} />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextTitle color={colors.mainGreen}>Um oferecimento:</TextTitle>
        <Image
          source={require('../../../assets/images/OlympcGreen.png')}
          style={{ width: 92, height: 92 }} />
      </View>

    </ScrollBox >
  );
}
// OQH3065

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: colors.mainGreen,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switch: {
    marginTop: 20,
    padding: 10,
    gap: 6,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
