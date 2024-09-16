import { View, Text } from 'react-native';
import React from 'react';
import { useHistory } from '@/context/HistoryContext';
import ScrollBox from '@/components/scrollBox/scrollBox';
import TextTitle from '@/utils/textTitle';
import { colors } from '@/constants/colors';

export default function HistoryScreen() {
  const { history } = useHistory();

  return (

    <ScrollBox>
      {history.length > 0 ? (
        history.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))
      ) : (
        <TextTitle color={colors.platinum}>O histórico está vazio.</TextTitle>
      )}
    </ScrollBox>
  );
}
