import usersController from '../controllers/usersController.js';
import express from 'express';

const usersRouter = express.Router();

usersRouter.post(
  `/signup`,
  async (req, res) => await usersController.signup(req, res)
);

export default usersRouter;
