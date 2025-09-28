import prisma from '../config/prismaClient.js';
import { signupService } from '../services/authService.js';

// Signup User
const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await prisma.user.findFirst({
    where: { email },
    select: { id: true },
  });

  if (userExists) {
    return res.status(409).json({ error: 'User already exists' });
  }

  try {
    const result = await signupService({
      email,
      password,
      firstName,
      lastName,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users
const getAllUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userID = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (err) {
    res.json(err);
  }
};

// Delete user by id
const deleteUserById = async (req, res) => {
  try {
    const userID = req.params.id;
    await prisma.user.delete({
      where: {
        id: userID,
      },
    });
  } catch (err) {
    res.json(err);
  }
};

export default { createUser, getAllUsers, getUserById, deleteUserById };
