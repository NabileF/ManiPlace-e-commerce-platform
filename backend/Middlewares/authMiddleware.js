const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error('Unauthorized');
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
