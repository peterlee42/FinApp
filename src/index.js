import { app } from './app.js';
import env from './config/env.js';
import morgan from 'morgan';

app.use(morgan('dev'));
app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
