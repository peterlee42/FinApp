import goalController from '../controllers/goalController.js';
import express from 'express';

const goalRouter = express.Router();

goalRouter.post(
  `/create`,
  async (req, res) => await goalController.createGoal(req, res)
);

export default goalRouter;
