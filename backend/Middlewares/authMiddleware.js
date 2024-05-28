// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel'); 

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization');

//     if (!token || !token.startsWith('Bearer ')) {
//       throw new Error('Unauthorized');
//     }

//     const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    
//     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
//     if (!user) {
//       throw new Error('Unauthorized');
//     }
    
//     req.user = user;
//     req.token = token;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Unauthorized' });
//   }
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = authMiddleware;
