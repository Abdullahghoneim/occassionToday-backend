const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(helmet());

app.use('/auth', authRouter);
app.use(require('./routes/offers'));
app.use(require('./routes/user'));

// ERROR HANDILLING
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/ocasionToday', { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => console.log('app rouning on post ' + PORT));
  })
  .catch(err => {
    console.log(err);
  });
