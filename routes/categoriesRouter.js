import { getCategories, addNewCategory  } from "../controllers/categoriesController.js";
import { Router } from 'express';

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', addNewCategory)

export default router;