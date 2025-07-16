import { Router } from 'express';
import {
  getExpensesSummary,
  getCategoryWithMaxExpense,
} from '../controllers/expensesController.js';

const expensesRouter = Router();

expensesRouter.get('/summary', getExpensesSummary);
expensesRouter.get(
  '/category-most-expenses',
  getCategoryWithMaxExpense
);

export default expensesRouter;
