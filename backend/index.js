import express from 'express';
import cors from 'cors';
import movementsRouter from './routes/movementsRouter.js';
import indexRouter from './routes/indexRouter.js';
import { json } from 'express';

const app = express();

app.use(cors());
app.use(json());

app.use('/', indexRouter);
app.use('/movements', movementsRouter);

app.listen(3001, function () {
  console.log('server up and running on port 3001');
});
