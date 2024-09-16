import axios from "axios";

const URI = 'https://gateway.apibrasil.io/api/v2/login';
const sendData = "Your JSON LoginData here"
const header = { "content-type": "application/json" }

export async function Login(): Promise<string | undefined> {
  try {
    // Fazendo a requisição POST
    const response = await axios.post(URI, sendData, { headers: header });

    // Extraindo o token da resposta
    const token = response.data.authorization.token;

    return token;
  } catch (error) {
    console.error('Erro na requisição Login:', error);
    return undefined;
  }
}