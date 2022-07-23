import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import categoriesRouter from './routes/categoriesRouter.js';
import gamesController from './routes/gamesRouter.js';
import customersController from './routes/customersRouter.js';
import rentalsController from './routes/rentalsRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesController);
app.use(customersController);
app.use(rentalsController);


const PORT = process.env.PORT;
app.listen(PORT);