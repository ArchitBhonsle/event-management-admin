const nodemailer = require('nodemailer');
const { rword } = require('rword');
const { randomNumber } = require('./random');
require('dotenv').config();

const senderEmail = process.env.MAIL;
const senderPass = process.env.PASS;

module.exports = async (email, rollNo) => {
  const words = rword.generate(2, {
    length: '3-4',
    capitalize: 'first',
  });
  const password = words[0] + words[1] + randomNumber(100, 999).toString();

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

  await trasporter.sendMail({
    from: senderEmail,
    to: email,
    subject: 'Login and password for Etamax 2021',
    html:
      `<h1>Etamax 2021</h1>` +
      `<p>Your identification number is <strong> ${rollNo} </strong> </p>` +
      `<p>And the password is <strong> ${password} </strong> </p>` +
      `<hr>` +
      `<p>
      Lorem ipsum dolor sit <a style="color:inherit;font-style:oblique;text-decoration:none;pointer-events:none;" href="http://bit.do/puipuirollpui" target="_blank">hello</a> amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>`,
  });

  return password;
};
