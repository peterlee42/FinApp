import userController from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => userController.getAllUsers(req, res));

userRouter.get(
  '/:id',
  async (req, res) => await userController.getUserById(req, res)
);

userRouter.post(
  `/signup`,
  async (req, res) => await userController.signup(req, res)
);

export default userRouter;
