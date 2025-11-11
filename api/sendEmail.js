const nodemailer = require('nodemailer');

async function SendEmail(to, subject, text) {
  // Create a transporter using SMTP or your email service
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 587,
    secure: false,          
    auth: {
      user: 'beneren10@gmail.com',
      pass: 'txcfmlzbtaqicokj',
    },
  });


  // Send mail
  await transporter.sendMail({
    from: '"Diary a Day" <beneren10@gmail.com>',
    to,
    subject,
    text,
  });
}

module.exports = SendEmail;
