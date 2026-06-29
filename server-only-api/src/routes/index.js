import { Router } from 'express';
import coreRoutes from './core.js';

const router = Router();

router.use(coreRoutes);

export default router;
