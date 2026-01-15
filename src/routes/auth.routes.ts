import express from 'express';
import { register, login } from '../controllers/AuthController';
import { validateRegistration, validateLogin } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router;