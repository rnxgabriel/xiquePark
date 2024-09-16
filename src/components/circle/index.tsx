import React, { useEffect, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface CircularProgressProps {
  size: number;         // Tamanho do círculo
  strokeWidth: number;  // Largura da borda
  duration: number;     // Duração total em segundos para a regressão
  color: string;        // Cor da borda do progresso
  backgroundColor: string; // Cor de fundo do círculo
  onDurationChange: (remainingTime: number) => void; // Callback para notificar a mudança de duração
}

export default function CircularProgress({
  size,
  strokeWidth,
  duration,
  color,
  backgroundColor,
  onDurationChange, // Recebe o callback como prop
}: CircularProgressProps) {
  const [progress, setProgress] = useState(100); // Começa com 100% de progresso
  const animatedValue = useRef(new Animated.Value(100)).current; // Começa com 100
  const radius = (size - strokeWidth) / 2; // Raio do círculo
  const circumference = 2 * Math.PI * radius; // Circunferência do círculo

  // Função para interpolar o progresso
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0], // O traço será "reduzido" conforme o progresso
  });

  useEffect(() => {
    if (duration > 0) { // Garante que só inicie se a duração for maior que 0
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - (100 / duration); // Reduz progressivamente
          if (newProgress <= 0) {
            clearInterval(interval);
            return 0; // Garante que não passe de 0
          }
          return newProgress;
        });
      }, 1000); // Atualiza a cada segundo

      return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
    }
  }, [duration]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000, // Duração da animação para suavidade
      useNativeDriver: true, // Para animar o SVG
    }).start();

    // Chama o callback apenas quando o progress muda
    if (onDurationChange) {
      const remainingTime = Math.ceil((progress / 100) * duration); // Calcula o tempo restante
      onDurationChange(remainingTime);
    }
  }, [progress]);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Círculo de fundo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Círculo de progresso */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" // Faz o final do traço ser arredondado
          />
        </G>
      </Svg>
    </View>
  );
}

// Crie um AnimatedCircle a partir do componente Circle do SVG
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
