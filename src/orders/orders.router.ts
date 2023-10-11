import { Router } from 'express';
import { checkJWT } from '../middlewares/auth';
import {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from './orders.hub';

const ordersRouter = Router();

ordersRouter.get('/my_orders/:id', checkJWT, getOrder);

ordersRouter.get('/my_orders', checkJWT, getOrders);

ordersRouter.post('/my_orders', checkJWT, createOrder);

ordersRouter.put('/my_orders/:id', checkJWT, updateOrder);

ordersRouter.delete('/my_orders/:id', checkJWT, deleteOrder);

export default ordersRouter;
