const User = require("../models/User");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function register(req, res) {
    try {
      const data = req.body;
  
      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  
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


module.exports = {
    register, login
}                           