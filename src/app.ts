import express from 'express';
import morganBody from 'morgan-body';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

morganBody(app);
app.use('/v1/docs', express.static('docs'));
app.use('/v1', routes);

app.use((req, res) => {
  res.status(404).send('⚠️ Route not found!');
});

app.use(errorHandler);

export default app;
