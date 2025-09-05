import { prisma } from '../db/prismaClient.js';

/* CREATE SIMPLE TEXT GOAL */

const createGoal = async (req, res) => {
  const { name, target, current, deadline, notes, userId } = req.body;

  try {
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
