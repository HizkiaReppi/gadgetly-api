import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.post('/', usersController.create);
router.get('/', usersController.findAll);
router.get('/:id', usersController.findById);
router.patch('/:id', usersController.update);
router.put('/:id/password', usersController.updatePassword);
router.delete('/:id', usersController.destroy);

export default router;
