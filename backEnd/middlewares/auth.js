const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt');

let checkToken = (req, res, next) => {
  let authHeader = req.headers['access-token'] || req.headers['authorization'];

  if(!authHeader) {
    res.status(401).json({message: 'Token not provided!'})
  }

  const token = authHeader.replace('Bearer', '');
  try {
    jwt.verify(token, jwtSecret);
  } catch(error) {
    if(error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({message: 'Invalid token!'})
    }
  }
  next();
}

module.exports = {
  checkToken
}