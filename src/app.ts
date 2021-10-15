import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

app.use('/', routes);

if (process.env.MONGO_CONNECT_URL) {
  mongoose.connect(process.env.MONGO_CONNECT_URL);
  console.log('⚡️[server]: Database connected!');
}

app.use((req, res) => {
  res.status(404).send('⚠️ Route not found!');
});
export default app;
