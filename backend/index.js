import express from 'express';
import cors from 'cors';
import movementsRouter from './routes/movementsRouter.js';
import indexRouter from './routes/indexRouter.js';
import expensesRouter from './routes/expensesRouter.js';
import incomesRouter from './routes/incomesRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import { connection } from './session.js';

import { json } from 'express';

const app = express();

app.use(cors());
app.use(json());

connection.serialize(() => {
  connection.run(`CREATE TABLE IF NOT EXISTS movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      category INTEGER NOT NULL,
      concept TEXT NOT NULL, 
      amount REAL NOT NULL,
      income INTEGER NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (category) REFERENCES categories(id)
    )`);

  connection.run(`CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT NOT NULL
    )`);

  connection.run(
    `INSERT OR REPLACE INTO categories (id, name) VALUES (1, 'Food')`
  );
  connection.run(
    `INSERT OR REPLACE INTO categories (id, name) VALUES (2, 'Home')`
  );
  connection.run(
    `INSERT OR REPLACE INTO categories (id, name) VALUES (3, 'Transport')`
  );
  connection.run(
    `INSERT OR REPLACE INTO categories (id, name) VALUES (4, 'Salary')`
  );
});

app.use('/', indexRouter);
app.use('/movements', movementsRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);
app.use('/categories', categoriesRouter);

app.listen(3001, function () {
  console.log('server up and running on port 3001');
});
