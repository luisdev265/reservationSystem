import express from 'express';
import { registerUser, userLogIn } from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/loIgn', userLogIn);

export default router;