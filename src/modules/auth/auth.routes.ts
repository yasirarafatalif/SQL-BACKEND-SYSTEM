import { Router } from 'express';
import { authController } from './auth.controller';
const router = Router();

router.post('/', authController.login)

export const authRoute = router