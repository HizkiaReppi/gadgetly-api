import { Router } from 'express';
import { googleAuthHandler } from '../controllers/oauth.controller.js';

const router = Router();

router.get('/google', googleAuthHandler);

export default router;
