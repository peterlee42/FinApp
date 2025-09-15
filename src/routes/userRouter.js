import userController from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

// get all users
userRouter.get('/', userController.getAllUsers);

// get one user
userRouter.get('/:id', userController.getUserById);

// delete one user
userRouter.delete('/:id', userController.deleteUserById);

// TODO post to change user name and email.

export default userRouter;
