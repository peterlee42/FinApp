import { prisma } from '../db/prismaClient.js';
import config from '../config/env.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const signup = async ({ email, password, firstName, lastName }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already taken');

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName },
  });
};

export default { signup, login };
