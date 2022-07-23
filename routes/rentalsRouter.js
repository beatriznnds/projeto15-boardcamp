import { getRentals, postNewRental } from "../controllers/rentalsController.js";
import { validateNewRental } from "../middlewares/validateNewRental.js";
import { Router } from 'express';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', validateNewRental, postNewRental);
export default router;