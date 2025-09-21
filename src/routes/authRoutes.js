import express from 'express';
import loginController from '../controllers/loginController.js';

const authRouter = express.Router();

// login user
authRouter.post('/login', loginController.login);

//TODO: email verified auth

//TODO: 2fa auth

export default authRouter;
