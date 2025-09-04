import { prisma } from '../db/prismaClient.js';

const signup = async (req, res) => {
  const { name, email, posts } = req.body;

  const postData =
    posts?.map((post) => ({
      title: post?.title,
      content: post?.content,
    })) || [];

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        posts: postData.length > 0 ? { create: postData } : undefined,
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
      res.status(500).json({ error: 'user not found' });
    }
  } catch (err) {
    res.json(err);
  }
};

const deleteUserById = async (req, res) => {};

export default { signup, getAllUsers, getUserById };
