import { prisma } from '../db/prismaClient.js';
import { v4 as uuidv4 } from 'uuid';

const signup = async (req, res) => {
  const { name, email } = req.body;

  // TODO fix goals
  /*
  const goalData =
    goals?.map((goal) => ({
      title: goal?.title,
      content: goal?.content,
    })) || [];
*/

  const userID = uuidv4();
  console.log(userID);

  try {
    const result = await prisma.user.create({
      data: {
        id: 0,
        name,
        email,
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
    const userID = req.params.id;

    const user = await prisma.user.findUnique({
      where: { userID },
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
    const userID = req.params.id;
    await prisma.user.delete({
      where: {
        id: userID,
      },
    });
  } catch (err) {
    res.json(err);
  }
};

export default { signup, getAllUsers, getUserById, deleteUserById };
