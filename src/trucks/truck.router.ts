import { Router } from 'express';
import { checkJWT } from '../middlewares/auth';
import { getTrucks } from './trucks.hub';

const truckRouter = Router();

truckRouter.get('/trucks', checkJWT, getTrucks);

export default truckRouter;
