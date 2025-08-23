const express = require('express');
const morgan = require('morgan');
const app = express();

// ----------------------------------------------------------------

app.use(express.json());
app.use('morgan');
app.use('dotenv');

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
