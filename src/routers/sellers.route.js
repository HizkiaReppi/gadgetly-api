import { Router } from 'express';
import sellersController from '../controllers/sellers.controller.js';
import { isAuthenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, sellersController.create);
router.get('/', isAuthenticate, sellersController.findAll);
router.get('/:id', isAuthenticate, sellersController.findById);
router.patch('/:id', isAuthenticate, sellersController.update);
router.delete('/:id', isAuthenticate, isAdmin, sellersController.destroy);

export default router;
