import { getRentals } from "../controllers/rentalsController.js";
import { Router } from 'express';

const router = Router();

router.get('/rentals', getRentals);

export default router;