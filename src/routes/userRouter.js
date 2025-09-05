import userController from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

// get all users
userRouter.get('/', async (req, res) => userController.getAllUsers(req, res));

// get one user
userRouter.get(
  '/:id',
  async (req, res) => await userController.getUserById(req, res)
);

// delete one user
userRouter.delete(
  '/:id',
  async (req, res) => await userController.deleteUserById(req, res)
);

userRouter.post(
  `/signup`,
  async (req, res) => await userController.signup(req, res)
);

export default userRouter;
