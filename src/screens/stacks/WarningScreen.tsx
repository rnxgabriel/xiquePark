import React from 'react'
import { ListItem } from '@/components/listItem'
import TextTitle from '@/utils/textTitle'
import ScrollBox from '@/components/scrollBox/scrollBox'
import Icon from '@/utils/Icon'
import { useStore } from '@/context/StoreContext'
import { useActiveCar } from '@/context/ActiveCarContext'

export default function WarningScreen() {
  const { activeCar } = useActiveCar()
  const { Money } = useStore()

  return (
    <ScrollBox>
      {Money <= 0 && (
        <ListItem.Root>
          <ListItem.Container>
            <Icon name={"alert"} color="orange" />
            <TextTitle size={16}>Saldo indisponível para compra.</TextTitle>
          </ListItem.Container>
        </ListItem.Root>
      )}

      {!activeCar ? (
        <ListItem.Root>
          <ListItem.Container>
            <Icon name={"alert"} color="orange" />
            <TextTitle size={16}>Não há um veículo selecionado.</TextTitle>
          </ListItem.Container>
        </ListItem.Root>
      ) : (null)}



    </ScrollBox>
  )
}