import goalController from '../controllers/goalController.js';
import express from 'express';

const goalRouter = express.Router();

goalRouter.post(`/create`, goalController.createGoal);

goalRouter.get('/', goalController.getAllGoals);

export default goalRouter;
