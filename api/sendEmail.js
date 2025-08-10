const nodemailer = require('nodemailer');

async function SendEmail(to, subject, text) {
  // Create a transporter using SMTP or your email service
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',  
    port: 587,
    secure: false,          
    auth: {
      user: 'beneren10@hotmail.co.uk',
      pass: process.env.EMAILPASS,
    },
  });


  // Send mail
  await transporter.sendMail({
    from: '"Diary a Day" <beneren10@hotmail.co.uk>',
    to,
    subject,
    text,
  });
}

module.exports = SendEmail;
