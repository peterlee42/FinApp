import { prisma } from '../db/prismaClient.js';

/* CREATE SIMPLE TEXT GOAL */

const createGoal = async (req, res) => {
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
