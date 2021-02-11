const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const User = require('./models/user');
const mailer = require('./utils/mailer');
const userQueries = require('./utils/userQueries');

const dbCollection = process.env.DB_NAME || 'etamax-admin',
mongoURL = `mongodb://localhost/${dbCollection}`;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

(async () => {
  try {

    const [, , file] = process.argv;
    
    await fs
    .createReadStream(file)
    .pipe(csv())
    .on('data', async (data) => {
      try {
        const user = await userQueries.generateUserR(data.roll, data.email);
        const password = await mailer(data.email, data.roll);
        User.register(user, password);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
})();

// mongoose.connection.close();