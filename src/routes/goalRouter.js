import goalController from '../controllers/goalController.js';
import express from 'express';

const goalRouter = express.Router();

goalRouter.post(
  `/create`,
  async (req, res) => await goalController.createGoal(req, res)
);

goalRouter.get(
  '/create',
  async (req, res) => await goalController.getAllGoals(req, res)
);

export default goalRouter;
