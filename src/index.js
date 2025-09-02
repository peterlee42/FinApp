import { app } from './app.js';
import config from './utils/config.js';
import morgan from 'morgan';

app.use(morgan('dev'));
app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
