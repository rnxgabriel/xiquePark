import React from 'react';
import SubTitleText from '@/utils/textSubtitle';
import { VehicleT } from '@/types/Vehicle.Type';
import { carDetails } from '@/constants/carDetails';

interface CarDetailsProps {
  car: VehicleT;
  index: number;
}

export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <>
      {carDetails.map(detail => (
        <SubTitleText key={detail.key} size={16}>
          {`${detail.label}: ${car[detail.key]}`}
        </SubTitleText>
      ))}
      <SubTitleText size={16}>
        {`Placa: ${car.placa}`}
      </SubTitleText>
    </>
  );
};
