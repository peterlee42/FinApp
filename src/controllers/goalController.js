import goalService from '../services/goalService.js';

const getAllGoals = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const goalsArray = goalService.getAllGoals(userId);
    res.json(goalsArray);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Get goals by user ID
const getGoalById = async (req, res, next) => {
  const { userId, goalId } = req.params;

  try {
    const goal = await goalService.getGoalById(userId, goalId);
    res.json(goal);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Create a goal by user ID
<<<<<<< HEAD
const createGoal = async (req, res, next) => {
=======
const createGoal = async (req, res) => {
>>>>>>> 6968cff789f6935c46a28ecfa51df703d97cd2fe
  const { title, target, current } = req.body;
  const { userId } = req.params;

  try {
    const result = await goalService.createGoal(title, target, current, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Add money
const addMoney = async (req, res, next) => {
  const { goalId, userId } = req.params;
  const { amount } = req.body;

  try {
    const result = await goalService.addMoney(goalId, userId, amount);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Withdraw
const withdraw = async (req, res, next) => {
  const { goalId, userId } = req.params;
  const { amount } = req.body;

  try {
    const result = await goalService.withdraw(goalId, userId, amount);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// TODO: Finish goal controller
// Update a goal
const updateGoal = async (req, res, next) => {};

// Delete a goal
const deleteGoal = async (req, res, next) => {
  const { userId, goalId } = req.params;

  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default {
  getAllGoals,
  getGoalById,
  createGoal,
  addMoney,
  withdraw,
  updateGoal,
  deleteGoal,
};
