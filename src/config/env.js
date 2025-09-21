import { config } from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'development'
    ? '.development.env'
    : '.production.env';

config({ path: envFile });

// Errors if env constants are undefined
if (!process.env.PORT) throw new Error('PORT is not defined');
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined');
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

export default {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
