import { prisma } from '../db/prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginService = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};
