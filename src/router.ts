import { Router, Request, Response } from 'express';
import userRouter from './users/users.router';
import pointsRouter from './points/points.router';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      msg: 'Test para Bego',
      createdBy: 'CesarQuint',
      contact: 'cesarquinttl@gmail.com',
    });
});

export default [router, userRouter, pointsRouter];
