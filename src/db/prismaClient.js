import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// use prisma accelerate for pooling and caching
export const prisma = new PrismaClient().$extends(withAccelerate());
