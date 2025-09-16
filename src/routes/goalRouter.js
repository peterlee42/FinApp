import goalController from '../controllers/goalController.js';
import express from 'express';

const goalRouter = express.Router();

// Create goal
goalRouter.post(`/create`, goalController.createGoal);

// Get all goals for a user given ID
// goalRouter.get('/', goalController.getAllGoals);

export default goalRouter;
