
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 */
const authenticate = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const token = authHeader.split(' ')[1];
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = {
  authenticate
};
