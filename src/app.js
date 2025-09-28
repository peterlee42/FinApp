import express from 'express';
import helmet from 'helmet';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import goalRouter from './routes/goalRoutes.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/goal', goalRouter);

export { app };
