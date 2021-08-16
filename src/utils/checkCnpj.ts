import axios from 'axios';

export async function checkCnpj(cnpj: Number) {
  try {
    const response = await axios.get(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    );
    return response.data;
  } catch (e) {
    throw new Error('Não foi possível achar o CNPJ');
  }
}
