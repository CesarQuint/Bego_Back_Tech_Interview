import express, { Application, NextFunction } from 'express';
import * as dotenv from 'dotenv';

import router from './src/router';

const app: Application = express();

dotenv.config();
app.use(router);
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
