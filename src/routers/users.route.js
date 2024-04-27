import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { isAuthenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticate, isAdmin, usersController.create);
router.get('/', isAuthenticate, usersController.findAll);
router.get('/:id', isAuthenticate, usersController.findById);
router.patch('/:id', isAuthenticate, isAdmin, usersController.update);
router.put(
  '/:id/password',
  isAuthenticate,
  isAdmin,
  usersController.updatePassword,
);
router.delete('/:id', isAuthenticate, isAdmin, usersController.destroy);

export default router;
