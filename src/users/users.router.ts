import { Router } from 'express';
import { userLogIn, userSignUp } from './users.hub';

const userRouter = Router();

userRouter.post('/users', userSignUp);
userRouter.post('/users/login', userLogIn);

export default userRouter;
