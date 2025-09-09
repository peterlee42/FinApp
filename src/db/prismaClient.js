import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// use prisma accelerate for caching and pooling
export const prisma = new PrismaClient().$extends(withAccelerate());
