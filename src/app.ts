import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import config from './utils/config.js';

const app = express();

// Connect DB
if (1 == 1) {
  console.log('test');
}
try {
  drizzle(process.env.DATABASE_URL!);
  console.log('Connected to DB');
} catch {
  console.log('Unable to connect to DB');
}

export { app };
