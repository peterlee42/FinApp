import prisma from '../config/prismaClient.js';

const getAllGoals = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const goal = await prisma.goal.findMany({
      where: { userId: userId },
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (err) {
    next(err);
  }
};

// Get goals by user ID
const getGoalById = async (req, res, next) => {
  const { userId, goalId } = req.params;

  try {
    const goal = await prisma.goal.findUnique({
      where: { id: goalId, userId },
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (err) {
    next(err);
  }
};

// Create a goal by user ID
const createGoal = async (req, res, next) => {
  const { title, target, current, deadline } = req.body;
  const { userId } = req.params;

  try {
    const result = await prisma.goal.create({
      data: {
        title,
        target,
        current,
        deadline,
        userId,
      },
    });
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
    const result = await prisma.goal.update({
      where: { id: goalId, userId },
      data: {},
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Withdraw
const withdraw = async (req, res, next) => {
  const { goalId, userId } = req.params;
  const { amount } = req.body;

  try {
  } catch (err) {
    next(err);
  }
};

// Update goal
const updateGoal = async (req, res, next) => {
  const { goalId, userId } = req.params;
  const { amount } = req.body;

  try {
  } catch (err) {
    next(err);
  }
};

// Delete a goal
const deleteGoal = async (req, res, next) => {
  const { userId, goalId } = req.params;

  try {
    await prisma.goal.delete({
      where: { id: goalId, userId },
    });
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};
