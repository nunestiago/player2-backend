import axios from 'axios';
import { Response } from 'express';

export async function checkCnpj(cnpj: Number, res: Response) {
  try {
    const response = await axios(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
    );

    if (response.status === 400) {
      res.status(400).send(response);
      // TODO fica girando sem retorno
      // TODO se eu passo response.message pede o type
    }

    return response.data;
  } catch (e) {
    return res.status(404).json(e.message);
  }
}
