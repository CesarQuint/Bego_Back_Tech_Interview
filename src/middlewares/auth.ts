import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import models from '../db';

async function checkJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const { jwtoken }: any = req.headers;

    if (!jwtoken) {
      return res.status(400).json({ msg: 'Falta Credenciales' });
    }
    const key: string | undefined = process.env.SECRET_KEY;
    if (key) {
      const verify: any = jwt.verify(jwtoken, key);
      req.headers.user = verify;
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error en el servidor intentalo mas tarde ' });
  }
}

export { checkJWT };
