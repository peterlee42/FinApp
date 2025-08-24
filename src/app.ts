import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import config from './utils/config.js';

const app = express();

// Connect DB
export const db = drizzle(config.DATABASE_URL);
console.log('Connected to DB');

export { app };
