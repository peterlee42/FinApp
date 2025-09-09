import { prisma } from '../db/prismaClient.js';

const signup = async (req, res) => {
  const { name, email, goals } = req.body;

  // TODO Fix goal data
  /*
  const goalData =
    goals?.map((goal) => ({
      title: goal?.title,
      content: goal?.content,
    })) || [];
*/
  const goalData = [];
  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        goals: goalData.length > 0 ? { create: goalData } : undefined,
      },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getAllUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (err) {
    res.json(err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    res.json(err);
  }
};

export default { signup, getAllUsers, getUserById, deleteUserById };
