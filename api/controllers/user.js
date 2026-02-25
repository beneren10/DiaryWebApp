const User = require("../models/user");
const crypto = require('crypto')
const SendEmail = require('../sendEmail')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')


async function register(req, res) {
    try {
      const data = req.body;
  
      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
  
      // Hash the password
      data["password"] = await bcrypt.hash(data.password, salt);
      const result = await User.create(data);

      res.status(201).send(result);

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    const data = req.body;
    try {
      const user = await User.getOneByUsername(data.email);
      if(!user) { throw new Error('No user with this email') }
      const match = await bcrypt.compare(data.password, user.password);
    
      if (match) {
        const payload = { email: user.email, user_id: user.id, name: user.name }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
            });
        }
        
        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

      } else {
        throw new Error('User could not be authenticated')  
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
}

async function reset_request(req,res) {
    const data = req.body
    try {
      const user = await User.getOneByUsername(data.email);
      if(!user) { throw new Error('No user with this email') }

      const token = crypto.randomBytes(32).toString('hex');
      
      const tokenData = {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 3600000),
        email: data.email
      }
      
      await User.updateToken(tokenData)
      

      const resetUrl = `http://localhost:3000/users/reset-password-verify?token=${token}`;

      await SendEmail(user.email, 'Password Reset',`
        Click link here to reset your password: ${resetUrl}
        This link will expire in 1 hour.
      `);
      res.send('Password reset email sent')
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
}

async function reset_verify(req,res) {
  const { token } = req.query
  try {
    const user = await User.getOneByToken(token)
    if (!user) return res.status(400).send('Invalid or expired token')
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'pages', 'new-password.html'))
    
  } catch (err) {
    res.status(401).json({ error: err.message})
  }
}

async function reset_password(req,res) {
  const { token, newPassword } = req.body
  console.log(token);
  console.log(newPassword);
  const user = await User.getOneByToken(token)

  if (!user) return res.status(400).send(`Invalid token or expired token`)
    
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
  const password = await bcrypt.hash(newPassword, salt)

  const tokenDataPass = {
    password: password,
    resetToken: undefined,
    resetTokenExpiry: undefined,
    email: user.email
  }

  await User.updateTokenPass(tokenDataPass)
  res.send('Password has been reset succesfully')
  window.location.href = 'login.html'
}

module.exports = {
    register, login, reset_request, reset_verify, reset_password
}                           