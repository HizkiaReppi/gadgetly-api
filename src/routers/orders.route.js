import { Router } from 'express';
import ordersController from '../controllers/orders.controller.js';
import { isAuthenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, ordersController.create);
router.get('/', ordersController.findAll);
router.get('/:id', ordersController.findById);
router.post('/by-ids', ordersController.findByIds);
router.get('/user/:id', ordersController.findByUserId);
router.get('/seller/:id', ordersController.findBySellerId);

export default router;
