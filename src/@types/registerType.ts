import { Request } from 'express';

export interface CompRegister {
  storename: String;
  cnpj: Number;
  email: String;
  password: String;
}

export interface DBFind extends CompRegister {
  _id?: string;
  id?: string;
  __v: Number;
}

export interface JwtVerify {
  id: string;
  iat: number;
}

export interface CustomRequest extends Request {
  user?: DBFind;
}
