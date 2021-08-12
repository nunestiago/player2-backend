import 'dotenv/config';

import { compModel } from '@models/compModel';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface jwtVerify extends JwtPayload {
  id?: string | undefined;
}

export async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json('Favor passar token de autorização.');
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();
    const { id } = jwt.verify(token, process.env.SECRET);
    // TODO https://stackoverflow.com/questions/66341226/jwt-verifytoken-process-env-jwt-confirm-key-property-id-does-not-exist-on

    const user: DBFind = await compModel.findById(id).exec();

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
