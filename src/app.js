import express from 'express';
import userRouter from './routes/userRouter.js';
import goalRouter from './routes/goalRouter.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);

export { app };
