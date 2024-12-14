import { Router } from 'express';

import authController from './modules/auth/auth.controller';

const router = Router();

router.use('/auth', authController);

export default router;
