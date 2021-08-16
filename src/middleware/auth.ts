import 'dotenv/config';

import { compModel } from '@models/compModel';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { CustomRequest, DBFind, JwtVerify } from '../@types/registerType';

export async function verifyAuth(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json('Favor passar token de autorização.');
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();
    const { id } = jwt.verify(
      token,
      process.env.SECRET
    ) as unknown as JwtVerify;

    const user: DBFind = await compModel.findById(id).exec();

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
