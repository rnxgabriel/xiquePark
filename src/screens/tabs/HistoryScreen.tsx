import { Text, FlatList, View } from 'react-native';
import React from 'react';
import ScrollBox from '@/components/scrollBox/scrollBox';
import TextTitle from '@/utils/textTitle';
import { colors } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import SubTitleText from '@/utils/textSubtitle';
import { Card } from '@/components/cards/card';

export default function HistoryScreen() {
  const { history } = useAppContext();

  // Função para renderizar cada item do histórico
  const renderItem = ({ item }: { item: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 6 }}>
      <Card.Root height={'100%'} disabled>
        <Card.Content style={{ justifyContent: 'center', alignItems: 'center' }}>
          <SubTitleText>{item}</SubTitleText>
        </Card.Content>
      </Card.Root>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
      {history.length > 0 ? (
        <FlatList
          data={[...history].reverse()} // Reverte o array para exibir do mais recente ao mais antigo
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Gera uma chave única para cada item
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextTitle size={24} color={colors.mainGreen}>Nenhum registro encontrado</TextTitle>
        </View>
      )}
    </View>
  );
}
