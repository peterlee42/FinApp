import express from 'express';
import { loginController } from '../authController.js';

const router = express.Router();

router.post('/login', loginController);

export default router;
