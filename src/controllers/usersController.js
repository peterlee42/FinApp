import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function signup(req, res) {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
