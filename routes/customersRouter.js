import { getCustomers, getCustomerById, addNewCustomer, editCustomer  } from "../controllers/customerController.js";
import { Router } from 'express';
import { validateIdCustomer } from '../middlewares/validateIdCustomer.js';
import { validateNewUser } from "../middlewares/validateNewUser.js";

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', validateIdCustomer, getCustomerById);
router.post('/customers', validateNewUser, addNewCustomer);
router.put('/customers/:id', validateNewUser, editCustomer);

export default router;