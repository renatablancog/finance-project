import { Router } from 'express';
import { getIncomesSummary } from '../controllers/incomesController.js';

const expensesRouter = Router();

expensesRouter.get('/summary', getIncomesSummary);

export default expensesRouter;
