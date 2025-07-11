import { Router } from 'express';
import { getExpensesSummary } from '../controllers/expensesController.js';

const expensesRouter = Router();

expensesRouter.get('/summary', getExpensesSummary);

export default expensesRouter;
