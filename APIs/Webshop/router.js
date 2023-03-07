import { Router } from 'express';
const router = Router();

import { getClients } from '../controllers/customers.controller';

router.get('/customers', getClients)
export default router;