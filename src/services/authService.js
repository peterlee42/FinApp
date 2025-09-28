import prisma from '../config/prismaClient.js';
import config from '../config/env.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginService = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

export const signupService = async (fields) => {
  const { email, password, firstName, lastName } = fields;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already taken');

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName },
  });

  return result;
};
