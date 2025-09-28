import goalController from '../controllers/goalController.js';
import { tokenExtractor } from '../middleware/authMiddleware.js';
import express from 'express';

const goalRouter = express.Router();

goalRouter.use(tokenExtractor);

// Get all goals
goalRouter.get('/', goalController.getAllGoals);

// Get all goals by goalId
goalRouter.get('/:id', goalController.getGoalById);

// Create goal
goalRouter.post(`/create`, goalController.createGoal);

// Update goal
goalRouter.put('/:id', goalController.updateGoal);

// Delete a goal
goalRouter.delete('/:id', goalController.deleteGoal);

export default goalRouter;
