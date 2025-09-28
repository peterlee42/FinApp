import env from '../config/env.js';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';

// middleware to extract user ID from header to request body
export const tokenExtractor = (req, _, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      req.token = authorization.replace('Bearer ', '');
    } else {
      req.token = null;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const userExtractor = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, env.JWT_SECRET);

    if (!decodedToken.userId) {
      return res.status(401).json({ error: 'token invalid' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'userId missing or not valid' });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
