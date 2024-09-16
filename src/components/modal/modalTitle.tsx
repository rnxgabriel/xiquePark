import React from 'react'
import TextTitle from '@/utils/textTitle'

interface ModalTitleProps {
  children: React.ReactNode
}

export default function ModalTitle({ children }: ModalTitleProps) {
  return (
    <TextTitle style={{ marginBottom: 10}}>
      {children}
    </TextTitle>
  )
}