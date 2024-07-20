// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar cualquier otro correo.
  auth: {
    user: 'miguelvamo11@gmail.com',
    pass: 'wwsg srmu ghfm pzxh'
  }
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'miguelvamo11@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendMail;
