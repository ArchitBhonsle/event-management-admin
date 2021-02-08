const nodemailer = require('nodemailer');

module.exports = {
  sendMail: async (email, rollNo, password) => {
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
      subject: 'login and password for etamax',
      text: 'Hello',
      html: '<p>Your roll no for etamax is ' + rollNo + 'password ' + password + '</p>'
    })
  }
};