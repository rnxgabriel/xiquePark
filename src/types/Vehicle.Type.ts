export type VehicleT = {
  marca: string;
  modelo: string;
  submodelo?: string;
  versao?: string;
  ano: string;
  anoModelo: string;
  cor: string;
  placa: string;
  combustivel: string;
  potencia: string;
  capacidadePassageiros: string;
  municipio: string;
  uf: string;
  tipoVeiculo?: string;
  logo?: string;
  [key: string]: any;
}