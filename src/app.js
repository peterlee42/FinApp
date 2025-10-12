import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorMiddeware.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import goalRouter from './routes/goalRoutes.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/goal', goalRouter);

// Error Handler
app.use(errorHandler);

export default app;
