const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const user = auth(req);
  
  if (!user) return res.status(401).send('Authentication required.');

  try {
    const foundUser = await User.findOne({ username: user.name });
    if (!foundUser) return res.status(401).send('Invalid credentials.');

    const isPasswordValid = await bcrypt.compare(user.pass, foundUser.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials.');

    req.user = foundUser; // Attach the user object to the request
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error during authentication.' });
  }
};
