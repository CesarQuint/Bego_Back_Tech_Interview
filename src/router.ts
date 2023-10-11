import { Router, Request, Response } from 'express';
import userRouter from './users/users.router';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ msg: 'pp' });
});

export default [router, userRouter];
