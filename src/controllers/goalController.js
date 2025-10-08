import prisma from '../config/prismaClient.js';

const getAllGoals = async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
};

// Get goals by user ID
const getGoalById = async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
};

// Create a goal by user ID
const createGoal = async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

// Add money
const addMoney = async (req, res) => {
  const { goalId, userId } = req.params;
  const { amount } = req.body;

  try {
    const result = await prisma.goal.update({
      where: { id: goalId, userId },
      data: {},
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add money' });
  }
};

// Withdraw
const withdraw = async (req, res) => {
  const { goalId, userId } = req.params;
  const { amount } = req.body;

  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to withdraw' });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  const { userId, goalId } = req.params;

  try {
    await prisma.goal.delete({
      where: { id: goalId, userId },
    });
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete goal' });
  }
};

export default {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};
