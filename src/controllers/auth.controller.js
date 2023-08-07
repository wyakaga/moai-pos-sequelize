const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const blacklist = require('../schemas/token.schema');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          status: 401,
          msg: 'Invalid Email or Password',
        });
      }

      const isPwdValid = bcrypt.compareSync(password, user.password);

      if (!isPwdValid) {
        return res.status(401).json({
          status: 401,
          msg: 'Invalid Email or Password',
        });
      }

      const payload = { userId: user.id };
      const jwtSecret = process.env.JWT_SECRET;
      const jwtOptions = { expiresIn: '1d' };

      jwt.sign(payload, jwtSecret, jwtOptions, async (error, token) => {
        if (error) throw error;
        res.status(200).json({
          status: 200,
          msg: 'Successfully signed in',
          token,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.header('Authorization').split(' ')[1];
      await blacklist.create({ token });
      res.status(200).json({
        status: 200,
        msg: 'Succesfully logged out',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        msg: 'Internal Server Error',
      });
    }
  },
};
