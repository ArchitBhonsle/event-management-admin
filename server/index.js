const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

// Route imports
const adminRoutes = require('./routes/admin');

// Constants
const clientURL = process.env.CLIENT_URL || 'http://localhost:3000',
  port = process.env.PORT || 4000,
  dbCollection = process.env.DB_NAME || 'etamax-admin',
  mongoURL = `mongodb://localhost/${dbCollection}`,
  sessionSecret = process.env.SESSION_URL || 'etamin';

mongoose.connect(mongoURL, {
  useNewUrlParser    : true,
  useUnifiedTopology : true,
  useCreateIndex     : true,
  useFindAndModify   : false
});

app.use(
  cors({
    origin      : clientURL,
    credentials : true
  })
);
app.use(
  session({
    name              : 'etamin',
    secret            : sessionSecret,
    resave            : 'false',
    saveUninitialized : true,
    cookie            : {
      httpOnly : true,
      secure   : false,
      sameSite : 'lax'
    },
    store             : new MongoStore({
      mongooseConnection : mongoose.connection
    })
  })
);
app.use(express.json());

require('./seed');

app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`🚀 Up at http://localhost:${port}`);
});
