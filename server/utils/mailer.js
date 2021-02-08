const nodemailer = require('nodemailer');

module.exports = {
  sendMail: async (email, password) => {
    const trasporter = nodemailer.createTransport({
      // works for outlook not gmail
      service: "hotmail",
      auth: {
        user: '',
        pass: '',
      },
      tls: {
        ciphers:'SSLv3'
      }
    });

    const info = await trasporter.sendMail({
      from: '',
      to: email,
      subject: 'login and password for etamax?',
      text: 'Hello',
      html: '<p>Your passord for etamax is ' + password + '</p>'
    })
  }
};