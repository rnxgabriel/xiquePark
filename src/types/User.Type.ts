import { VehicleT } from "./Vehicle.Type"

export type UserT = {
  name: string,
  email: string,
  senha: string,
  carro_ativo: VehicleT | null,
  carros: VehicleT[] | null,
  saldo: number | 0,
  historico: string[] | null
  profileImage: string
}
