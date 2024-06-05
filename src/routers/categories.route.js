import { Router } from 'express';
import categoriesController from '../controllers/categories.controller.js';
import { isAuthenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, isAdmin, categoriesController.create);
router.get('/', categoriesController.findAll);
router.get('/:slug', categoriesController.findBySlug);
router.put('/:id', isAuthenticate, isAdmin, categoriesController.update);
router.delete('/:id', isAuthenticate, isAdmin, categoriesController.destroy);

export default router;
