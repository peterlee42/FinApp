import env from '../config/env.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { withAccelerate } from '@prisma/extension-accelerate';

// use prisma accelerate for caching and pooling
export const prisma = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
}).$extends(withAccelerate());
