import { Router, Request, Response } from 'express';
import userRouter from './users/users.router';
import pointsRouter from './points/points.router';
import truckRouter from './trucks/truck.router';
import routesRouter from './routes/routes.router';
import ordersRouter from './orders/orders.router';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'Test para Bego',
    createdBy: 'CesarQuint',
    contact: 'cesarquinttl@gmail.com',
  });
});

export default [
  router,
  userRouter,
  pointsRouter,
  truckRouter,
  routesRouter,
  ordersRouter,
];
