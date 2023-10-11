import { Router } from 'express';
import { checkJWT } from '../middlewares/auth';
import { getPoints } from './points.hub';

const pointsRouter = Router();

pointsRouter.get('/points', checkJWT, getPoints);

export default pointsRouter;
