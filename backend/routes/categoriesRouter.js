import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.post('/', createCategory);
categoriesRouter.delete('/:id', deleteCategory);

export default categoriesRouter;
