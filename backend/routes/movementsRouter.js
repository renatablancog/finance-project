import { Router } from 'express';
import {
  getSavings,
  getMovements,
  getMovementById,
  getIncomes,
  deleteMovement,
  addMovement,
  getMonthlySummary,
} from '../controllers/movementsController.js';

const movementsRouter = Router();

movementsRouter.get('/', getMovements);

movementsRouter.post('/', addMovement);

movementsRouter.get('/incomes', getIncomes);

movementsRouter.get('/savings', getSavings);

movementsRouter.get('/monthly-summary', getMonthlySummary);

movementsRouter.delete('/:id', deleteMovement);

movementsRouter.get('/:id', getMovementById);

export default movementsRouter;
