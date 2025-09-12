import { prisma } from '../db/prismaClient.js';

const createGoal = async (req, res) => {
  const { name, notes } = req.body;

  try {
    const result = await prisma.goal.create({
      data: {
        name,
        notes,
      },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

export default { createGoal };
