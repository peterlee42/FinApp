import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
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

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Not Found');
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ error: 'err.message' });
});

export { app };
