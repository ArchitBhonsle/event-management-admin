const express = require('express');
const app = express();
const mongoose = require('mongoose');
// ! Remember to put .env in git ignore later
require('dotenv').config();

const port = process.env.PORT;

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useNewUrlParser    : true,
  useUnifiedTopology : true,
  useCreateIndex     : true,
  useFindAndModify   : false
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`🚀 Up at http://localhost:${port}`);
});
