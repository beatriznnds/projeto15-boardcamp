import { getRentals, postNewRental, returnRental, deleteRental } from "../controllers/rentalsController.js";
import { validateNewRental } from "../middlewares/validateNewRental.js";
import { validateReturnRental } from "../middlewares/validateReturnRental.js";
import { Router } from 'express';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', validateNewRental, postNewRental);
router.post('/rentals/:id/return', validateReturnRental, returnRental);
router.delete('/rentals/:id', validateReturnRental, deleteRental);

export default router;