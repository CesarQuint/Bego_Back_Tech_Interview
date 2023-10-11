import express, { Application, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './src/router';

const app: Application = express();

app.use(morgan('dev'));

dotenv.config();
app.use(express.json());
app.use(router);

const uri: string | undefined = process.env.MONGOLINK;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => console.log('///Database connected///'))
    .catch(error => console.log('Error connecting to database: ', error));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port [${port}]`);
});
