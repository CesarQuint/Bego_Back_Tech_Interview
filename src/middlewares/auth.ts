import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

async function checkJWT(req: Request, res: Response, nexy: NextFunction) {
  try {
    const { jwtoken }: any = req.headers;

    const key: string | undefined = process.env.SECRET_KEY;
    if (key) {
      const verify = jwt.verify(key, jwtoken);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Error en el servidor intentalo mas tarde ' });
  }
}
