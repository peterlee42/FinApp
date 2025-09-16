import express from 'express';
import helmet from 'helmet';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import goalRouter from './routes/goalRouter.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);

export { app };
