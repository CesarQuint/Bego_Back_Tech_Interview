import { Router } from 'express';
import { checkJWT } from '../middlewares/auth';
import {
  getRoute,
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from './routes.hub';

const routesRouter = Router();

routesRouter.get('/my_routes/:id', checkJWT, getRoute);

routesRouter.get('/my_routes', checkJWT, getRoutes);

routesRouter.post('/my_routes', checkJWT, createRoute);

routesRouter.put('/my_routes/:id', checkJWT, updateRoute);

routesRouter.delete('/my_routes/:id', checkJWT, deleteRoute);

export default routesRouter;
