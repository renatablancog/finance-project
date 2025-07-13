import express from 'express';
import cors from 'cors';
import movementsRouter from './routes/movementsRouter.js';
import indexRouter from './routes/indexRouter.js';
import expensesRouter from './routes/expensesRouter.js';
import incomesRouter from './routes/incomesRouter.js';

import { json } from 'express';

const app = express();

app.use(cors());
app.use(json());

app.use('/', indexRouter);
app.use('/movements', movementsRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);

app.listen(3001, function () {
  console.log('server up and running on port 3001');
});
