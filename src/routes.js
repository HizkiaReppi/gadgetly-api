import { Router } from 'express';
import usersRoutes from './routers/users.route.js';
import authRoutes from './routers/auth.route.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to E-Commerce API' });
});

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

export default router;
