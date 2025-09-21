import { prisma } from '../db/prismaClient.js';

//TODO: Make sure only users can access their goals

// Get all goals
const getAllGoals = async (_, res) => {
  try {
    const result = await prisma.goal.findMany();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch goals' });
  }
};

// Get single goal by ID
const getGoalById = async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await prisma.goal.findUnique({
      where: { id },
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

// Create a goal
const createGoal = async (req, res) => {
  //TODO: get and validate jwt token and create goal using userId
  const { name, target, current, deadline, userToken } = req.body;

  try {
    //TODO: verify and decode jwt, extract user (maybe make middleware)

    const result = await prisma.goal.create({
      data: {
        name,
        target,
        current,
        deadline,
      },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

// Update a goal
const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, notes, target, current, deadline } = req.body;

  try {
    const result = await prisma.goal.update({
      where: { id },
      data: {
        name,
        notes,
        target,
        current,
        deadline,
        updatedAt: new Date(),
      },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update goal' });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.goal.delete({
      where: { id },
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
