import React from 'react';
import { ListItem } from '@/components/listItem';
import TextTitle from '@/utils/textTitle';
import ScrollBox from '@/components/scrollBox/scrollBox';
import Icon from '@/utils/Icon';
import { useAppContext } from '@/context/AppContext';

export default function WarningScreen() {
  const { user } = useAppContext();

  const shouldDisplayWarning = user && (user.saldo <= 0 || !user.carro_ativo);

  return (
    <ScrollBox>
      {shouldDisplayWarning && (
        <ListItem.Root>
          <ListItem.Container>
            <Icon name={"alert"} color="orange" />
            {user?.saldo <= 0 && (
              <TextTitle size={16}>Saldo indisponível para compra.</TextTitle>
            )}
          </ListItem.Container>
        </ListItem.Root>
      )}
      {shouldDisplayWarning &&
        <ListItem.Root>
          <ListItem.Container>
            <Icon name={"alert"} color="orange" />
            {!user?.carro_ativo && (
              <TextTitle size={16}>Não há um veículo selecionado.</TextTitle>
            )}
          </ListItem.Container>
        </ListItem.Root>
      }
      {!shouldDisplayWarning && (
        <ListItem.Root>
          <ListItem.Container>
            <Icon name={"check"} color="green" />
            <TextTitle size={16}>Não há nenhuma notificação.</TextTitle>
          </ListItem.Container>
        </ListItem.Root>
      )}

    </ScrollBox>
  );
}
