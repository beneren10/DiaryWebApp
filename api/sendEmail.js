const nodemailer = require('nodemailer');

async function SendEmail(to, subject, text) {
  // Create a transporter using SMTP or your email service
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 587,
    secure: false,          
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  // Send mail
  await transporter.sendMail({
    from: `"Diary a Day" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}

module.exports = SendEmail;
