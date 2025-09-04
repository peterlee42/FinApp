import express from 'express';
import usersRouter from './routes/usersRouter.js';

const app = express();

app.use(express.json());
app.use(usersRouter);

export { app };
