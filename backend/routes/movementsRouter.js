import { Router } from 'express';
import {
  getSavings,
  getMovements,
  getMovementById,
  getIncomes,
  deleteMovement,
  addMovement,
} from '../controllers/movementsController.js';

const movementsRouter = Router();

movementsRouter.get('/savings', getSavings);

movementsRouter.get('/', getMovements);

movementsRouter.get('/:id', getMovementById);

movementsRouter.get('/incomes', getIncomes);

movementsRouter.delete('/:id', deleteMovement);

movementsRouter.post('/', addMovement);

export default movementsRouter;
