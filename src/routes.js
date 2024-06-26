import { Router } from 'express';
import usersRoutes from './routers/users.route.js';
import sellersRoutes from './routers/sellers.route.js';
import authRoutes from './routers/auth.route.js';
import oauthRoutes from './routers/oauth.route.js';
import productsRoutes from './routers/products.route.js';
import categoriesRoutes from './routers/categories.route.js';
import ordersRoutes from './routers/orders.route.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to E-Commerce API' });
});

router.use('/users', usersRoutes);
router.use('/sellers', sellersRoutes);
router.use('/auth', authRoutes);
router.use('/oauth', oauthRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/orders', ordersRoutes);

export default router;
