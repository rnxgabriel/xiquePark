import { VehicleT } from "@/types/Vehicle.Type";
import axios from "axios";

export default async function Consulta(sign: string, tokenPromise: Promise<string | undefined>): Promise<VehicleT | undefined> {
  try {
    // Verificar se o token foi encontrado
    const token = await tokenPromise;

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const data = JSON.stringify({
      "placa": `${sign}`,
      "homolog": true
    });

    const config = {
      url: 'https://gateway.apibrasil.io/api/v2/vehicles/dados/credits',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    const response = await axios.post(config.url, config.data, { headers: config.headers });
    const vehicleData = response.data.data;

    const vehicleInfo = {
      marca: vehicleData?.MARCA || 'Não disponível',
      modelo: vehicleData?.MODELO || 'Não disponível',
      submodelo: vehicleData?.SUBMODELO || 'Não disponível',
      versao: vehicleData?.VERSAO || 'Não disponível',
      ano: vehicleData?.ano || 'Não disponível',
      anoModelo: vehicleData?.anoModelo || 'Não disponível',
      cor: vehicleData?.cor || 'Não disponível',
      placa: vehicleData?.placa || 'Não disponível',
      combustivel: vehicleData?.combustivel || 'Não disponível',
      potencia: vehicleData?.potencia || 'Não disponível',
      capacidadePassageiros: vehicleData?.quantidade_passageiro || 'Não disponível',
      municipio: vehicleData?.municipio || 'Não disponível',
      uf: vehicleData?.uf || 'Não disponível',
      tipoVeiculo: vehicleData?.tipo_veiculo?.tipo_veiculo || 'Não disponível',
      logo: vehicleData?.logo || 'Não disponível'
    };

    return vehicleInfo;

  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}
