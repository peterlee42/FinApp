import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import express from 'express';

const prisma = new PrismaClient().$extends(withAccelerate());

const usersRouter = express.Router();

usersRouter.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body;

  const postData = posts?.map((post) => {
    return { title: post?.title, content: post?.content };
  });

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });
  res.json(result);
});
