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
  });

  await trasporter.sendMail({
    from: senderEmail,
    to: email,
    subject: 'login and password for etamax',
    html:
      '<h1>Etamax Details</h1>' +
      '<p>Your roll no for etamax is ' +
      rollNo +
      ' password ' +
      password +
      '</p>',
  });

  return password;
};
