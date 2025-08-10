const nodemailer = require('nodemailer');

async function SendEmail(to, subject, text) {
  // Create a transporter using SMTP or your email service
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 587,
    secure: false,          
    auth: {
      user: 'diaryaday5411@gmail.com',
      pass: process.env.EMAILPASS,
    },
  });


  // Send mail
  await transporter.sendMail({
    from: '"Diary a Day" <your-email@example.com>',
    to,
    subject,
    text,
  });
}

module.exports = SendEmail;
