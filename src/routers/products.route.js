import { Router } from 'express';
import productsController from '../controllers/products.controller.js';
import { isAuthenticate } from '../middleware/auth.middleware.js';
import uploader from '../utils/multer.js';

const router = Router();

router.post(
  '/',
  uploader.array('images'),
  isAuthenticate,
  productsController.create,
);
router.get('/', productsController.findAll);
router.get('/:id', productsController.findById);
router.post('/find-by-ids', productsController.findByIds);
router.get('/', productsController.searchProducts);

export default router;
