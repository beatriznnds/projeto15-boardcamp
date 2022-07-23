import { getGames, addNewGame } from "../controllers/gamesController.js";
import { validateNewGame } from "../middlewares/validateNewGame.js";
import { Router } from 'express';

const router = Router();

router.get('/games', getGames);
router.post('/games', validateNewGame, addNewGame);


export default router;