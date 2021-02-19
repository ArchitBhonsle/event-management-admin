const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const User = require('./models/user');
const userQueries = require('./utils/userQueries');
const nodemailer = require('nodemailer');
const { rword } = require('rword');
const { randomNumber } = require('./utils/random');
require('dotenv').config();

const dbCollection = process.env.DB_NAME || 'etamax-admin',
mongoURL = `mongodb://localhost/${dbCollection}`;

const senderEmail = process.env.MAIL;
const senderPass = process.env.PASS;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

(async () => {
  try {
    const [, , file] = process.argv;
    
    const trasporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: senderEmail,
        pass: senderPass,
      },
      tls: {
        ciphers: 'SSLv3',
      },
      pool: true,
      maxConnections: 3,
      maxMessages: 1,
    });

    await fs
    .createReadStream(file)
    .pipe(csv())
    .on('data', async (data) => {
      try {
        const words = rword.generate(2, {
          length: '3-4',
          capitalize: 'first',
        });
        const password = words[0] + words[1] + randomNumber(100, 999).toString();
        const user = await userQueries.generateUserR(data.roll, data.email);
        
        await trasporter.sendMail({
          from: senderEmail,
          to: data.email,
          subject: 'Login and password for Etamax 2021',
          html:
            `<h1>Etamax 2021</h1>` +
            `<p>Your identification number is <strong> ${data.roll} </strong> </p>` +
            `<p>And the password is <strong> ${password} </strong> </p>` +
            `<hr>` +
            `<p>
            Lorem ipsum dolor sit <a style="color:inherit;font-style:oblique;text-decoration:none;pointer-events:none;" href="http://bit.do/puipuirollpui" target="_blank">hello</a> amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>`,
        });
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