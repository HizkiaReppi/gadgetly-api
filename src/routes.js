import { Router } from 'express';
import usersRoutes from './routers/users.route.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to E-Commerce API' });
});
router.use('/users', usersRoutes);

export default router;
