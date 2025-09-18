import goalController from '../controllers/goalController.js';
import express from 'express';

const goalRouter = express.Router();

// Create goal
goalRouter.post(`/create`, goalController.createGoal);

// Get all goals by goal ID
goalRouter.get('/', goalController.getAllGoals);

// Get all goals by goal ID
goalRouter.get('/:id', goalController.getGoalById);

// update goal by goal ID
goalRouter.put('/:id', goalController.updateGoal);

// Delete a goal by goal ID
goalRouter.delete('/:id', goalController.deleteGoal);

export default goalRouter;
